import Faculties from "../../db/models/Faculties";
import Schedules, { ScheduleInterface } from "../../db/models/Scheduling";
import { FacultiesInterface } from "../../db/models/Faculties";
import { DAY_TYPE, TIME_TYPE } from "../utils";
import { getAll } from "./form-details.service";

const getFacultyById = async (id: number) => {
  return Faculties.findByPk(id);
};

export const getFacultyByInitials = async (initials: string) => {
  return await Faculties.findOne({
    where: { initials }
  });
};

export const getAllFaculties = async () => {
  return await Faculties.findAndCountAll();
};

export const createFaculty = async (name: string, initials: string, password: string) => {
  const faculty = await Faculties.create({ name, initials, password });
  await initializeFacultySchedule(faculty.initials);
  return getFacultyByInitials(faculty.initials);
};

export const initializeFacultySchedule = async (initials: string) => {
  const faculty = await Faculties.findOne({ where: { initials } });
  if (!faculty) throw ['Nonexistent initial', 404];

  const currentSet = getAll();

  // generate initial empty schedules for all users
  const initialSchedules: ScheduleInterface[] = [];
  for (let i = 0, id=0; i < DAY_TYPE.length; i++) {
    for (let j = 0; j < TIME_TYPE.length; j++, id++) {
      initialSchedules.push({
        day: DAY_TYPE[i],
        time: TIME_TYPE[j],
        initials: initials,
        room: '',
        section: '',
        subject: '',
        time_type: 'am',
        year: currentSet.academic_year,
        semester: currentSet.semester
      });
    }
  }

  await Schedules.bulkCreate(initialSchedules);
};

export const deleteFaculty = async (initials: string) => {
  const faculty = await getFacultyByInitials(initials);
  if (faculty) {
    await Faculties.destroy({ where: { initials } });
    await Schedules.destroy({ where: { initials } });
    return faculty;
  }

  throw ['ID Provided does not exist', 404];
};

export const updateFaculty = async (id: number, update: FacultiesInterface) => {
  const oldFacultyValue = await getFacultyById(id);
  if (oldFacultyValue) {
    await Schedules.update({ initials: update.initials }, { where: { initials: oldFacultyValue.initials } });
    await Faculties.update(update, { where: { id } });
    return await getFacultyById(id);
  }

  throw ['ID Provided does not exist', 404];
};
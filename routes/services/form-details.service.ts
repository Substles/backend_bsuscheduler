const FormDetails = {
  dean: 'DR. Christina Amor M. Rosales',
  vcaa: 'DR. Elissa D. Gutierres',
  academic_year: 2024,
  semester: 'MIDTERM'
};

export const setDean = (dean: string) => {
  FormDetails.dean = dean;
};

export const setVCAA = (vcaa: string) => {
  FormDetails.vcaa = vcaa;
};

export const setAcademicYear = (year: number) => {
  FormDetails.academic_year = year;
};

export const setSemester = (semester: string) => {
  FormDetails.semester = semester;
};

export const getAll = () => {
  return FormDetails;
};
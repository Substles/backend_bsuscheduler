import { Request, Response } from "express";
import { requestHandler } from "../utils";
import * as service from "../services/faculties.service";

export const createFaculty = (req: Request, res: Response) => {
  requestHandler(res, async () => {
    const {name, initials, password} = req.body;
    const dbResponse = await service.createFaculty(name, initials, password);
    res.json(dbResponse);
  });
};

export const getAllFaculties = (res: Response) => {
  requestHandler(res, async () => {
    res.json(await service.getAllFaculties());
  });
};

export const editFaculty = (req: Request, res: Response) => {
  requestHandler(res, async () => {
    const { name, initials, id, password } = req.body;
    const dbResponse = await service.updateFaculty(id, {name, initials, password});
    res.json(dbResponse);
  });
};

export const removeFaculty = (req: Request, res: Response) => {
  requestHandler(res, async () => {
    res.json(await service.deleteFaculty(req.params.initials));
  });
};
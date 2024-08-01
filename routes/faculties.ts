import { Router, Request, Response } from "express";
import { createFaculty, editFaculty, getAllFaculties, removeFaculty } from "./controllers/faculties.controller";
import Faculties from "../db/models/Faculties";

const router = Router();
router.get('/', (req: Request, res: Response) => {
  getAllFaculties(res);
});

router.post('/add', (req: Request, res: Response) => {
  createFaculty(req, res);
});

router.put('/update', (req: Request, res: Response) => {
  editFaculty(req, res);
});

router.delete('/remove/:initials', (req: Request, res: Response) => {
  removeFaculty(req, res);
});

export default router;
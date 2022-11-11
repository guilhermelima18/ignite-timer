import * as zod from "zod";
import { newCycleFormValidationSchema } from "../validations/cycle";

export type CreateNewCycle = zod.infer<typeof newCycleFormValidationSchema>;

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
};

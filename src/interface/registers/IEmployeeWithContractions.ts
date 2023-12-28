import { Contractaciones, IEmployee } from ".";

export interface IEmployeeWithContractions extends IEmployee {
  contractaciones: Contractaciones[];
}

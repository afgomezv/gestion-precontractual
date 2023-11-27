"use client";
import { Key, useCallback } from "react";
import Link from "next/link";
import {
  Button,
  ChipProps,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { states } from "@/data/states";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IEmployee, IStatesProcess } from "@/interface/registers";
import { columnsRegisters } from "@/utils/columnsRegisters";

interface TableRegisterProps {
  employees: IEmployee[];
  statesProcess: IStatesProcess[];
}

function Register({ employees, statesProcess }: TableRegisterProps) {
  const employee = [...employees];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    true: "success",
    false: "warning",
  };

  // const renderCell = useCallback((employees: IEmployee, columnKey: Key) => {
  //   const cellValue = employees[columnKey as keyof IEmployee];

  return (
    <section className="h-full">
      <div className="title">Registro del formulario de contractación</div>
      <section className="flex flex-col">
        <div className="bg-white border border-gray-200 rounded-t-xl">
          <h2 className="px-4 py-4  text-gray-500 text-lg font-medium">
            Filtros de búsqueda
          </h2>
          <section className="grid grid-cols-2 gap-4 px-4 pt-2 pb-8">
            <Input
              type="text"
              label="Cedula"
              variant="bordered"
              color="primary"
            />
            <Input
              type="date"
              label="Fecha"
              variant="bordered"
              color="primary"
              placeholder="Fecha"
            />
            <Select label="Estado" variant="bordered" color="primary">
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Dependencias"
              variant="bordered"
              color="primary"
            />
          </section>
          <div className="flex justify-between px-5 py-6 border-t-2 border-gray-200">
            <Button
              size="lg"
              variant="ghost"
              radius="sm"
              startContent={<FaCloudDownloadAlt />}
              className="capitalize font-semibold text-lg text-gray-500 hover:text-white"
            >
              exportar
            </Button>
            <Button
              size="lg"
              color="primary"
              radius="sm"
              className="capitalize font-semibold text-lg text-white hover:bg-[#169ab2]"
            >
              <Link href={"/hiring/registers/add"}>agregar registro</Link>
            </Button>
          </div>
        </div>
      </section>
      <Table aria-label="Contractistas">
        <TableHeader columns={columnsRegisters}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="w-7 px-2 font-semibold uppercase text-center text-gray-500"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id.toString()}>
              <TableCell className="text-sm text-center font-normal text-gray-600">
                {employee.tipoDocumento}
              </TableCell>
              <TableCell className="text-sm text-center font-normal text-gray-600">
                {employee.numeroDocumento}
              </TableCell>
              <TableCell className="text-sm text-center font-normal text-gray-600">{`${employee.primerNombre} ${employee.segundoNombre} ${employee.primerApellido} ${employee.segundoApellido}`}</TableCell>
              <TableCell className="text-sm text-center font-normal text-gray-600">
                Oficina
              </TableCell>

              <TableCell>Oficina</TableCell>
              <TableCell>Oficina</TableCell>
              <TableCell>Oficina</TableCell>
              <TableCell>Oficina</TableCell>
              <TableCell>Oficina</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default Register;

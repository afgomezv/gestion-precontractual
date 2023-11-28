"use client";
import { Key, useCallback } from "react";
import Link from "next/link";
import {
  Button,
  Chip,
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
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { states } from "@/data/states";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { columnsRegisters } from "@/utils/columnsRegisters";
import Loading from "@/components/ui/Loading";
import { IUsers } from "@/interface/registers";

function Register() {
  const { data, isLoading } = useSWR("/api/employees", fetcher);
  console.log(data);

  const statusColorMap: Record<string, ChipProps["color"]> = {
    aprobado: "success",
    pendiente: "warning",
  };

  const renderCell = useCallback((data: IUsers, columnKey: Key) => {
    const cellValue = data[columnKey as keyof IUsers];

    //const renderCell: (data: IUsers, columnKey: Key) => String | Number | JSX.Element

    switch (columnKey) {
      case "tipoDocumento":
        return <div className="text-center">{data.tipoDocumento}</div>;
      case "numeroDocumento":
        return <p className="text-center">{data.numeroDocumento}</p>;
      case "nombreCompleto":
        return <p className="text-center">{data.nombreCompleto}</p>;
      case "dependencia":
        return <p className="text-center">{data.dependencia}</p>;
      case "tecnico":
        return (
          <Chip
            className="text-center capitalize"
            color={statusColorMap[data.tecnico[0]]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "juridico":
        return (
          <Chip
            className="text-center capitalize"
            color={statusColorMap[data.juridico[0]]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "financiero":
        return (
          <Chip
            className="text-center capitalize"
            color={statusColorMap[data.financiero[0]]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "supervision":
        return (
          <Chip
            className="text-center capitalize"
            color={statusColorMap[data.supervision[0]]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                ver
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                edit
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                erase
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {data && (
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
          <Table aria-label="employees">
            <TableHeader columns={columnsRegisters}>
              {(column) => (
                <TableColumn key={column.key} className="uppercase text-center">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={data.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      )}
    </>
  );
}

export default Register;

"use client";
import { Key, useCallback } from "react";
import Link from "next/link";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import Loading from "@/components/ui/Loading";
import { states } from "@/data/states";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { LuMoreVertical } from "react-icons/lu";
import { columnsForms } from "@/utils/columnsForms";
import { MdOutlineAddCircle } from "react-icons/md";

function TableView() {
  const { data, isLoading } = useSWR("/api/lote", fetcher);
  type ILotes = (typeof data)[0];

  //console.log(data);

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Activo: "success",
    Inactivo: "danger",
  };

  const renderCell = useCallback((data: ILotes, columnKey: Key) => {
    const cellValue = data[columnKey as keyof ILotes];

    switch (columnKey) {
      case "nombre":
        return <p className="text-center">{data.nombre}</p>;
      case "descripcion":
        return <p className="text-center">{data.descripcion}</p>;
      case "fechaCreacion":
        return <p className="text-center">{data.fechaCreacion}</p>;
      case "registros":
        return <p className="text-center">{data.registros}</p>;
      case "estado":
        return (
          <div className="w-full flex justify-center">
            <Chip color={statusColorMap[data.estado]} size="md" variant="flat">
              {cellValue}
            </Chip>
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-center"
                >
                  <LuMoreVertical className="h-4 w-4 text-default-500" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="menu-route">
                <DropdownItem href={`/hiring/forms/add/${data.id}`}>
                  Editar
                </DropdownItem>
                <DropdownItem href={`/hiring/forms/view/${data.id}`}>
                  Ver documentos
                </DropdownItem>
                {/* <DropdownItem href={`/hiring/registers/view/${data.id}`}>
                  Eliminar
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {data && (
        <section className="h-full">
          <div className="title">Formulario Contractación</div>
          <section className="flex flex-col">
            <div className="bg-white border border-gray-200 rounded-xl">
              <h2 className="px-4 py-4 text-gray-500 text-lg font-medium">
                Filtros de búsqueda
              </h2>
              <section className=" grid grid-cols-2 gap-4 px-4 pt-2 pb-8">
                <Input
                  type="text"
                  label="Nombre del expendiente de contractación"
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
                  endContent={<MdOutlineAddCircle />}
                  className="capitalize font-semibold text-lg text-white hover:bg-[#169ab2]"
                >
                  <Link href={"/hiring/forms/add"}>agregar registro</Link>
                </Button>
              </div>
            </div>
          </section>
          <Table aria-label="lotes">
            <TableHeader columns={columnsForms}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  className=" uppercase text-center"
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={data.id}>
                  {(columnkey) => (
                    <TableCell>{renderCell(item, columnkey)}</TableCell>
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

export default TableView;

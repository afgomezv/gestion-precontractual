"use client";
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { states } from "@/data/states";
import { FaCloudDownloadAlt } from "react-icons/fa";

function Register() {
  return (
    <section>
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
    </section>
  );
}

export default Register;

"use client";
<<<<<<< HEAD:src/components/registers/Register.tsx
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { states } from "@/data/states";
=======
import { states } from "@/app/data/states";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
>>>>>>> db98695dea21a9e52e712f8c70eff88ca6fac8d0:src/app/components/registers/Register.tsx
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
<<<<<<< HEAD:src/components/registers/Register.tsx
=======
              size={"md"}
              isRequired
>>>>>>> db98695dea21a9e52e712f8c70eff88ca6fac8d0:src/app/components/registers/Register.tsx
            />
            <Input
              type="date"
              label="Fecha"
              variant="bordered"
              color="primary"
<<<<<<< HEAD:src/components/registers/Register.tsx
=======
              size={"md"}
              isRequired
>>>>>>> db98695dea21a9e52e712f8c70eff88ca6fac8d0:src/app/components/registers/Register.tsx
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
<<<<<<< HEAD:src/components/registers/Register.tsx
              label="Dependencias"
              variant="bordered"
              color="primary"
              isRequired
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
=======
              label="Dependencia"
              variant="bordered"
              color="primary"
              size={"md"}
              isRequired
            />
          </section>
          <div className="flex justify-between px-4 py-6 border-t-2 border-gray-200">
            <Button
              startContent={<FaCloudDownloadAlt />}
              radius="md"
              className="text-gray-700 text-lg font-semibold"
            >
              Exportar
            </Button>
            <Button
              color="primary"
              radius="md"
              className="text-white text-lg font-semibold"
            >
              <Link href="/registros/agregar">Agregar registro</Link>
>>>>>>> db98695dea21a9e52e712f8c70eff88ca6fac8d0:src/app/components/registers/Register.tsx
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Register;

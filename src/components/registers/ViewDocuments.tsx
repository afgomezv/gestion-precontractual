"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import axios from "axios";
import { FaEye, FaRegSave } from "react-icons/fa";
import { fetcher } from "@/config/fetcher";
import { Textarea } from "@nextui-org/react";
import { documentosContratistas } from "@/data/contratistas";
import { Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { IDocumentos } from "@/interface/forms";
import Loading from "@/components/ui/Loading";

interface Inputs {
  observaciones: String;
  estado: Boolean;
}

function ViewDocuments({ params }: { params: { id: string } }) {
  const { data: data1 } = useSWR(`/api/registers/${params.id}`, fetcher);
  const { data: data2, isLoading } = useSWR(`/api/lote/${params.id}`, fetcher);
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  const cedula = data1?.numeroDocumento;
  const correo = data1?.correo;
  const elementosAUsar = data2?.filter((item: IDocumentos) => item.usar);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // if (data.estado === true) {
    //   console.log("la documentacion aprobada");
    //   console.log(data);
    // } else {
    //   console.log("la documentacion esta pendiente");
    //   console.log(data);
    // }

    const newData = {
      ...data,
      correo,
    };
    console.log(newData);

    await axios.post("/api/notification", newData);
    router.replace("/hiring/registers");
  };

  return (
    <div>
      {isLoading && <Loading />}
      {data2 && (
        <>
          <div className="title">Documentación del contratista</div>
          <div className="p-8 bg-white border border-gray-300 rounded-2xl">
            {elementosAUsar?.map((documento: IDocumentos, index: number) => (
              <div
                className="flex flex-row justify-evenly h-12 my-3"
                key={documento.id.toString()}
              >
                <div className="flex w-[450px]">
                  <p className="px-2">{index + 1}.</p>
                  <div className="text-base">{documento.nombre}</div>
                </div>
                <Button
                  size="md"
                  color="primary"
                  radius="sm"
                  startContent={<FaEye />}
                  className="capitalize font-semibold text-white hover:bg-[#169ab2]"
                >
                  <Link
                    target="_black"
                    href={`/pdfs/${cedula}/${documento.guardar}`}
                  >
                    Ver documento
                  </Link>
                </Button>
              </div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {/*Descripcion*/}
                <Textarea
                  label="Obervaciones."
                  color="primary"
                  variant="bordered"
                  placeholder="Escriba tus observaciones."
                  className="w-full"
                  {...register("observaciones")}
                />
                {/*Estado*/}
                {/* <label className="label-primary">
              <select
                className="peer select-primary"
                {...register("estado", { required: true })}
              >
                <option value=""></option>
                <option value="false">Pendiente</option>
                <option value="true">Aprobado</option>
              </select>
              <span className="span-primary">Estado *</span>
            </label> */}
              </div>
              <div className="px-4 py-4 flex justify-between">
                <Button
                  size="lg"
                  variant="ghost"
                  radius="sm"
                  startContent={<IoIosArrowBack />}
                  className="capitalize font-semibold text-lg text-gray-500 hover:text-white"
                >
                  <Link href={"/hiring/registers/"}>Volver</Link>
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  color="primary"
                  radius="sm"
                  endContent={<FaRegSave />}
                  className="capitalize font-semibold text-white hover:bg-[#169ab2]"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewDocuments;

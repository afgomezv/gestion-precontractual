"use client";
import { fetcher } from "@/config/fetcher";
import useSWR from "swr";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CgFileDocument } from "react-icons/cg";
import Loading from "@/components/ui/Loading";
import { Button } from "@nextui-org/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { FaRegSave } from "react-icons/fa";
import { IDocumentos } from "@/interface/forms";

const AddDocuments = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useSWR(`/api/lote/${params.id}`, fetcher);

  const { handleSubmit, register } = useForm<IDocumentos>();

  const onSubmit: SubmitHandler<IDocumentos> = (dataForm) => {
    console.log(dataForm);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex items-center">
        {data && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex justify-start pl-10 pt-10 pb-2 text-gray-500 border-b-2">
              <div className="w-24 px-2 text-center">Usar</div>
              <div className="w-24 px-2 text-center">Solicitar</div>
              <div className="w-24 px-2 text-center">Requerido</div>
            </section>
            {data.map((item: IDocumentos) => (
              <section
                key={item.id.toString()}
                className="flex items-center pl-10 py-2 border-b-2"
              >
                <div>
                  <input
                    type="checkbox"
                    className="w-24 h-4"
                    {...register("usar")}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="w-24 h-4"
                    {...register(`solicitar`)}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="w-24 h-4"
                    {...register(`requerido`)}
                  />
                </div>
                <div>
                  <textarea
                    name="nombre"
                    defaultValue={`${item.nombre}`}
                    className="w-96 pr-4 text-sm text-justify  items-center mr-4 text-gray-500 bg-transparent resize-none"
                  />
                </div>
                <Button
                  color="primary"
                  size="md"
                  radius="sm"
                  endContent={<CgFileDocument />}
                  className="capitalize font-semibold text-lg text-white hover:bg-[#169ab2]"
                >
                  Seleccionar
                </Button>
              </section>
            ))}
            {/* {data.map((item) => (
            <p>{item.nombre}</p>
          ))} */}
            <div className="flex justify-between px-3 py-4">
              <Button
                size="lg"
                variant="ghost"
                radius="sm"
                startContent={<IoIosArrowBack />}
                className="capitalize font-semibold text-lg text-gray-500 hover:text-white"
              >
                <Link href={"/hiring/forms"}>volver</Link>
              </Button>
              <Button
                type="submit"
                size="lg"
                color="primary"
                radius="sm"
                endContent={<FaRegSave />}
                className="capitalize font-semibold text-lg text-white hover:bg-[#169ab2]"
              >
                Guardar
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddDocuments;

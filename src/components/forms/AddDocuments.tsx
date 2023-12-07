"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { fetcher } from "@/config/fetcher";
import useSWR from "swr";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import Loading from "@/components/ui/Loading";
import { IDocumentos } from "@/interface/forms";
import { CgFileDocument } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";

const AddDocuments = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useSWR(`/api/lote/${params.id}`, fetcher);

  const { handleSubmit, register, control } = useForm<IDocumentos>({});

  const onSubmit: SubmitHandler<IDocumentos> = (dataForm) => {
    console.log(dataForm);
  };

  return (
    <>
      {isLoading && <Loading />}
      {data && (
        <>
          <div className="title">Editar documentos contractación</div>
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white border border-gray-200 rounded-xl"
            >
              <p className="text-gray-500 p-4">
                Seleccione la documentación que se va utilizar para la etapa
                contractual
              </p>
              <section className="flex justify-start pl-10 pt-10 pb-2 text-gray-500 border-b-2">
                <div className="w-24 px-2 text-center font-semibold uppercase">
                  Usar
                </div>
                <div className="w-24 px-2 text-center font-semibold uppercase">
                  Solicitar
                </div>
                <div className="w-24 px-2 text-center font-semibold uppercase">
                  Requerir
                </div>
              </section>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddDocuments;

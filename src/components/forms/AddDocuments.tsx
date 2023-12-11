"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { fetcher } from "@/config/fetcher";
import useSWR from "swr";
import { useFieldArray, useForm } from "react-hook-form";

import Loading from "@/components/ui/Loading";
import { IDocumentos } from "@/interface/forms";
import { CgFileDocument } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormValues = {
  documentos: IDocumentos[];
};

const AddDocuments = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useSWR(`/api/lote/${params.id}`, fetcher);
  const router = useRouter();

  const { handleSubmit, register, control, reset } = useForm<FormValues>({
    defaultValues: {
      documentos: [],
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        documentos: data.map((doc: IDocumentos) => ({
          id: doc.id,
          usar: doc.usar, // Asegúrate de que estas propiedades existan en 'data'
          solicitar: doc.solicitar,
          requerido: doc.requerido,
          nombre: doc.nombre,
          loteId: doc.loteId,
        })),
      });
    }
  }, [data, reset]);

  const { fields } = useFieldArray({
    control,
    name: "documentos",
  });

  const onSubmit = async (dataForm: FormValues) => {
    try {
      await axios.put(`/api/lote/${params.id}`, dataForm);
      router.replace("/hiring/forms");
    } catch (error) {
      console.error(error);
    }
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
              className=" bg-white border border-gray-200 rounded-xl"
            >
              <p className="text-gray-500 p-4">
                Seleccione la documentación que se va utilizar para la etapa
                contractual
              </p>
              <section className="flex justify-evenly pl-10 pt-10 pb-2 text-gray-500 border-b-1">
                <div className="w-24 px-2 text-center font-semibold uppercase">
                  Usar
                </div>
                <div className="w-24 px-2 text-center font-semibold uppercase">
                  Solicitar
                </div>
                <div className="w-24 px-2 text-center font-semibold uppercase">
                  Requerir
                </div>
                <div className="w-96 mr-4 px-2 text-center font-semibold uppercase">
                  Nombre del documento
                </div>
                <Button
                  color="secondary"
                  size="md"
                  radius="sm"
                  disabled
                  endContent={<CgFileDocument />}
                  className="capitalize font-semibold text-lg text-white hover:bg-[white]"
                >
                  Seleccionar
                </Button>
              </section>
              {fields.map((item, index) => (
                <section
                  key={item.id}
                  className="flex justify-evenly pl-10 py-2 border-b-1"
                >
                  <input
                    type="checkbox"
                    className="w-24 h-4"
                    {...register(`documentos.${index}.usar`)}
                  />
                  <input
                    type="checkbox"
                    className="w-24 h-4"
                    {...register(`documentos.${index}.solicitar`)}
                  />
                  <input
                    type="checkbox"
                    className="w-24 h-4"
                    {...register(`documentos.${index}.requerido`)}
                  />
                  <textarea
                    defaultValue={`${item.nombre}`}
                    className="w-96 mr-4 px-2 text-md text-justify text-gray-500 bg-transparent resize-none"
                    {...register(`documentos.${index}.nombre`)}
                  />
                  <input defaultValue={`${item.loteId}`} className="hidden" />
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
          </div>
        </>
      )}
    </>
  );
};

export default AddDocuments;

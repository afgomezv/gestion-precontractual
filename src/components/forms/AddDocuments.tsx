"use client";
import { fetcher } from "@/config/fetcher";
import useSWR from "swr";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CgFileDocument } from "react-icons/cg";

interface IDocumentos {
  id: Number;
  usar: Boolean;
  solicitar: Boolean;
  requerido: Boolean;
  nombre: String;
}

const AddDocuments = ({ params }: { params: { id: string } }) => {
  const { data } = useSWR(`/api/lote/${params.id}`, fetcher);
  const { handleSubmit, control } = useForm<IDocumentos>();

  console.log(data);

  const onSubmit: SubmitHandler<IDocumentos> = (dataForm) => {
    console.log(dataForm);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </section>
  );
};

export default AddDocuments;

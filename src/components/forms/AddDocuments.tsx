"use client";
import { fetcher } from "@/config/fetcher";
import useSWR from "swr";
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

  console.log(data);

  return <section></section>;
};

export default AddDocuments;

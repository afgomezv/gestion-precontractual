"use client";

import Link from "next/link";
import useSWR from "swr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { fetcher } from "@/config/fetcher";
import { documentosContratistas } from "@/data/contratistas";
import { Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { IDocumentos } from "@/interface/forms";
import Loading from "@/components/ui/Loading";

function LoadDocuments({ params }: { params: { id: string } }) {
  const { data: data1 } = useSWR(`/api/registers/${params.id}`, fetcher);
  const { data: data2, isLoading } = useSWR(`/api/lote/${params.id}`, fetcher);

  const cedula = data1?.numeroDocumento;
  const elementosAUsar = data2?.filter((item: IDocumentos) => item.usar);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    nombreDocumento: String
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        console.error("Error: Solo se admite archivos pdf");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        console.error(
          "Error: el archivo excede el tamño máximo permitido de 2MB"
        );
        return;
      }

      if (file.name !== nombreDocumento) {
        console.error(
          `Error: El nombre del archivo no es válido, debe llamarse de la siguiente forma ${nombreDocumento}`
        );
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("cedula", `${cedula}`);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {data2 && (
        <>
          <div className="title">Subir documentos de contractación</div>
          <div className="p-8 bg-white border border-gray-300 rounded-2xl">
            {elementosAUsar?.map((documento: IDocumentos) => (
              <div
                key={documento.id.toString()}
                className="flex flex-row justify-evenly h-12 my-3"
              >
                <div className="flex w-[450px]">
                  <p className="px-2">{documento.id.toString()}.</p>
                  <div className="text-base">{documento.nombre}</div>
                </div>
                <Button
                  type="submit"
                  size="md"
                  color="primary"
                  radius="sm"
                  startContent={<IoDocumentTextOutline />}
                  className="capitalize font-semibold text-white hover:bg-[#169ab2]"
                >
                  <label className="flex flex-row cursor-pointer">
                    Subir archivo
                    <input
                      type="file"
                      onChange={(event) =>
                        handleFileChange(event, documento.guardar)
                      }
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
            ))}
            <Button
              size="lg"
              variant="ghost"
              radius="sm"
              startContent={<IoIosArrowBack />}
              className="capitalize font-semibold text-lg text-gray-500 hover:text-white"
            >
              <Link href={"/hiring/registers/"}>Volver</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default LoadDocuments;

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { states } from "@/data/states";
import { ILotes } from "@/interface/forms";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { IoDocumentTextOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import { useState } from "react";

const AddLotes = () => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILotes>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      //todo: Leer y procesar el archivo aquí
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(json);
        alert("Archivo agregado exitosamente");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const onSubmit: SubmitHandler<ILotes> = async (data) => {
    const sendData = {
      ...data,
      excelData: excelData,
    };
    console.log(sendData);
    try {
      if (excelData.length > 0) {
        await axios.post("/api/lote", sendData);
        router.push("/hiring/forms/");
      } else {
        alert("Se debes anexar contratistas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="title">Crear / Editar Formulario Contractacion</div>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-gray-200 rounded-xl"
        >
          <div className="grid grid-cols-2 gap-4 px-4 pt-6 pb-8">
            {/*Nombre del lote*/}
            <Input
              type="text"
              label="Nombre *"
              variant="bordered"
              color={!errors.nombre ? "primary" : "danger"}
              isInvalid={!errors.nombre ? false : true}
              errorMessage={!errors.nombre ? "" : `${errors.nombre?.message}`}
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
            />
            {/*Estado del lote */}
            <Select
              label="Estado *"
              variant="bordered"
              color={!errors.estado ? "primary" : "danger"}
              isInvalid={!errors.estado ? false : true}
              errorMessage={!errors.estado ? "" : `${errors.estado?.message}`}
              {...register("estado", {
                required: {
                  value: true,
                  message: "El estado es requerido",
                },
              })}
            >
              {states.map((state) => (
                <SelectItem key={state.value}>{state.label}</SelectItem>
              ))}
            </Select>
            {/*Descripcion del lote */}
            <Textarea
              className="col-span-2"
              label="Obervaciones."
              color="primary"
              variant="bordered"
              {...register("descripcion")}
            />
            <Input
              type="date"
              label="Fecha Inicial *"
              variant="bordered"
              color={!errors.fechaInicial ? "primary" : "danger"}
              isInvalid={!errors.fechaInicial ? false : true}
              errorMessage={
                !errors.fechaInicial ? "" : `${errors.fechaInicial?.message}`
              }
              placeholder="Fecha Inicial *"
              {...register("fechaInicial", {
                required: {
                  value: true,
                  message: "La fecha inicial es requerida",
                },
              })}
            />
            <Input
              type="date"
              label="Fecha Final *"
              variant="bordered"
              color={!errors.fechaFinal ? "primary" : "danger"}
              isInvalid={!errors.fechaFinal ? false : true}
              errorMessage={
                !errors.fechaFinal ? "" : `${errors.fechaFinal?.message}`
              }
              placeholder="Fecha Final *"
              {...register("fechaFinal", {
                required: {
                  value: true,
                  message: "La fecha final es requerida",
                },
              })}
            />
            <Button
              size="lg"
              color="primary"
              radius="sm"
              isDisabled={excelData.length === 0 ? false : true}
              startContent={<IoDocumentTextOutline />}
              className="w-1/2 capitalize font-semibold text-white hover:bg-[#169ab2]"
            >
              <label className="flex flex-row cursor-pointer">
                Subir archivo
                <Input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>

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
              endContent={<IoIosArrowForward />}
              className="capitalize font-semibold text-lg text-white hover:bg-[#169ab2]"
            >
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddLotes;

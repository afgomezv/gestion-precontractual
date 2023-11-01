"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { civilStatus } from "@/data/civilStatus";
import { genders } from "@/data/genders";
import { typeDocuments } from "@/data/typeDocuments";
import { IEmployee } from "@/interface/IEmployee";
import { FaRegSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

function AddEmployee({ params }: { params: { id: string } }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IEmployee>();
  const router = useRouter();
  //console.log(errors);

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/registers/${params.id}`).then((res) => {
        setValue("tipoDocumento", res.data.tipoDocumento);
        setValue("numeroDocumento", res.data.numeroDocumento);
        setValue("primerNombre", res.data.primerNombre);
        setValue("segundoNombre", res.data.segundoNombre);
        setValue("primerApellido", res.data.primerApellido);
        setValue("segundoApellido", res.data.segundoApellido);
        setValue("celular", res.data.celular);
        setValue("correo", res.data.correo);
        setValue("fechaNacimiento", res.data.fechaNacimiento);
        setValue("genero", res.data.genero);
        setValue("estadoCivil", res.data.estadoCivil);
      });
    }
  }, [params.id, setValue]);

  const onSubmit: SubmitHandler<IEmployee> = async (data) => {
    if (params.id) {
      //Todo: Actualizar contractista
      try {
        await axios.put(`/api/registers/${params.id}`, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      //Todo: Crear contractista
      try {
        await axios.post("/api/registers", data);
      } catch (error) {
        console.log(error);
      }
    }
    reset();
    router.replace("/hiring/registers");
  };

  return (
    <section>
      <div className="title">Formulario contractación</div>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-gray-200 rounded-xl"
        >
          <h2 className="px-4 pt-4 pb-2 text-gray-500 text-lg font-medium">
            {!params.id ? "Confirmar" : "Actualizar"} la siguiente información
          </h2>
          <div className="grid grid-cols-2 gap-4 px-4 pt-6 pb-8">
            {/*Tipo de Documento */}
            <Select
              label="Tipo de Documento * "
              variant="bordered"
              color={!errors.tipoDocumento ? "primary" : "danger"}
              isInvalid={!errors.tipoDocumento ? false : true}
              errorMessage={
                !errors.tipoDocumento ? "" : `${errors.tipoDocumento?.message}`
              }
              {...register("tipoDocumento", {
                required: {
                  value: true,
                  message: "El tipo de documento es requerido",
                },
              })}
            >
              {typeDocuments.map((typeDocument) => (
                <SelectItem key={typeDocument.value}>
                  {typeDocument.label}
                </SelectItem>
              ))}
              {/* <SelectItem key="Cédula de Ciudadanía">
                Cédula de Ciudadanía
              </SelectItem>
              <SelectItem key="Cédula de Extrangería">
                Cédula de Extranjería
              </SelectItem> */}
            </Select>
            {/*Numero de documento */}
            <Input
              type="text"
              label="Número de documento *"
              variant="bordered"
              color={!errors.numeroDocumento ? "primary" : "danger"}
              isInvalid={!errors.numeroDocumento ? false : true}
              errorMessage={
                !errors.numeroDocumento
                  ? ""
                  : `${errors.numeroDocumento?.message}`
              }
              {...register("numeroDocumento", {
                required: {
                  value: true,
                  message: "El número de documento es requerido",
                },
              })}
            />
            {/*Primer Nombre */}
            <Input
              type="text"
              label="Primer nombre *"
              variant="bordered"
              color={!errors.primerNombre ? "primary" : "danger"}
              isInvalid={!errors.primerNombre ? false : true}
              errorMessage={
                !errors.primerNombre ? "" : `${errors.primerNombre?.message}`
              }
              {...register("primerNombre", {
                required: {
                  value: true,
                  message: "El primer nombre es requerido",
                },
              })}
            />
            {/*Segundo Nombre */}
            <Input
              type="text"
              label="Segundo nombre"
              variant="bordered"
              color="primary"
              {...register("segundoNombre")}
            />
            {/* Primer Apellido*/}
            <Input
              type="text"
              label="Primer apellido *"
              variant="bordered"
              color={!errors.primerApellido ? "primary" : "danger"}
              isInvalid={!errors.primerApellido ? false : true}
              errorMessage={
                !errors.primerApellido
                  ? ""
                  : `${errors.primerApellido?.message}`
              }
              {...register("primerApellido", {
                required: {
                  value: true,
                  message: "El primer apellido es requerido",
                },
              })}
            />
            {/* Segundo Apellido */}
            <Input
              type="text"
              label="Segundo apellido *"
              variant="bordered"
              color={!errors.segundoApellido ? "primary" : "danger"}
              isInvalid={!errors.segundoApellido ? false : true}
              errorMessage={
                !errors.segundoApellido
                  ? ""
                  : `${errors.segundoApellido?.message}`
              }
              {...register("segundoApellido", {
                required: {
                  value: true,
                  message: "El segundo apellido es requerido",
                },
              })}
            />
            {/*celular*/}
            <Input
              type="text"
              label="Celular *"
              variant="bordered"
              color={!errors.celular ? "primary" : "danger"}
              isInvalid={!errors.celular ? false : true}
              errorMessage={!errors.celular ? "" : `${errors.celular?.message}`}
              {...register("celular", {
                required: {
                  value: true,
                  message: "El celular es requerido",
                },
                pattern: {
                  value: /^(3\d{9})$/,
                  message: "El formato del celular no es válido",
                },
              })}
            />
            {/*Correo electronico*/}
            <Input
              type="text"
              label="Correo electrónico *"
              variant="bordered"
              color={!errors.correo ? "primary" : "danger"}
              isInvalid={!errors.correo ? false : true}
              errorMessage={!errors.correo ? "" : `${errors.correo?.message}`}
              {...register("correo", {
                required: {
                  value: true,
                  message: "El correo electrónico es requerido",
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "El formato del correo no es válido",
                },
              })}
            />
            {/*Fecha de Nacimiento*/}
            <Input
              type="date"
              label="Fecha de Nacimiento"
              variant="bordered"
              color={!errors.fechaNacimiento ? "primary" : "danger"}
              isInvalid={!errors.fechaNacimiento ? false : true}
              errorMessage={
                !errors.fechaNacimiento
                  ? ""
                  : `${errors.fechaNacimiento?.message}`
              }
              placeholder="Fecha de nacimiento *"
              {...register("fechaNacimiento", {
                required: {
                  value: true,
                  message: "La fecha de nacimiento es requerida",
                },
                validate: (value) => {
                  const fechaNacimiento = new Date(value);
                  const fechaActual = new Date();
                  const edad =
                    fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                  if (edad >= 18) {
                    return true;
                  } else {
                    return "Debe ser mayor de edad";
                  }
                },
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              {/*Genero*/}
              <Select
                label="Género *"
                variant="bordered"
                color={!errors.genero ? "primary" : "danger"}
                isInvalid={!errors.genero ? false : true}
                errorMessage={!errors.genero ? "" : `${errors.genero?.message}`}
                {...register("genero", {
                  required: {
                    value: true,
                    message: "El género es requerido",
                  },
                })}
              >
                {genders.map((gender) => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </Select>
              {/*Esto civil*/}
              <Select
                label="Estado Civil *"
                variant="bordered"
                color={!errors.estadoCivil ? "primary" : "danger"}
                isInvalid={!errors.estadoCivil ? false : true}
                errorMessage={
                  !errors.estadoCivil ? "" : `${errors.estadoCivil?.message}`
                }
                {...register("estadoCivil", {
                  required: {
                    value: true,
                    message: "El estado civil es requerido",
                  },
                })}
              >
                {civilStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-between px-3 py-4">
            <Button
              size="lg"
              variant="ghost"
              radius="sm"
              startContent={<IoIosArrowBack />}
              className="capitalize font-semibold text-lg text-gray-500 hover:text-white"
            >
              <Link href={"/hiring/registers"}>volver</Link>
            </Button>
            <Button
              type="submit"
              size="lg"
              color="primary"
              radius="sm"
              endContent={<FaRegSave />}
              className="capitalize font-semibold text-lg text-white hover:bg-[#169ab2]"
            >
              {!params.id ? "Guardar" : "Actualizar"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddEmployee;

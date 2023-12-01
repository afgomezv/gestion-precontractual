import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { documentosContratistas } from "@/data/contratistas";

export async function GET() {
  const lotes = await prisma.loteContractacion.findMany();

  const customizedLotes = lotes.map((lote) => {
    return {
      id: lote.id,
      nombre: lote.nombre,
      estado: lote.estado,
      descripcion: lote.descripcion,
      fechaCreacion: lote.fechaInicial,
      registros: "500",
    };
  });
  return NextResponse.json(customizedLotes);
}

export async function POST(request: Request) {
  const data = await request.json();

  const lote = await prisma.loteContractacion.create({
    data,
  });

  //Todo: Crear cada documento predefinido y asociarlo al lote
  for (const doc of documentosContratistas) {
    await prisma.documentos.create({
      data: {
        usar: doc.usar,
        solicitar: doc.solicitar,
        requerido: doc.requerido,
        nombre: doc.nombre,
        guardar: doc.saveDoc,
        loteContratacion: {
          connect: {
            id: lote.id,
          },
        },
      },
    });
  }

  // const documentos = await prisma.documentos.create({
  //   data: {
  //     usar: false,
  //     solicitar: false,
  //     requerido: false,
  //     nombre: "nombre del documento",
  //     guardar: "nombre documento a guardar",
  //     loteContratacion: {
  //       connect: {
  //         id: lote.id,
  //       },
  //     },
  //   },
  // });

  return NextResponse.json(lote);
}

import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET() {
  const lotes = await prisma.loteContractacion.findMany();
  return NextResponse.json(lotes);
}

export async function POST(request: Request) {
  const data = await request.json();
  const lote = await prisma.loteContractacion.create({
    data,
  });

  const documentos = await prisma.documentos.create({
    data: {
      usar: false,
      Solicitar: false,
      requerido: false,
      nombre: "nombre del documento",
      guardar: "nombre documento a guardar",
      documentos: {
        connnect: {
          id: lote.id,
        },
      },
    },
  });
}

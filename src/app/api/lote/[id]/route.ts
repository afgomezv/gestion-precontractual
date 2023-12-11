import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";
import { log } from "util";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  if (!params.id) {
    return NextResponse.json({ error: "Lote ID is required" }, { status: 400 });
  }

  const documentos = await prisma.documentos.findMany({
    where: {
      loteId: parseInt(params.id), // Filtra por lote ID
    },
  });

  return NextResponse.json(documentos);
}

type Documento = {
  id: number;
  usar: boolean;
  solicitar: boolean;
  requerido: boolean;
  nombre: string;
  loteId: number;
};

type RequestBody = {
  documentos: Documento[];
};

export async function PUT(request: Request, { params }: Params) {
  const { documentos }: RequestBody = await request.json();

  try {
    for (const doc of documentos) {
      await prisma.documentos.update({
        where: { id: doc.id, loteId: doc.loteId },
        data: {
          usar: doc.usar,
          solicitar: doc.solicitar,
          requerido: doc.requerido,
          nombre: doc.nombre,
        },
      });
    }

    return NextResponse.json({ message: "Documento actualizado" });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizar" });
  }
}

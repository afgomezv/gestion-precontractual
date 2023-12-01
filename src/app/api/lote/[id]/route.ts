import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

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

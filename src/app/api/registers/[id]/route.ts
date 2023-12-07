import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const empleado = await prisma.registros.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      contractaciones: true,
    },
  });
  return NextResponse.json(empleado);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  console.log(data);

  const empleadoUpdated = await prisma.registros.update({
    where: {
      id: Number(params.id),
    },
    data,
  });
  return NextResponse.json(empleadoUpdated);
}

export async function DELETE(request: Request, { params }: Params) {
  const empleado = await prisma.registros.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(empleado);
}

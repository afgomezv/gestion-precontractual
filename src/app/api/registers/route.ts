import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET() {
  const employees = await prisma.registros.findMany();
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const data = await request.json();
  const employee = await prisma.registros.create({
    data,
  });
  const statesProcess = await prisma.estadosProcesos.create({
    data: {
      tecnico: false,
      juridico: false,
      financiero: false,
      supervision: false,
      employee: {
        connect: {
          id: employee.id,
        },
      },
    },
  });

  return NextResponse.json(employee);
}

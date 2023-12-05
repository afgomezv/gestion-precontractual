import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { log } from "console";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const employee = await prisma.registros.findUnique({
      where: {
        numeroDocumento: data.numeroDocumento,
      },
    });
    if (employee === null) {
      return NextResponse.json({ message: "la cedula  no existe" });
    } else {
      return NextResponse.json(employee);
    }
  } catch (error) {
    return NextResponse.json({ message: `${error}` });
  }
}

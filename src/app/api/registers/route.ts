import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import transporter from "@/config/nodemailer";

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
      tecnico: "pendiente",
      juridico: "pendiente",
      financiero: "pendiente",
      supervision: "pendiente",
      employee: {
        connect: {
          id: employee.id,
        },
      },
    },
  });

  const mailOptions = {
    from: `Contractación INDER ${process.env.EMAIL}`,
    to: `${employee.correo}`,
    subject: "Documentos para la contractación del INDER",
    html: `
    <head>
      <style>
        .text-link {
          color: #0070f3
        }
      </style>
    </head>
    <div>
      <p>En el siguiente link puede subir los documentos</p>
      <a href="http://localhost:3000/hiring/registers/documents/${employee.id}" class="text-link">Subir Doumentación</a>
    </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

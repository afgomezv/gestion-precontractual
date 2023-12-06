import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import transporter from "@/config/nodemailer";
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
      registros: lote.registros,
    };
  });
  return NextResponse.json(customizedLotes);
}

export async function POST(request: Request) {
  const data = await request.json();

  const employeeData = data.excelData;
  const lenghtArray = employeeData.length;

  const lote = await prisma.loteContractacion.create({
    data: {
      nombre: data.nombre,
      estado: data.estado,
      descripcion: data.descripcion,
      fechaInicial: data.fechaInicial,
      fechaFinal: data.fechaFinal,
      registros: `${lenghtArray}`,
    },
  });

  //Todo: Crear usuario si no existe con validacion
  for (const excelData of employeeData) {
    let employee = await prisma.registros.findUnique({
      where: { numeroDocumento: `${excelData.cedula}` },
    });

    if (!employee) {
      employee = await prisma.registros.create({
        data: {
          numeroDocumento: `${excelData.cedula}`,
          tipoDocumento: "",
          primerNombre: "",
          segundoNombre: "",
          primerApellido: "",
          segundoApellido: "",
          celular: "",
          fechaNacimiento: "",
          genero: "",
          estadoCivil: "",
          correo: excelData.correo,
        },
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
    } else {
      const statesProcess = await prisma.estadosProcesos.updateMany({
        where: {
          employeeId: employee.id,
        },
        data: {
          tecnico: "pendiente",
          juridico: "pendiente",
          financiero: "pendiente",
          supervision: "pendiente",
        },
      });
    }

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
        <a href="http://localhost:3000/hiring/registers/add" class="text-link">Subir Doumentación</a>
      </div>
      `,
    };

    await prisma.contractacion.create({
      data: {
        contratistaId: employee.id,
        loteId: lote.id,
      },
    });

    const info = await transporter.sendMail(mailOptions);
  }

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

  return NextResponse.json(lote);
}

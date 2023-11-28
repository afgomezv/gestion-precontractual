import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET() {
  const employees = await prisma.registros.findMany({
    include: {
      estadosProceso: true,
    },
  });

  const customizedEmployees = employees.map((employee) => {
    //const tecnicoArray = employee.estadosProceso.map((state) => state.tecnico);
    return {
      id: employee.id,
      tipoDocumento: employee.tipoDocumento,
      numeroDocumento: employee.numeroDocumento,
      nombreCompleto: `${employee.primerNombre}  ${employee.segundoNombre}  ${employee.primerApellido} ${employee.segundoApellido}`,
      dependencia: "Oficina",
      tecnico: employee.estadosProceso.map((state) => state.tecnico),
      juridico: employee.estadosProceso.map((state) => state.juridico),
      financiero: employee.estadosProceso.map((state) => state.juridico),
      supervision: employee.estadosProceso.map((state) => state.supervision),
    };
  });

  console.log(customizedEmployees);

  return NextResponse.json(customizedEmployees);
}

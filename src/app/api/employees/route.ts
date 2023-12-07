import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET() {
  const employees = await prisma.registros.findMany({
    include: {
      estadosProceso: true,
      contractaciones: true,
    },
  });

  const customizedEmployees = employees.map((employee) => {
    const tecnicoArray = employee.estadosProceso.map((state) => state.tecnico);
    const juridicoArray = employee.estadosProceso.map(
      (state) => state.juridico
    );
    const financieroArray = employee.estadosProceso.map(
      (state) => state.financiero
    );
    const supervisionArray = employee.estadosProceso.map(
      (state) => state.supervision
    );
    return {
      id: employee.id,
      tipoDocumento: employee.tipoDocumento,
      numeroDocumento: employee.numeroDocumento,
      nombreCompleto: `${employee.primerNombre}  ${employee.segundoNombre}  ${employee.primerApellido} ${employee.segundoApellido}`,
      dependencia: "Oficina",
      tecnico: tecnicoArray.join(""),
      juridico: juridicoArray.join(""),
      financiero: financieroArray.join(""),
      supervision: supervisionArray.join(""),
      contractaciones: employee.contractaciones,
    };
  });

  //console.log(customizedEmployees);

  return NextResponse.json(customizedEmployees);
}

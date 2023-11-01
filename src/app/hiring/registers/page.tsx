import { prisma } from "@/config/prisma";
import Register from "@/components/registers/Register";

async function loadEmployees() {
  return await prisma.registros.findMany();
}

async function loadStates() {
  return await prisma.estadosProcesos.findMany();
}

async function RegistersPage() {
  const employees = await loadEmployees();
  const statesProcess = await loadStates();
  console.log(employees);
  console.log(statesProcess);

  return (
    <div>
      <Register employees={employees} stateProcess={statesProcess} />
    </div>
  );
}

export default RegistersPage;

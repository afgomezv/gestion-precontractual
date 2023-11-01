-- CreateTable
CREATE TABLE "Registros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "segundoNombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EstadosProcesos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tecnico" BOOLEAN NOT NULL,
    "juridico" BOOLEAN NOT NULL,
    "financiero" BOOLEAN NOT NULL,
    "supervision" BOOLEAN NOT NULL,
    "employeeId" INTEGER NOT NULL,
    CONSTRAINT "EstadosProcesos_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Registros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

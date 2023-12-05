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
    "tecnico" TEXT NOT NULL,
    "juridico" TEXT NOT NULL,
    "financiero" TEXT NOT NULL,
    "supervision" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    CONSTRAINT "EstadosProcesos_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Registros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LoteContractacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaInicial" TEXT NOT NULL,
    "fechaFinal" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Documentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usar" BOOLEAN NOT NULL,
    "solicitar" BOOLEAN NOT NULL,
    "requerido" BOOLEAN NOT NULL,
    "nombre" TEXT NOT NULL,
    "guardar" TEXT NOT NULL,
    "loteId" INTEGER NOT NULL,
    CONSTRAINT "Documentos_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "LoteContractacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contractacion" (
    "contratistaId" INTEGER NOT NULL,
    "loteId" INTEGER NOT NULL,

    PRIMARY KEY ("contratistaId", "loteId"),
    CONSTRAINT "Contractacion_contratistaId_fkey" FOREIGN KEY ("contratistaId") REFERENCES "Registros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contractacion_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "LoteContractacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Registros_numeroDocumento_key" ON "Registros"("numeroDocumento");

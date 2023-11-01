enum TipoDocumento {
  cc = "Cédula de Ciudadanía",
  ce = "Cédula de Extrangería",
  ti = "Tarjeta Identidad",
  rc = "Registro Civil",
  pa = "Pasaporte",
  nit = "Número Identificación Tributaria",
  pep = "Permiso Especial de Permanecia",
  nuip = "Número Único de Identificación Personal",
}

enum Genero {
  masculino = "Masculino",
  femenino = "Femenino",
  sinDeterminar = "Sin determinar",
}

enum EstadoCivil {
  soltero = "Soltero(a)",
  casado = "Casado(a)",
  divorciado = "Divorciado(a)",
  unionLibre = "Union libre",
  viudo = "Viudo(a)",
}

export interface IEmployee {
  tipoDocumento: TipoDocumento;
  numeroDocumento: Number;
  primerNombre: String;
  segundoNombre: String;
  primerApellido: String;
  segundoApellido: string;
  celular: Number;
  correo: String;
  fechaNacimiento: Date;
  genero: Genero;
  estadoCivil: EstadoCivil;
}

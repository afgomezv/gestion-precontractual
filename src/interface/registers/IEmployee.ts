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
  id: Number;
  tipoDocumento: String;
  numeroDocumento: String;
  primerNombre: String;
  segundoNombre: String;
  primerApellido: String;
  segundoApellido: String;
  celular: String;
  correo: String;
  fechaNacimiento: String;
  genero: String;
  estadoCivil: String;
}

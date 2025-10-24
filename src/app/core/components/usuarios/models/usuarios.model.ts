export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  gmail: string;
  direccion: string;
  telefono: string;
  estadoCivil: string;
  nacionalidad: string;
  genero: string;
  ncarnet: string;
}

export interface UsuarioPayload {
  id: number;
  name: string;
  password: string;
}




export interface Usuario {
  id: number;
  estado: string;
  fechaRegistro: string;
  sueldoBase: string;
  role: string;
  persona?: Persona; // Relación 1:1
}
export interface Image {
  id: number;
  url: string;
  nombre?: string;
  tipo?: string;
}

export interface UsuarioDTOForWeb{
  id: number;
  idPer: number;
  estado: string;
  fechaRegistro: string;
  sueldoBase: string;
  role: string;
  nombre: string;
  apellido: string;
  gmail: string;
  direccion: string;
  telefono: string;
  estadoCivil: string;
  nacionalidad: string;
  imageUrl: string;
}
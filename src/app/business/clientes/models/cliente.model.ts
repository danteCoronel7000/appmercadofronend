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



export interface Cliente {
  id: number;
  referenciaDireccion: string;
  frecuenciaCompra: string;
  fechaRegistro: string;
  diaPreferidoDeEntrega: string;
  persona?: Persona; // Relación 1:1
}
export interface Image {
  id: number;
  url: string;
  nombre?: string;
  tipo?: string;
}

export interface ClienteDTOForWeb{
  id: number;
  referenciaDireccion: string;
  estado: string;
  nit: string;
  fechaRegistro: string;
  frecuenciaCompra: string;
  diaPreferidoDeEntrega: string;
  nombre: string;
  apellido: string;
  gmail: string;
  direccion: string;
  telefono: string;
  estadoCivil: string;
  nacionalidad: string;
  ncarnet: string;
  imageUrl: string;
}
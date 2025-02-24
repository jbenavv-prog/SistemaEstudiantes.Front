export interface MateriaWithValidationsResponse {
  idMateria: number;
  nombre: string;
  puedeIngresar: boolean;
  esMiembro: boolean;
  mensajes: [];
  // Agrega más propiedades según tu API
}
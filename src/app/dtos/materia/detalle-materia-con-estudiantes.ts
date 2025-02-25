import { UsuarioDTO } from "../usuario/usuario.dto";

export interface DetalleMateriaConEstudiantesResponseDTO {
  idMateria: number;
  nombre: string;
  estudiantes: UsuarioDTO[];
}
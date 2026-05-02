import { ConcursoEntity } from "../entities/concurso.entity"; 
import { CreateConcursoDTO } from "../dtos/create-concurso.dto";

export abstract class ConcursoRepository {
  abstract create(data: CreateConcursoDTO & { hash: string }): Promise<ConcursoEntity>;

  abstract createMany(
    data: Array<CreateConcursoDTO & { hash: string }>,
  ): Promise<number>;

  abstract findByNumero(numero: number): Promise<ConcursoEntity | null>;

  abstract findAllNumeros(): Promise<number[]>;

  abstract findUltimo(): Promise<ConcursoEntity | null>;

  abstract count(): Promise<number>;
}
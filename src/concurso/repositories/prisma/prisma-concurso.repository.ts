import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../config/prisma/prisma.service"; 
import { ConcursoRepository } from "../concurso.repository";
import { ConcursoEntity } from "../../entities/concurso.entity";
import { CreateConcursoDTO } from "../../dtos/create-concurso.dto";

@Injectable()
export class PrismaConcursoRepository implements ConcursoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateConcursoDTO & { hash: string },
  ): Promise<ConcursoEntity> {
    return this.prisma.client.concurso.create({
      data: {
        numero:         data.numero,
        data:           new Date(data.data),
        dezenas:        data.dezenas,
        hash:           data.hash,
        soma:           data.soma,
        pares:          data.pares,
        impares:        data.impares,
        maiorSequencia: data.maiorSequencia,
        faixa1a5:       data.faixa1a5,
        faixa6a10:      data.faixa6a10,
        faixa11a15:     data.faixa11a15,
        faixa16a20:     data.faixa16a20,
        faixa21a25:     data.faixa21a25,
      },
    });
  }

  async createMany(
    data: Array<CreateConcursoDTO & { hash: string }>,
  ): Promise<number> {
    const result = await this.prisma.client.concurso.createMany({
      data: data.map((c) => ({
        numero:         c.numero,
        data:           new Date(c.data),
        dezenas:        c.dezenas,
        hash:           c.hash,
        soma:           c.soma,
        pares:          c.pares,
        impares:        c.impares,
        maiorSequencia: c.maiorSequencia,
        faixa1a5:       c.faixa1a5,
        faixa6a10:      c.faixa6a10,
        faixa11a15:     c.faixa11a15,
        faixa16a20:     c.faixa16a20,
        faixa21a25:     c.faixa21a25,
      })),
      skipDuplicates: true,
    });

    return result.count;
  }

  async findByNumero(numero: number): Promise<ConcursoEntity | null> {
    return this.prisma.client.concurso.findUnique({ where: { numero } });
  }

  async findAllNumeros(): Promise<number[]> {
    const rows = await this.prisma.client.concurso.findMany({
      select: { numero: true },
    });
    return rows.map((r) => r.numero);
  }

  async findUltimo(): Promise<ConcursoEntity | null> {
    return this.prisma.client.concurso.findFirst({
      orderBy: { numero: "desc" },
    });
  }

  async count(): Promise<number> {
    return this.prisma.client.concurso.count();
  }
}
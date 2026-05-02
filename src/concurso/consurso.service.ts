import { Injectable, Logger, ConflictException } from "@nestjs/common";
import { createHash } from "crypto";
import { ConcursoRepository } from "./repositories/concurso.repository";
import { ConcursoEntity } from "./entities/concurso.entity";
import { CreateConcursoDTO } from "./dtos/create-concurso.dto";
import { ImportLoteResult } from "./dtos/import-lote.result";

@Injectable()
export class ConcursoService {
  private readonly logger = new Logger(ConcursoService.name);

  constructor(private readonly concursoRepository: ConcursoRepository) {}

  // ── hash ──────────────────────────────────────────────────────────────────
  // SHA-256 determinístico — essencial para @unique no banco.
  // bcrypt NÃO serve aqui: gera salt aleatório a cada chamada,
  // tornando impossível detectar combinações duplicadas.

  private hashDezenas(dezenas: number[]): string {
    const ordenadas = [...dezenas].sort((a, b) => a - b);
    return createHash("sha256")
      .update(JSON.stringify(ordenadas))
      .digest("hex");
  }

  // ── inserir único ─────────────────────────────────────────────────────────

  async inserir(dto: CreateConcursoDTO): Promise<ConcursoEntity> {
    const existente = await this.concursoRepository.findByNumero(dto.numero);

    if (existente) {
      throw new ConflictException(
        `Concurso nº${dto.numero} já existe no banco.`,
      );
    }

    return this.concursoRepository.create({
      ...dto,
      hash: this.hashDezenas(dto.dezenas),
    });
  }

  // ── importar lote (usado pelo seed) ───────────────────────────────────────

  async importarLote(dtos: CreateConcursoDTO[]): Promise<ImportLoteResult> {
    this.logger.log(`Iniciando importação de ${dtos.length} concursos...`);

    const existentes = new Set(
      await this.concursoRepository.findAllNumeros(),
    );

    const pendentes = dtos.filter((c) => !existentes.has(c.numero));
    const ignorados = dtos.length - pendentes.length;

    this.logger.log(
      `Já no banco: ${existentes.size} | Pendentes: ${pendentes.length} | Ignorados: ${ignorados}`,
    );

    if (pendentes.length === 0) {
      return { inseridos: 0, ignorados, erros: 0, total: dtos.length };
    }

    const payload = pendentes.map((c) => ({
      ...c,
      hash: this.hashDezenas(c.dezenas),
    }));

    const inseridos = await this.concursoRepository.createMany(payload);
    const erros = pendentes.length - inseridos;

    this.logger.log(`Concluído — inseridos: ${inseridos} | erros: ${erros}`);

    return { inseridos, ignorados, erros, total: dtos.length };
  }

  // ── consultas ─────────────────────────────────────────────────────────────

  async buscarPorNumero(numero: number): Promise<ConcursoEntity | null> {
    return this.concursoRepository.findByNumero(numero);
  }

  async buscarUltimo(): Promise<ConcursoEntity | null> {
    return this.concursoRepository.findUltimo();
  }

  async contarTotal(): Promise<number> {
    return this.concursoRepository.count();
  }
}
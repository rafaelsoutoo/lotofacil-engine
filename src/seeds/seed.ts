
import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

import { ConcursoModule } from "../concurso/concurso.module";
import { ConcursoService } from "../concurso/consurso.service"; 
import { CreateConcursoDTO } from "../concurso/dtos/create-concurso.dto";
import console from "console";

@Module({ imports: [ConcursoModule] })
class SeedModule {}

function barra(atual: number, total: number): string {
  const pct = Math.round((atual / total) * 100);
  const filled = Math.floor(pct / 5);
  return `[${"█".repeat(filled)}${"░".repeat(20 - filled)}] ${pct}% (${atual}/${total})`;
}

async function main() {
  const jsonPath = path.join(__dirname, "concursos.json");

  if (!fs.existsSync(jsonPath)) {
    console.error(`\n❌ concursos.json não encontrado em: ${jsonPath}\n`);
    process.exit(1);
  }

  // ── bootstrap mínimo ───────────────────────────────────────────────────────
  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: ["error", "warn"],
  });
  const service = app.get(ConcursoService);

  // ── lê o JSON ──────────────────────────────────────────────────────────────
  console.log("\n📂 Lendo concursos.json...");
  const concursos: CreateConcursoDTO[] = JSON.parse(
    fs.readFileSync(jsonPath, "utf-8"),
  );

  console.log(`   Total no arquivo  : ${concursos.length}`);
  console.log(
    `   Período           : nº${concursos[0].numero} (${concursos[0].data}) → nº${concursos.at(-1)!.numero} (${concursos.at(-1)!.data})`,
  );

  const BATCH_SIZE = 500;
  let inseridosTotal = 0;
  let ignoradosTotal = 0;
  let errosTotal = 0;

  console.log(`\n⏳ Importando em batches de ${BATCH_SIZE}...\n`);

  for (let i = 0; i < concursos.length; i += BATCH_SIZE) {
    const batch = concursos.slice(i, i + BATCH_SIZE);
    const result = await service.importarLote(batch);

    inseridosTotal += result.inseridos;
    ignoradosTotal += result.ignorados;
    errosTotal     += result.erros;

    process.stdout.write(
      `\r   ${barra(Math.min(i + BATCH_SIZE, concursos.length), concursos.length)}`,
    );
  }

  // ── resumo ─────────────────────────────────────────────────────────────────
  const totalNoBanco = await service.contarTotal();

  console.log("\n");
  console.log("──────────────────────────────────────────────");
  console.log("🎯 Seed concluído!");
  console.log(`   Inseridos         : ${inseridosTotal}`);
  console.log(`   Já existiam       : ${ignoradosTotal}`);
  if (errosTotal > 0) console.log(`   Erros             : ${errosTotal}`);
  console.log(`   Total no banco    : ${totalNoBanco}`);
  console.log("──────────────────────────────────────────────\n");

  await app.close();
}

main().catch((e) => {
  console.error("\n❌ Erro fatal:", e);
  process.exit(1);
});
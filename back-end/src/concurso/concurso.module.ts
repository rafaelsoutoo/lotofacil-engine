import { Module } from "@nestjs/common";
import { ConcursoService } from "./concurso.service";
import { ConcursoRepository } from "./repositories/concurso.repository";
import { PrismaConcursoRepository } from "./repositories/prisma/prisma-concurso.repository";
import { PrismaModule } from "../config/prisma/prisma.module"; 

@Module({
  imports: [PrismaModule],
  providers: [
    ConcursoService,
    {
      provide: ConcursoRepository,
      useClass: PrismaConcursoRepository,
    },
  ],
  exports: [ConcursoService],
})
export class ConcursoModule {}
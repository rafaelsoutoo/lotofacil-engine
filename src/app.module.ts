import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { ConcursoModule } from './concurso/concurso.module';
import { FiltroModule } from './filtro/filtro.module';
import { EstatisticasModule } from './estatisticas/estatisticas.module';

@Module({
  imports: [
    PrismaModule,
    ConcursoModule,
    FiltroModule,
    EstatisticasModule,
  ],
})
export class AppModule { }

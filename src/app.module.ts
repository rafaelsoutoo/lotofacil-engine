import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { ConcursoModule } from './concurso/concurso.module';
import { FiltroModule } from './filtro/filtro.module';

@Module({
  imports: [
    PrismaModule,
    ConcursoModule,
    FiltroModule,
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { ConcursoModule } from './concurso/concurso.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    PrismaModule,
    ConcursoModule,
  ],
  controllers: [],
})
export class AppModule { }

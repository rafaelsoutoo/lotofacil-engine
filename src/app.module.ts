import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './config/prisma/prisma.module';
import { ConcursoModule } from './concurso/concurso.module';
import { prisma } from './config/prisma/prisma';

@Module({
  imports: [
    PrismaModule,
    ConcursoModule,
  ],
  controllers: [AppController],
})
export class AppModule { }

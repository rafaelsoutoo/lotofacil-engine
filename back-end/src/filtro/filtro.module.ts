import { Module } from '@nestjs/common'
import { FiltroService } from './filtro.service'
import { FiltroController } from './filtro.controller'

@Module({
  controllers: [FiltroController],
  providers: [FiltroService],
  exports: [FiltroService],
})
export class FiltroModule {}
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import type { PrismaClient } from '@prisma/client'
import { prisma } from './prisma'

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  get client(): PrismaClient {
    return prisma as PrismaClient
  }

  async onModuleInit() {
    await prisma.$connect()
  }

  async onModuleDestroy() {
    await prisma.$disconnect()
  }
}
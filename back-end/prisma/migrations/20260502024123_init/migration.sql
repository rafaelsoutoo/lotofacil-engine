-- CreateTable
CREATE TABLE "concursos" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "dezenas" INTEGER[],
    "hash" VARCHAR(64) NOT NULL,
    "soma" INTEGER NOT NULL,
    "pares" INTEGER NOT NULL,
    "impares" INTEGER NOT NULL,
    "maiorSequencia" INTEGER NOT NULL,
    "faixa1a5" INTEGER NOT NULL,
    "faixa6a10" INTEGER NOT NULL,
    "faixa11a15" INTEGER NOT NULL,
    "faixa16a20" INTEGER NOT NULL,
    "faixa21a25" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "concursos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "concursos_numero_key" ON "concursos"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "concursos_hash_key" ON "concursos"("hash");

-- CreateIndex
CREATE INDEX "concursos_soma_idx" ON "concursos"("soma");

-- CreateIndex
CREATE INDEX "concursos_pares_idx" ON "concursos"("pares");

-- CreateIndex
CREATE INDEX "concursos_maiorSequencia_idx" ON "concursos"("maiorSequencia");

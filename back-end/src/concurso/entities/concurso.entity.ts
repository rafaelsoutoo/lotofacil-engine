export class ConcursoEntity {
  id: number;
  numero: number;
  data: Date;
  dezenas: number[];
  hash: string;

  soma: number;
  pares: number;
  impares: number;
  maiorSequencia: number;
  faixa1a5: number;
  faixa6a10: number;
  faixa11a15: number;
  faixa16a20: number;
  faixa21a25: number;

  createdAt: Date;
}
export class Transportadora {
  nome: string;
  sigla: string;
  horaDeCorte?: number;

  constructor(
    nome: string,
    sigla: string,
    horaDeCorte?: Date | string | number,
  ) {
    this.nome = nome;
    this.sigla = sigla;
    if (horaDeCorte) this.horaDeCorte = +new Date(horaDeCorte);
  }

  get isCorte() {
    // checa se ainda não passou a hora de corte
    if (this.horaDeCorte) {
      const horaDeCorte = new Date(this.horaDeCorte);
      const horaAtual = new Date();
      return (
        horaDeCorte.getHours() < horaAtual.getHours() ||
        (horaDeCorte.getHours() === horaAtual.getHours() &&
          horaDeCorte.getMinutes() < horaAtual.getMinutes())
      );
    }
  }
}

export class Par {
  pedido: number;
  total: number;
  volumes: number[];
  transportadora: Transportadora;

  constructor(
    pedido: number,
    volumes: number | number[],
    total: number,
    transportadora: Transportadora,
  ) {
    this.pedido = pedido;
    this.volumes = typeof volumes === "number" ? [volumes] : volumes;
    this.total = total;
    this.transportadora = transportadora;
  }

  get final() {
    // último digito do número inteiro
    return this.pedido % 10;
  }
}

import { Component, inject, signal } from '@angular/core';
import { DeputadoService } from '../../services/deputado-service';
import { Deputado } from '../../model/Deputado';

@Component({
  selector: 'app-consulta-deputados',
  imports: [],
  templateUrl: './consulta-deputados.html',
  styleUrl: './consulta-deputados.css',
})
export class ConsultaDeputados {
  readonly #deputadoService = inject(DeputadoService);
  protected deputados = signal<Deputado[]>([]);

  constructor() {
    this.#deputadoService.getAll().subscribe({
      next: (res) => {
        this.deputados.set(res.dados);
      },
      error: (err) => {
        console.error("Ocorreu um erro ao listar deputados: " + err);
      }
    });
  }

  public buscarPorId(id: string) {
    if (!id) alert("Preencha o campo de busca corretamente!");

    this.#deputadoService.getById(id).subscribe({
      next: (res) => {
        this.deputados.set(res.dados);
      },
      error: (err) => {
        console.error("Ocorreu um erro ao buscar deputado por ID: " + err);
      }
    });
  }
}

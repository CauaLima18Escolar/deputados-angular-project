import { Component, inject, signal } from '@angular/core';
import { DeputadoService } from '../../services/deputado-service';
import { Deputado } from '../../model/Deputado';
import { Loader } from "../loader/loader";

@Component({
  selector: 'app-consulta-deputados',
  imports: [Loader],
  templateUrl: './consulta-deputados.html',
  styleUrl: './consulta-deputados.css',
})
export class ConsultaDeputados {
  readonly #deputadoService = inject(DeputadoService);
  protected deputados = signal<Deputado[]>([]);
  protected currentPage = signal<number>(1);
  protected isLoading = signal<boolean>(false);

  constructor() { this.loadData() }

  public loadData() {
    this.isLoading.set(true);

    this.#deputadoService.getAll(this.currentPage()).subscribe({
      next: (res) => {
        this.deputados.set(res.dados);
      },
      error: (err) => {
        console.error("Ocorreu um erro ao listar deputados: " + err);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  public searchByName(nome: string) {
    this.isLoading.set(true);
    this.currentPage.set(1);

    this.#deputadoService.getAllByName(nome, this.currentPage()).subscribe({
      next: (res) => {
        this.deputados.set(res.dados);
      },
      error: (err) => {
        console.error("Ocorreu um erro ao buscar deputado por nome: " + err);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  public nextPage() {
    this.currentPage.set(this.currentPage() + 1);
    this.loadData();
  }

  public previusPage() {
    if (this.currentPage() == 1) return

    this.currentPage.set(this.currentPage() - 1);
    this.loadData();
  }
}

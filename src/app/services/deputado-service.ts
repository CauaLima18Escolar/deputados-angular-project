import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDeputado } from '../model/Deputado';

@Service()
export class DeputadoService {
    readonly API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
    readonly #httpClient = inject(HttpClient);

    public getAll(page: number = 1, size: number = 24): Observable<ApiResponseDeputado> {
        return this.#httpClient.get<ApiResponseDeputado>(`${this.API_URL}/deputados?pagina=${page}&itens=${size}&ordem=ASC&ordenarPor=nome`);
    }

    public getAllByName(name: string, page: number = 1, size: number = 24): Observable<ApiResponseDeputado> {
        return this.#httpClient.get<ApiResponseDeputado>(`${this.API_URL}/deputados?pagina=${page}&itens=${size}&nome=${name}&ordem=ASC&ordenarPor=nome`)
    }

    public getById(id: string): Observable<ApiResponseDeputado> {
        return this.#httpClient.get<ApiResponseDeputado>(`${this.API_URL}/deputados?id=${id}&ordem=ASC&ordenarPor=nome`)
    }
}


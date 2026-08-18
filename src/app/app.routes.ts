import { Routes } from '@angular/router';
import { ConsultaDeputados } from './components/consulta-deputados/consulta-deputados';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    { path: '', component: ConsultaDeputados },
    { path: '**', component: NotFound }
];

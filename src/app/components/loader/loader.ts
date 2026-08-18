import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  @Input() text = 'Carregando...';
  @Input() fullscreen = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}

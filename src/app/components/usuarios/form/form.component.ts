import { Usuario } from './../../../models/usuario.model';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Importa FormsModule para el manejo de formularios
  providers: [ApiService, HttpClient],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class UsuarioFormComponent {
  @Output() usuarioSaved = new EventEmitter<Usuario>();
  @Output() close = new EventEmitter<boolean>();

  // Usuario => Editar
  // null => Creación
  @Input() itemSelected: Usuario = {
    apellido: '',
    nombre: '',
    usuId: 0
  };

  constructor(private apiservice: ApiService) { }

  onSubmit(): void {
    if (!this.itemSelected) return;

    //Creación
    if (this.itemSelected.usuId === 0) {  // Comprobamos si es un nuevo usuario
      this.apiservice.createUsuario('CrearUsuario', this.itemSelected).subscribe({
        next: response => {
          alert('Creado Correctamente')
          this.usuarioSaved.emit(this.itemSelected);
          this.close.emit(true);
        },
        error: error => alert('Error en la creación del usuario')
      });

    } else {
      this.apiservice.updateUsuario('ModificarUsuario', this.itemSelected).subscribe({
        next: response => {
          alert('Actualizado Correctamente')
          this.usuarioSaved.emit(this.itemSelected);
          this.close.emit(true);
        },
        error: error => alert('Error en la actualización del usuario')
      });
    }
  }

  closeModal(e: any): void {
    e.preventDefault();
    this.close.emit(true);
  }
}

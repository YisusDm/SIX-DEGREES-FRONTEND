import { Usuario } from './../../../models/usuario.model';
import {Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
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
  usuarioSaved = new EventEmitter<Usuario>();
  usuario: Usuario = { usuId: 0, nombre: '', apellido: ''};
  UsuarioList: Usuario[] = [];

  constructor(private apiservice: ApiService){}


  ngOnInit(): void {
    this.loadUsuario();
  }

  loadUsuario(): void {
    this.apiservice.getUserById('ObtenerUsuariosId',1).subscribe((usuario: Usuario[]) => {
      this.UsuarioList = usuario;
    });
  }

  onSubmit(): void {
    if (this.usuario.usuId === 0) {  // Comprobamos si es un nuevo usuario
      this.apiservice.createUsuario('CrearUsuario', this.usuario).subscribe(response => {
        console.log('Usuario creado:', response);
      }, error => {
        console.error('Error creando usuario:', error);
      });
    } else {  // Si se está editando un usuario existente
      this.apiservice.updateUsuario('ModificarUsuario', this.usuario).subscribe(response => {
        console.log('Usuario actualizado:', response);
      }, error => {
        console.error('Error actualizando usuario:', error);
      });
    }
  }

  saveUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }

  updateUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  deleteUsuario(id: number) {
    // Manejar la lógica para eliminar el usuario
  }

}

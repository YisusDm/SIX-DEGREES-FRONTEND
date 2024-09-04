import { Component } from '@angular/core';
import { NgFor,NgClass  } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioFormComponent } from '../form/form.component';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { ApiService } from '../../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [NgFor, NgClass, UsuarioFormComponent, HttpClientModule, UsuarioFormComponent],
  providers: [ApiService, HttpClient],  // Añadir aquí ApiService y HttpClient como proveedores
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class UsuarioListComponent {

  UsuarioList: Usuario[] = [];
  editingUsuario: Usuario = { usuId: 0, nombre: '', apellido: ''}; // Variable para manejar la tarea que se está editando

  showModal = false;
  action: 'create' | 'update' = 'create';

  itemSelected: Usuario = {
    apellido: '',
    nombre: '',
    usuId: 0
  };

  constructor(private apiservice: ApiService, private router: Router){}


  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.apiservice.getData('ObtenerUsuarios').subscribe((usuarios: Usuario[]) => {
      this.UsuarioList = usuarios;
    });
  }

  onCreateUsuario(): void {
    this.showModal = true;
    this.action = 'create';
    this.itemSelected = {
      apellido: '',
      nombre: '',
      usuId: 0
    };
  }

  onEditUsuario(usuario: Usuario): void {
    this.showModal = true;
    this.action = 'update';
    this.itemSelected = usuario;
  }

  onCloseModal(action: boolean): void {
    this.showModal = !action;
    this.itemSelected = {
      apellido: '',
      nombre: '',
      usuId: 0
    };
  }

  onDeleteUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.apiservice.deleteUsuario('EliminarUsuario',id).subscribe(() => {
        this.UsuarioList = this.UsuarioList.filter(u => u.usuId !== id);
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }
}

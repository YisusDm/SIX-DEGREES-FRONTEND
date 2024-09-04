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
  imports: [NgFor, NgClass, UsuarioFormComponent, HttpClientModule],
  providers: [ApiService, HttpClient],  // Añadir aquí ApiService y HttpClient como proveedores
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class UsuarioListComponent {

  UsuarioList: Usuario[] = [];
  editingUsuario: Usuario = { usuId: 0, nombre: '', apellido: ''}; // Variable para manejar la tarea que se está editando

  constructor(private apiservice: ApiService, private router: Router){}


  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.apiservice.getData('ObtenerUsuarios').subscribe((usuarios: Usuario[]) => {
      this.UsuarioList = usuarios;
    });
  }

  onEditUsuario(usuario: Usuario): void {
    this.router.navigate(['/form', usuario.usuId]);
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

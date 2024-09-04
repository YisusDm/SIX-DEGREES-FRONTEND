import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Asegúrate de tener la importación correcta del modelo


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5205/api/SixDegreesApi';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Configurar encabezados si es necesario
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Agrega otros encabezados aquí si es necesario
    });
  }

  // Método GET para obtener datos
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  // Método GET para obtener un usuario por ID
  getUserById(endpoint: string, usuId: number): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}?id=${usuId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Método para crear un nuevo usuario
  createUsuario(endpoint: string, usuario: Usuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, usuario, { headers: this.getHeaders() });
  }

  // Método para actualizar un usuario existente
  updateUsuario(endpoint: string, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}?id=${usuario.usuId}`, usuario, { headers: this.getHeaders() });
  }

  // Método DELETE para eliminar usuario
  deleteUsuario(endpoint: string, UsuID: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}?id=${UsuID}`);
  }

}

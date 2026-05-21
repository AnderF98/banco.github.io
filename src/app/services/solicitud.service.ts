import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud.models';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://www.bancofiandina.somee.com/api/Solicituds';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  getById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  create(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  update(id: number, solicitud: Solicitud): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, solicitud);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
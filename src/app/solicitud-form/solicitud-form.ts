import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../services/solicitud.service';
import { Solicitud } from '../models/solicitud.models';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitud-form.html',
  styleUrls: ['./solicitud-form.css']
})
export class SolicitudFormComponent implements OnInit {
  solicitud: Solicitud = {
    id: 0,
    fecha: '',
    montoSolicitado: 0,
    ingresos: 0,
    egresos: 0,
    fechaRecepcion: '',
    clienteId: 0,
    productoId: 0,
    estadoId: 1,
    asesorId: 0
  };
  esEdicion = false;
  titulo = 'Nueva Solicitud';

  constructor(
    private solicitudService: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.titulo = 'Editar Solicitud';
      this.solicitudService.getById(+id).subscribe({
        next: (data) => {
          this.solicitud = data;
        },
        error: (err) => {
          console.error('Error al cargar solicitud:', err);
        }
      });
    }
  }

  guardar(): void {
    // Crear objeto con las fechas actuales
    const nuevaSolicitud = {
      ...this.solicitud,
      fecha: new Date().toISOString(),
      fechaRecepcion: new Date().toISOString()
    };

    if (this.esEdicion) {
      this.solicitudService.update(this.solicitud.id, nuevaSolicitud).subscribe({
        next: () => {
          this.router.navigate(['/solicitudes']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar la solicitud');
        }
      });
    } else {
      this.solicitudService.create(nuevaSolicitud).subscribe({
        next: () => {
          this.router.navigate(['/solicitudes']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar la solicitud');
        }
      });
    }
  }
}
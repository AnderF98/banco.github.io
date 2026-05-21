import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css']
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    ingresos: 0,
    correo: ''
  };
  esEdicion = false;
  titulo = 'Nuevo Cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.titulo = 'Editar Cliente';
      this.clienteService.getById(+id).subscribe({
        next: (data) => {
          this.cliente = data;
        },
        error: (err) => {
          console.error('Error al cargar cliente:', err);
        }
      });
    }
  }

  guardar(): void {
    if (this.esEdicion) {
      this.clienteService.update(this.cliente.id, this.cliente).subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el cliente');
        }
      });
    } else {
      this.clienteService.create(this.cliente).subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar el cliente');
        }
      });
    }
  }
}
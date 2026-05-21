import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitudService } from '../services/solicitud.service';
import { ClienteService } from '../services/cliente.service';
import { ProductoService } from '../services/producto.service';
import { UsuarioService } from '../services/usuario.service';
import { Solicitud } from '../models/solicitud.models';
import { Cliente } from '../models/cliente.model';
import { Producto } from '../models/producto.model';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes.html',
  styleUrls: ['./solicitudes.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargar solicitudes
    this.solicitudService.getAll().subscribe({
      next: (data) => {
        this.solicitudes = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error en solicitudes:', err)
    });

    // Cargar clientes
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.clientes = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error en clientes:', err)
    });

    // Cargar productos
    this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error en productos:', err)
    });

    // Cargar usuarios (asesores)
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error en usuarios:', err)
    });
  }

  // Método para obtener nombre del cliente por ID
  getNombreCliente(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nombre : 'Desconocido';
  }

  // Método para obtener nombre del producto por ID
  getNombreProducto(productoId: number): string {
    const producto = this.productos.find(p => p.id === productoId);
    return producto ? producto.nombreProducto : 'Desconocido';
  }

  // Método para obtener nombre del asesor por ID
  getNombreAsesor(asesorId: number): string {
    const asesor = this.usuarios.find(u => u.id === asesorId);
    return asesor ? asesor.nombre : 'Desconocido';
  }

  // Método para obtener nombre del estado
  getNombreEstado(estadoId: number): string {
    const estados: { [key: number]: string } = {
      1: 'Pendiente',
      2: 'En Análisis',
      3: 'Aprobada',
      4: 'Rechazada'
    };
    return estados[estadoId] || 'Desconocido';
  }

  irAlFormulario(): void {
    this.router.navigate(['/solicitudes/nuevo']);
  }

  editarSolicitud(id: number): void {
    this.router.navigate(['/solicitudes/editar', id]);
  }

  eliminarSolicitud(id: number): void {
    if (confirm('¿Eliminar esta solicitud?')) {
      this.solicitudService.delete(id).subscribe(() => {
        this.cargarDatos();
      });
    }
  }
}

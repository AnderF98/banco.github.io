import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}


  irAlFormulario(): void {
    console.log('Método irAlFormulario ejecutado'); 
    this.router.navigate(['/clientes/nuevo']);
  }

  editarCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.clientes = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
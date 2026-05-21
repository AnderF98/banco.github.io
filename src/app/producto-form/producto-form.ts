import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoFormComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombreProducto: '',
    montoMaximo: 0,
    tasaInteres: 0,
    tipoProductoId: 1
  };
  esEdicion = false;
  titulo = 'Nuevo Producto';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.titulo = 'Editar Producto';
      this.productoService.getById(+id).subscribe({
        next: (data) => {
          this.producto = data;
        },
        error: (err) => {
          console.error('Error al cargar producto:', err);
        }
      });
    }
  }

  guardar(): void {
    if (this.esEdicion) {
      this.productoService.update(this.producto.id, this.producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el producto');
        }
      });
    } else {
      this.productoService.create(this.producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar el producto');
        }
      });
    }
  }
}
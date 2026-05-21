import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrls: ['./usuario-form.css']
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    rol: '',
    telefono: ''
  };
  esEdicion = false;
  titulo = 'Nuevo Usuario';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.titulo = 'Editar Usuario';
      this.usuarioService.getById(+id).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
        }
      });
    }
  }

  guardar(): void {
    if (this.esEdicion) {
      this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el usuario');
        }
      });
    } else {
      this.usuarioService.create(this.usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar el usuario');
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../services/proyectos.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  proyecto: any = null; // Lista de tareas del proyecto seleccionado
  selectedProjectId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    public proyectosService: ProyectosService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.selectedProjectId = +id;
        this.getTodos(); // Obtiene las tareas del proyecto seleccionado
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.selectedProjectId !== null) {
      const tarea = {
        id: new Date().getTime(), // Usar timestamp como ID de tarea
        nombre: form.value.projectName,
        descripcion: '',
        completado: false,
      };

      this.proyectosService.agregarTareaAProyecto(
        this.selectedProjectId,
        tarea
      );
      this.getTodos(); // Actualiza la lista de tareas
      form.reset();
    }
  }

  getTodos() {
    if (this.selectedProjectId !== null) {
      this.proyecto = this.proyectosService.getTareasPorProyecto(
        this.selectedProjectId
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../services/proyectos.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../models/project.model'; // Asegúrate de importar el modelo Task

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  proyecto: Task[] = []; // Lista de tareas del proyecto seleccionado
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
      const tarea: Task = {
        id: Date.now(), // Usar timestamp como ID de tarea o utiliza otro método
        nombre: form.value.taskName, // Asegúrate de que el nombre del campo en el formulario coincida
        descripcion: form.value.taskDescription || '', // Obtener descripción si está disponible
        completado: false,
      };

      this.proyectosService.agregarTareaAProyecto(
        this.selectedProjectId,
        tarea
      );
      this.getTodos(); // Actualiza la lista de tareas
      console.log(this.proyecto);
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

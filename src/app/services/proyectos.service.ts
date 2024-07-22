import { Injectable } from '@angular/core';
import { Project, Task } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  constructor() {}

  nameItem = '';
  selectID: number = 0;

  public proyectos: Project[] = [];

  addItem(nombre: string, id: number) {
    this.proyectos.push({ id, nombre, tareas: [] });
  }

  getItems() {
    return this.proyectos;
  }

  deleteItem(id: number) {
    this.proyectos = this.proyectos.filter((item) => item.id !== id);
  }

  updateItem(id: number, newName: string) {
    const item = this.proyectos.find((item) => item.id === id);
    if (item) {
      item.nombre = newName;
    }
  }

  /*  */

  getTareasPorProyecto(proyectoId: number) {
    const proyecto = this.proyectos.find((p) => p.id === proyectoId);
    if (proyecto) {
      return proyecto.tareas;
    } else {
      console.error('Proyecto no encontrado');
      return [];
    }
  }

  // Supongamos que tienes un método para agregar tareas a un proyecto específico.
  agregarTareaAProyecto(proyectoId: number, tarea: any): void {
    // Encuentra el proyecto que deseas actualizar
    const proyecto = this.proyectos.find((p) => p.id === proyectoId);
    if (proyecto) {
      // Añade la tarea a la lista de tareas del proyecto
      proyecto.tareas.push(tarea);
    }
  }
}

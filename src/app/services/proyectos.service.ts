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

  // Obtiene las tareas de un proyecto específico por su ID
  getTareasPorProyecto(proyectoId: number): Task[] {
    const proyecto = this.proyectos.find((p) => p.id === proyectoId);
    if (proyecto) {
      return proyecto.tareas;
    } else {
      console.error(`Proyecto con ID ${proyectoId} no encontrado`);
      return [];
    }
  }

  // Agrega una tarea a un proyecto específico por su ID
  agregarTareaAProyecto(proyectoId: number, tarea: Task): void {
    const proyecto = this.proyectos.find((p) => p.id === proyectoId);
    if (proyecto) {
      proyecto.tareas.push(tarea);
    } else {
      console.error(`Proyecto con ID ${proyectoId} no encontrado`);
    }
  }
}

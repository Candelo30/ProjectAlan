export interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  completado: boolean;
}

export interface Project {
  id: number;
  nombre: string;
  tareas: Task[];
}

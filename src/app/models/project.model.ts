export interface Task {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  nombre: string;
  tareas: Task[];
}

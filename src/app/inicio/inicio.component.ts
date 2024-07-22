import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../services/proyectos.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'], // Cambié styleUrl a styleUrls
})
export class InicioComponent implements OnInit {
  proyecto: Project[] = [];
  editIndex: number | null = null;
  editName: string = '';

  constructor(
    private router: ActivatedRoute,
    private routers: Router,
    public itemsProyectoServices: ProyectosService
  ) {}

  ngOnInit() {
    this.proyecto = this.itemsProyectoServices.getItems();
  }

  toggleEditingItem(id: number) {
    this.editIndex = this.editIndex === id ? null : id;
  }

  onSubmit(form: NgForm) {
    const cont = this.itemsProyectoServices.proyectos.length;
    const projectName = form.value.projectName;

    if (projectName) {
      this.itemsProyectoServices.addItem(projectName, cont);
      form.reset();
      this.proyecto = this.itemsProyectoServices.getItems(); // Actualiza la lista
    }
  }

  onUpdate() {
    if (this.editIndex !== null) {
      this.itemsProyectoServices.updateItem(this.editIndex, this.editName);
      this.editIndex = null;
      this.editName = '';
      this.proyecto = this.itemsProyectoServices.getItems(); // Actualiza la lista
    }
  }

  onDelete(index: number) {
    this.itemsProyectoServices.deleteItem(index);
    this.proyecto = this.itemsProyectoServices.getItems(); // Actualiza la lista
  }

  navigateToProject(nameItem: string, id: number) {
    this.itemsProyectoServices.nameItem = nameItem;
    this.itemsProyectoServices.selectID = id;

    this.routers.navigate(['/project', id]).catch((err) => {
      console.error('Error al navegar:', err);
    });
  }
}

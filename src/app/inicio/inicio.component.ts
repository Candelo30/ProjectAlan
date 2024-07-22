import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../services/proyectos.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(
    private router: ActivatedRoute,
    private routers: Router,
    public ItemsProyectoServices: ProyectosService
  ) {}

  proyecto: any = [];
  editIndex: number | null = null;
  editName: string = '';

  toggleEditingItem(id: number) {
    this.editIndex = this.editIndex === id ? null : id;
  }

  getItemsProyecto() {
    this.ItemsProyectoServices.proyectos = this.proyecto;
  }

  onSubmit(form: NgForm) {
    let cont = this.ItemsProyectoServices.proyectos.length;
    let projectName = form.value.projectName;

    if (projectName != '') {
      this.ItemsProyectoServices.addItem(projectName, cont);
      cont += 1;
      form.reset();
    }
  }

  onUpdate() {
    if (this.editIndex !== null) {
      this.ItemsProyectoServices.updateItem(this.editIndex, this.editName);
      this.editIndex = null;
      this.editName = '';
      this.proyecto = this.ItemsProyectoServices.getItems(); // Actualiza la lista
    }
  }

  onDelete(index: number) {
    console.log(index);
    this.ItemsProyectoServices.deleteItem(index);
    this.proyecto = this.ItemsProyectoServices.getItems(); // Actualiza la lista
    console.log(this.proyecto);
  }

  // Nueva función para navegar a los detalles del proyecto
  navigateToProject(nameItem: string, id: number) {
    this.ItemsProyectoServices.nameItem = nameItem;
    this.ItemsProyectoServices.selectID = id;
    console.log(nameItem);

    this.routers.navigate(['/project', nameItem]);
  }
}

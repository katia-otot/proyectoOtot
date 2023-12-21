import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'producto',
        data: { pageTitle: 'proyectoApp.producto.home.title' },
        loadChildren: () => import('./producto/producto.routes'),
      },
      {
        path: 'categoria',
        data: { pageTitle: 'proyectoApp.categoria.home.title' },
        loadChildren: () => import('./categoria/categoria.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

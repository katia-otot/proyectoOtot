import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ProductoComponent } from './list/producto.component';
import { ProductoDetailComponent } from './detail/producto-detail.component';
import { ProductoUpdateComponent } from './update/producto-update.component';
import ProductoResolve from './route/producto-routing-resolve.service';

const productoRoute: Routes = [
  {
    path: '',
    component: ProductoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductoDetailComponent,
    resolve: {
      producto: ProductoResolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductoUpdateComponent,
    resolve: {
      producto: ProductoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductoUpdateComponent,
    resolve: {
      producto: ProductoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default productoRoute;

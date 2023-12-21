import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProducto } from '../producto.model';
import { ProductoService } from '../service/producto.service';

export const productoResolve = (route: ActivatedRouteSnapshot): Observable<null | IProducto> => {
  const id = route.params['id'];
  if (id) {
    return inject(ProductoService)
      .find(id)
      .pipe(
        mergeMap((producto: HttpResponse<IProducto>) => {
          if (producto.body) {
            return of(producto.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default productoResolve;

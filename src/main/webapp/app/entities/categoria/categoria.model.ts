import { IProducto } from 'app/entities/producto/producto.model';

export interface ICategoria {
  id: number;
  nombre?: string | null;
  productos?: Pick<IProducto, 'id' | 'nombre'>[] | null;
}

export type NewCategoria = Omit<ICategoria, 'id'> & { id: null };

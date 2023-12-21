import { ICategoria } from 'app/entities/categoria/categoria.model';

export interface IProducto {
  id: number;
  nombre?: string | null;
  precio?: number | null;
  imagen?: string | null;
  ingredientes?: string | null;
  categorias?: Pick<ICategoria, 'id'>[] | null;
}

export type NewProducto = Omit<IProducto, 'id'> & { id: null };

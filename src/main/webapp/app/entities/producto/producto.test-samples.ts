import { IProducto, NewProducto } from './producto.model';

export const sampleWithRequiredData: IProducto = {
  id: 14182,
};

export const sampleWithPartialData: IProducto = {
  id: 19194,
  nombre: 'psst',
  imagen: 'while barren',
  ingredientes: 'imperfect',
};

export const sampleWithFullData: IProducto = {
  id: 21938,
  nombre: 'focalise gosh during',
  precio: 19176.35,
  imagen: 'pub',
  ingredientes: 'ugh captain tenderly',
};

export const sampleWithNewData: NewProducto = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

import { ICategoria, NewCategoria } from './categoria.model';

export const sampleWithRequiredData: ICategoria = {
  id: 10828,
};

export const sampleWithPartialData: ICategoria = {
  id: 31409,
};

export const sampleWithFullData: ICategoria = {
  id: 8113,
  nombre: 'best oof upshift',
};

export const sampleWithNewData: NewCategoria = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

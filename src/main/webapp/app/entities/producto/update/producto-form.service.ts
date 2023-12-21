import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProducto, NewProducto } from '../producto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProducto for edit and NewProductoFormGroupInput for create.
 */
type ProductoFormGroupInput = IProducto | PartialWithRequiredKeyOf<NewProducto>;

type ProductoFormDefaults = Pick<NewProducto, 'id' | 'categorias'>;

type ProductoFormGroupContent = {
  id: FormControl<IProducto['id'] | NewProducto['id']>;
  nombre: FormControl<IProducto['nombre']>;
  precio: FormControl<IProducto['precio']>;
  imagen: FormControl<IProducto['imagen']>;
  ingredientes: FormControl<IProducto['ingredientes']>;
  categorias: FormControl<IProducto['categorias']>;
};

export type ProductoFormGroup = FormGroup<ProductoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductoFormService {
  createProductoFormGroup(producto: ProductoFormGroupInput = { id: null }): ProductoFormGroup {
    const productoRawValue = {
      ...this.getFormDefaults(),
      ...producto,
    };
    return new FormGroup<ProductoFormGroupContent>({
      id: new FormControl(
        { value: productoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(productoRawValue.nombre),
      precio: new FormControl(productoRawValue.precio),
      imagen: new FormControl(productoRawValue.imagen),
      ingredientes: new FormControl(productoRawValue.ingredientes),
      categorias: new FormControl(productoRawValue.categorias ?? []),
    });
  }

  getProducto(form: ProductoFormGroup): IProducto | NewProducto {
    return form.getRawValue() as IProducto | NewProducto;
  }

  resetForm(form: ProductoFormGroup, producto: ProductoFormGroupInput): void {
    const productoRawValue = { ...this.getFormDefaults(), ...producto };
    form.reset(
      {
        ...productoRawValue,
        id: { value: productoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProductoFormDefaults {
    return {
      id: null,
      categorias: [],
    };
  }
}

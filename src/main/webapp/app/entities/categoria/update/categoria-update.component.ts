import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProducto } from 'app/entities/producto/producto.model';
import { ProductoService } from 'app/entities/producto/service/producto.service';
import { ICategoria } from '../categoria.model';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaFormService, CategoriaFormGroup } from './categoria-form.service';

@Component({
  standalone: true,
  selector: 'jhi-categoria-update',
  templateUrl: './categoria-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CategoriaUpdateComponent implements OnInit {
  isSaving = false;
  categoria: ICategoria | null = null;

  productosSharedCollection: IProducto[] = [];

  editForm: CategoriaFormGroup = this.categoriaFormService.createCategoriaFormGroup();

  constructor(
    protected categoriaService: CategoriaService,
    protected categoriaFormService: CategoriaFormService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProducto = (o1: IProducto | null, o2: IProducto | null): boolean => this.productoService.compareProducto(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoria }) => {
      this.categoria = categoria;
      if (categoria) {
        this.updateForm(categoria);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categoria = this.categoriaFormService.getCategoria(this.editForm);
    if (categoria.id !== null) {
      this.subscribeToSaveResponse(this.categoriaService.update(categoria));
    } else {
      this.subscribeToSaveResponse(this.categoriaService.create(categoria));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoria>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(categoria: ICategoria): void {
    this.categoria = categoria;
    this.categoriaFormService.resetForm(this.editForm, categoria);

    this.productosSharedCollection = this.productoService.addProductoToCollectionIfMissing<IProducto>(
      this.productosSharedCollection,
      ...(categoria.productos ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productoService
      .query()
      .pipe(map((res: HttpResponse<IProducto[]>) => res.body ?? []))
      .pipe(
        map((productos: IProducto[]) =>
          this.productoService.addProductoToCollectionIfMissing<IProducto>(productos, ...(this.categoria?.productos ?? [])),
        ),
      )
      .subscribe((productos: IProducto[]) => (this.productosSharedCollection = productos));
  }
}

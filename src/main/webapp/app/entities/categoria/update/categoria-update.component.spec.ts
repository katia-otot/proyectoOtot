import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProducto } from 'app/entities/producto/producto.model';
import { ProductoService } from 'app/entities/producto/service/producto.service';
import { CategoriaService } from '../service/categoria.service';
import { ICategoria } from '../categoria.model';
import { CategoriaFormService } from './categoria-form.service';

import { CategoriaUpdateComponent } from './categoria-update.component';

describe('Categoria Management Update Component', () => {
  let comp: CategoriaUpdateComponent;
  let fixture: ComponentFixture<CategoriaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let categoriaFormService: CategoriaFormService;
  let categoriaService: CategoriaService;
  let productoService: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CategoriaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CategoriaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategoriaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    categoriaFormService = TestBed.inject(CategoriaFormService);
    categoriaService = TestBed.inject(CategoriaService);
    productoService = TestBed.inject(ProductoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Producto query and add missing value', () => {
      const categoria: ICategoria = { id: 456 };
      const productos: IProducto[] = [{ id: 14191 }];
      categoria.productos = productos;

      const productoCollection: IProducto[] = [{ id: 13764 }];
      jest.spyOn(productoService, 'query').mockReturnValue(of(new HttpResponse({ body: productoCollection })));
      const additionalProductos = [...productos];
      const expectedCollection: IProducto[] = [...additionalProductos, ...productoCollection];
      jest.spyOn(productoService, 'addProductoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ categoria });
      comp.ngOnInit();

      expect(productoService.query).toHaveBeenCalled();
      expect(productoService.addProductoToCollectionIfMissing).toHaveBeenCalledWith(
        productoCollection,
        ...additionalProductos.map(expect.objectContaining),
      );
      expect(comp.productosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const categoria: ICategoria = { id: 456 };
      const productos: IProducto = { id: 17038 };
      categoria.productos = [productos];

      activatedRoute.data = of({ categoria });
      comp.ngOnInit();

      expect(comp.productosSharedCollection).toContain(productos);
      expect(comp.categoria).toEqual(categoria);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategoria>>();
      const categoria = { id: 123 };
      jest.spyOn(categoriaFormService, 'getCategoria').mockReturnValue(categoria);
      jest.spyOn(categoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categoria }));
      saveSubject.complete();

      // THEN
      expect(categoriaFormService.getCategoria).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(categoriaService.update).toHaveBeenCalledWith(expect.objectContaining(categoria));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategoria>>();
      const categoria = { id: 123 };
      jest.spyOn(categoriaFormService, 'getCategoria').mockReturnValue({ id: null });
      jest.spyOn(categoriaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categoria: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categoria }));
      saveSubject.complete();

      // THEN
      expect(categoriaFormService.getCategoria).toHaveBeenCalled();
      expect(categoriaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategoria>>();
      const categoria = { id: 123 };
      jest.spyOn(categoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(categoriaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProducto', () => {
      it('Should forward to productoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productoService, 'compareProducto');
        comp.compareProducto(entity, entity2);
        expect(productoService.compareProducto).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CategoriaTestSamples.*;
import static com.mycompany.myapp.domain.ProductoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProductoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Producto.class);
        Producto producto1 = getProductoSample1();
        Producto producto2 = new Producto();
        assertThat(producto1).isNotEqualTo(producto2);

        producto2.setId(producto1.getId());
        assertThat(producto1).isEqualTo(producto2);

        producto2 = getProductoSample2();
        assertThat(producto1).isNotEqualTo(producto2);
    }

    @Test
    void categoriaTest() throws Exception {
        Producto producto = getProductoRandomSampleGenerator();
        Categoria categoriaBack = getCategoriaRandomSampleGenerator();

        producto.addCategoria(categoriaBack);
        assertThat(producto.getCategorias()).containsOnly(categoriaBack);
        assertThat(categoriaBack.getProductos()).containsOnly(producto);

        producto.removeCategoria(categoriaBack);
        assertThat(producto.getCategorias()).doesNotContain(categoriaBack);
        assertThat(categoriaBack.getProductos()).doesNotContain(producto);

        producto.categorias(new HashSet<>(Set.of(categoriaBack)));
        assertThat(producto.getCategorias()).containsOnly(categoriaBack);
        assertThat(categoriaBack.getProductos()).containsOnly(producto);

        producto.setCategorias(new HashSet<>());
        assertThat(producto.getCategorias()).doesNotContain(categoriaBack);
        assertThat(categoriaBack.getProductos()).doesNotContain(producto);
    }
}

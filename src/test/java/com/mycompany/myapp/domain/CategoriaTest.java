package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CategoriaTestSamples.*;
import static com.mycompany.myapp.domain.ProductoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CategoriaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Categoria.class);
        Categoria categoria1 = getCategoriaSample1();
        Categoria categoria2 = new Categoria();
        assertThat(categoria1).isNotEqualTo(categoria2);

        categoria2.setId(categoria1.getId());
        assertThat(categoria1).isEqualTo(categoria2);

        categoria2 = getCategoriaSample2();
        assertThat(categoria1).isNotEqualTo(categoria2);
    }

    @Test
    void productosTest() throws Exception {
        Categoria categoria = getCategoriaRandomSampleGenerator();
        Producto productoBack = getProductoRandomSampleGenerator();

        categoria.addProductos(productoBack);
        assertThat(categoria.getProductos()).containsOnly(productoBack);

        categoria.removeProductos(productoBack);
        assertThat(categoria.getProductos()).doesNotContain(productoBack);

        categoria.productos(new HashSet<>(Set.of(productoBack)));
        assertThat(categoria.getProductos()).containsOnly(productoBack);

        categoria.setProductos(new HashSet<>());
        assertThat(categoria.getProductos()).doesNotContain(productoBack);
    }
}

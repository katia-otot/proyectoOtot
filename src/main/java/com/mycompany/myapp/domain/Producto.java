package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Producto.
 */
@Entity
@Table(name = "producto")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "ingredientes")
    private String ingredientes;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "productos")
    @JsonIgnoreProperties(value = { "productos" }, allowSetters = true)
    private Set<Categoria> categorias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Producto id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Producto nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return this.precio;
    }

    public Producto precio(Double precio) {
        this.setPrecio(precio);
        return this;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getImagen() {
        return this.imagen;
    }

    public Producto imagen(String imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getIngredientes() {
        return this.ingredientes;
    }

    public Producto ingredientes(String ingredientes) {
        this.setIngredientes(ingredientes);
        return this;
    }

    public void setIngredientes(String ingredientes) {
        this.ingredientes = ingredientes;
    }

    public Set<Categoria> getCategorias() {
        return this.categorias;
    }

    public void setCategorias(Set<Categoria> categorias) {
        if (this.categorias != null) {
            this.categorias.forEach(i -> i.removeProductos(this));
        }
        if (categorias != null) {
            categorias.forEach(i -> i.addProductos(this));
        }
        this.categorias = categorias;
    }

    public Producto categorias(Set<Categoria> categorias) {
        this.setCategorias(categorias);
        return this;
    }

    public Producto addCategoria(Categoria categoria) {
        this.categorias.add(categoria);
        categoria.getProductos().add(this);
        return this;
    }

    public Producto removeCategoria(Categoria categoria) {
        this.categorias.remove(categoria);
        categoria.getProductos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Producto)) {
            return false;
        }
        return getId() != null && getId().equals(((Producto) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Producto{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", precio=" + getPrecio() +
            ", imagen='" + getImagen() + "'" +
            ", ingredientes='" + getIngredientes() + "'" +
            "}";
    }
}

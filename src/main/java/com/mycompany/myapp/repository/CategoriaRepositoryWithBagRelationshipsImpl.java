package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Categoria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class CategoriaRepositoryWithBagRelationshipsImpl implements CategoriaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Categoria> fetchBagRelationships(Optional<Categoria> categoria) {
        return categoria.map(this::fetchProductos);
    }

    @Override
    public Page<Categoria> fetchBagRelationships(Page<Categoria> categorias) {
        return new PageImpl<>(fetchBagRelationships(categorias.getContent()), categorias.getPageable(), categorias.getTotalElements());
    }

    @Override
    public List<Categoria> fetchBagRelationships(List<Categoria> categorias) {
        return Optional.of(categorias).map(this::fetchProductos).orElse(Collections.emptyList());
    }

    Categoria fetchProductos(Categoria result) {
        return entityManager
            .createQuery(
                "select categoria from Categoria categoria left join fetch categoria.productos where categoria.id = :id",
                Categoria.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Categoria> fetchProductos(List<Categoria> categorias) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, categorias.size()).forEach(index -> order.put(categorias.get(index).getId(), index));
        List<Categoria> result = entityManager
            .createQuery(
                "select categoria from Categoria categoria left join fetch categoria.productos where categoria in :categorias",
                Categoria.class
            )
            .setParameter("categorias", categorias)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}

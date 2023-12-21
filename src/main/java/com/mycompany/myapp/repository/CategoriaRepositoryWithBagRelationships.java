package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Categoria;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface CategoriaRepositoryWithBagRelationships {
    Optional<Categoria> fetchBagRelationships(Optional<Categoria> categoria);

    List<Categoria> fetchBagRelationships(List<Categoria> categorias);

    Page<Categoria> fetchBagRelationships(Page<Categoria> categorias);
}

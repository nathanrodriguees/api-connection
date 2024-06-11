package br.edu.senaisp.API_Crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senaisp.API_Crud.model.Medico;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Integer> {

}

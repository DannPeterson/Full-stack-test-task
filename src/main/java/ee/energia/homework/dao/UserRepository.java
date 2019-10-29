package ee.energia.homework.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ee.energia.homework.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
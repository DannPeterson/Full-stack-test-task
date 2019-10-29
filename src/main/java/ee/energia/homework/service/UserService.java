package ee.energia.homework.service;

import java.util.List;

import ee.energia.homework.model.User;
import ee.energia.homework.model.UserDto;

public interface UserService {

	User save(UserDto user);

	void delete(int id);

	User findById(int id);

	UserDto update(UserDto userDto);

	List<User> findAll();
	
}
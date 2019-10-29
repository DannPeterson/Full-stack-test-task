package ee.energia.homework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ee.energia.homework.dao.UserRepository;
import ee.energia.homework.model.User;
import ee.energia.homework.model.UserDto;
import ee.energia.homework.service.UserService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service(value = "userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public void delete(int id) {
		userRepository.deleteById(id);
	}

	@Override
	public User findById(int id) {
		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

	@Override
	public UserDto update(UserDto userDto) {
		User user = findById(userDto.getId());
		user.setUserName(userDto.getUserName());
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setBirthDate(userDto.getBirthDate());
		user.setEmail(userDto.getEmail());
		user.setAddress(userDto.getAddress());
		userRepository.save(user);
		return userDto;
	}

	@Override
	public User save(UserDto user) {
		User newUser = new User();
		newUser.setUserName(user.getUserName());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setBirthDate(user.getBirthDate());
		newUser.setEmail(user.getEmail());
		newUser.setAddress(user.getAddress());
		return userRepository.save(newUser);
	}
	
	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		userRepository.findAll().iterator().forEachRemaining(list::add);
		return list;
	}
}
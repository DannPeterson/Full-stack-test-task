package ee.energia.homework;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ee.energia.homework.dao.UserRepository;
import ee.energia.homework.model.User;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner init(UserRepository userDao) {
		return args -> {
			User user3 = new User();
			user3.setUserName("fisher");
			user3.setFirstName("Ain");
			user3.setLastName("Kala");
			user3.setBirthDate(LocalDateTime.parse("1986-05-12T12:00:00"));
			user3.setEmail("ain.kala@gmail.com");
			user3.setAddress("Viralti 13 Tallinn");
			userDao.save(user3);

			User user1 = new User();
			user1.setUserName("dann_peterson");
			user1.setFirstName("Daniil");
			user1.setLastName("Peterson");
			user1.setBirthDate(LocalDateTime.parse("1987-05-03T12:00:00"));
			user1.setEmail("daniil.peterson@gmail.com");
			user1.setAddress("Tallinn, Estonia");
			userDao.save(user1);

			User user4 = new User();
			user4.setUserName("svir");
			user4.setFirstName("Siiru");
			user4.setLastName("Viiru");
			user4.setBirthDate(LocalDateTime.parse("1988-05-24T12:00:00"));
			user4.setEmail("siiru.viiru@gmail.com");
			user4.setAddress("Soo 10 Tallinn");
			userDao.save(user4);

			User user2 = new User();
			user2.setUserName("sikorsky");
			user2.setFirstName("Heli");
			user2.setLastName("Kopter");
			user2.setBirthDate(LocalDateTime.parse("1989-04-29T12:00:00"));
			user2.setEmail("heli.kopter@gmail.com");
			user2.setAddress("Prantsusmaa");
			userDao.save(user2);
		};
	}
}
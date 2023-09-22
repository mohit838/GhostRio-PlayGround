package playground.nymphilia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import playground.nymphilia.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

}

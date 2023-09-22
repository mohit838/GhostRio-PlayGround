package playground.nymphilia.services.implementation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import playground.nymphilia.entities.User;
import playground.nymphilia.exceptions.ResourceNotFoundExceptions;
import playground.nymphilia.playloads.UserDto;
import playground.nymphilia.repositories.UserRepo;
import playground.nymphilia.services.UserServices;

import java.util.List;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@Getter
@Setter
public class UserServiceImpl implements UserServices {

    private UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDto createNewUser(UserDto userDto) {
        User user = this.dtoToUser(userDto);
        User newUser = this.userRepo.save(user);
        return this.userToDto(newUser);
    }

    @Override
    public UserDto updateUserById(UserDto userDto, Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundExceptions("User", "ID", userId));

        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());

        User updateUser = this.userRepo.save(user);
        UserDto userDto1 = this.userToDto(updateUser);
        return userDto1;
    }

    @Override
    public UserDto getUserById(UserDto userDto, Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundExceptions("User", "ID", userId));
        UserDto userDto1 = this.userToDto(user);
        return userDto1;
    }

    @Override
    public List<UserDto> getAllUser() {
        List<User> users = this.userRepo.findAll();
        return users.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());
    }

    @Override
    public void deleteUserById(Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundExceptions("User", "ID", userId));
        this.userRepo.delete(user);
    }


    //    UserDto to user conversion
    private User dtoToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());
        return user;
    }

    //    User to UserDto conversion
    public UserDto userToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setAbout(user.getAbout());
        return userDto;
    }
}

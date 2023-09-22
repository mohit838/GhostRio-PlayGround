package jacindry.jacindry.rio.services.implementation;

import jacindry.jacindry.rio.entity.User;
import jacindry.jacindry.rio.exceptions.ResourceNotFoundException;
import jacindry.jacindry.rio.playloads.UserDto;
import jacindry.jacindry.rio.repository.UserRepo;
import jacindry.jacindry.rio.services.UserServices;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class Implementation implements UserServices {


    private UserRepo userRepo;

    public Implementation(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        User user  = this.dtoToUser(userDto);
        User SavedUser = this.userRepo.save(user);
        return this.userToDto(SavedUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer userId) {
        User user = this.userRepo.findAllById(userId).orElseThrow((e-> new ResourceNotFoundException("User", "Id", userId)));

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());

        User saveUpdateUser = this.userRepo.save(user);
        UserDto userDto1 = this.userToDto(saveUpdateUser);
        return userDto1;
    }

    @Override
    public UserDto getUserById(Integer userId) {
        return null;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return null;
    }

    @Override
    public void deleteUserById(Integer userId) {

    }

    private User dtoToUser(UserDto userDto){
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());
        return user;
    }

    private UserDto userToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setAbout(user.getAbout());
        return userDto;
    }
}

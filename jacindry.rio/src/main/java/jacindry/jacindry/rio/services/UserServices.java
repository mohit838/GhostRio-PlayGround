package jacindry.jacindry.rio.services;

import jacindry.jacindry.rio.playloads.UserDto;

import java.util.List;

public interface UserServices {

    UserDto createUser(UserDto user);
    UserDto updateUser(UserDto user, Integer userId);
    UserDto getUserById(Integer userId);
    List<UserDto> getAllUsers();
    void deleteUserById(Integer userId);
}

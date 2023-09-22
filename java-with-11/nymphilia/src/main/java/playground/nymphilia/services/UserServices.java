package playground.nymphilia.services;

import playground.nymphilia.playloads.UserDto;

import java.util.List;

public interface UserServices {

    UserDto createNewUser(UserDto userDto);
    UserDto updateUserById(UserDto userDto, Integer userId);
    UserDto getUserById(UserDto userDto, Integer userId);
    List<UserDto> getAllUser();
    void deleteUserById(Integer userId);
}

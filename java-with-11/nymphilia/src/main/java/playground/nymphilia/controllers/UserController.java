package playground.nymphilia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import playground.nymphilia.entities.User;
import playground.nymphilia.playloads.UserDto;
import playground.nymphilia.services.UserServices;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserServices userServices;

    @Autowired
    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto createUserDto = this.userServices.createNewUser(userDto);
        return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
    }

    //    Update User
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable("id") Integer uID) {
        UserDto updateUserDto = this.userServices.updateUserById(userDto, uID);
        //  return new ResponseEntity<>(updateUserDto, HttpStatus.OK);
        return ResponseEntity.ok(updateUserDto);
    }

    //    Get Users

    //    Get All Users

    //    Delete users
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer uID) {
        this.userServices.deleteUserById(uID);
        return ResponseEntity.ok(Map.of("Message:", "User Delete Successfully!"));
    }
}

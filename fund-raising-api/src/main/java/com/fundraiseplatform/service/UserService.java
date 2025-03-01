package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO createUser(UserDTO userDTO);

    UserDTO getUserById(String id);

    List<UserDTO> getAllUsers();

    UserDTO updateUser(String id, UserDTO userDTO);

    void deleteUser(String id);

    UserDTO login(UserDTO userDTO);
    public UserDTO updateUserStatus(String id, UserDTO userDTO);
}

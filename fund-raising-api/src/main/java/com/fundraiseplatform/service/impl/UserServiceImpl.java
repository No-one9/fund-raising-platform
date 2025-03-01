package com.fundraiseplatform.service.impl;

import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.dto.UserDTO;
import com.fundraiseplatform.entity.AdminEntity;
import com.fundraiseplatform.entity.UserEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.UserRepository;
import com.fundraiseplatform.securityconfig.AppConstants;
import com.fundraiseplatform.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // Check if user with the same email already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("User with email " + userDTO.getEmail() + " already exists");
        }

        UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);
        UserEntity savedUser = userRepository.save(userEntity);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserById(String id) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id "+id));
        userEntity.setPassword(null);
        UserDTO user = modelMapper.map(userEntity, UserDTO.class);
        user.setRole(AppConstants.USER);
        user.setPassword(null);
        return user;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream()
                .map(userEntity -> modelMapper.map(userEntity, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        UserEntity existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id "+id));

        // Check if the updated email is already taken by another user
        if (!existingUser.getEmail().equals(userDTO.getEmail()) &&
                userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email " + userDTO.getEmail() + " is already taken");
        }

        modelMapper.map(userDTO, existingUser);

        UserEntity updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public UserDTO updateUserStatus(String id, UserDTO userDTO) {
        UserEntity existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id "+id));

        existingUser.setStatus(userDTO.getStatus());
        UserEntity updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id "+id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO login(UserDTO userDto) throws ResourceNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userDto.getEmail()));

        if (userDto.getPassword().equals(userEntity.getPassword())) {
            userEntity.setPassword(null);
            UserDTO user = modelMapper.map(userEntity, UserDTO.class);
            user.setRole(AppConstants.USER);
            user.setPassword(null);
            return user;
        } else {
            throw new ResourceNotFoundException("Invalid credentials");
        }
    }
}

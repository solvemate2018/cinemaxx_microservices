package com.example.cinemaservice.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;
    @Getter
    private final Long id;
    @Getter
    private final String email;
    private final String username;
    @Getter
    private final String role;
    private final Collection<? extends GrantedAuthority> authorities;

    @JsonIgnore
    private final String password;

    public UserDetailsImpl(long id, String username, String email , String password, String role){
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.authorities = new ArrayList<>(){{add(new SimpleGrantedAuthority(role));}};
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

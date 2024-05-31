package com.example.cinemaservice.security.config;

import com.example.cinemaservice.security.jwt.JwtTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfig(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers(HttpMethod.GET, "/cinemas").permitAll()
                .requestMatchers(HttpMethod.GET, "/cinemas/{cinemaId}").permitAll()
                .requestMatchers(HttpMethod.POST, "/cinemas").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/cinemas/{cinemaId}").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/cinemas/{cinemaId}").hasAuthority("ADMIN")

                .requestMatchers(HttpMethod.GET, "/cinemas/{cinemaId}/halls").permitAll()
                .requestMatchers(HttpMethod.GET, "/halls/{hallId}").permitAll()
                .requestMatchers(HttpMethod.POST, "/cinemas/{cinemaId}/halls").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/halls/{hallId}").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/halls/{hallId}").hasAuthority("ADMIN")

                .requestMatchers(HttpMethod.GET, "/halls/{hallId}/schedules").permitAll()
                .requestMatchers(HttpMethod.GET, "/schedules/{scheduleId}").permitAll()
                .requestMatchers(HttpMethod.POST, "/halls/{hallId}/schedules").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/schedules/{scheduleId}").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/schedules/{scheduleId}").hasAuthority("ADMIN")
        ).httpBasic(withDefaults());

        http.csrf((csrf) -> csrf.disable());

        return http.build();
    }
}

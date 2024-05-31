package com.example.cinemaservice.security.jwt;

import com.example.cinemaservice.security.services.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        log.info("token: {}", token);
        if (token != null && token.startsWith("Bearer ")) {
            try {
                Claims claims = jwtUtil.extractAllClaims(token.substring(7));
                String userId = claims.get("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", String.class);
                String email = claims.get("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", String.class);
                String role = claims.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", String.class);
                String firstName = claims.get("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname", String.class);
                String lastName = claims.get("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", String.class);

                int id = Integer.parseInt(userId);

                UserDetailsImpl userDetails = new UserDetailsImpl(
                         id,
                        firstName + " " + lastName,
                        email,
                        "",
                        role);

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                log.info("user: {}", userDetails);
            } catch (Exception e) {
                logger.error("Invalid JWT token", e);
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}

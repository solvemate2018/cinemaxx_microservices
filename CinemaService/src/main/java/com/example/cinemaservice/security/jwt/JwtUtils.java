package com.example.cinemaservice.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Component
@Slf4j
public class JwtUtils {
    @Autowired
    private Environment env;

    private SecretKey secretKey;

    private void resolveSecretKey(){
        String SECRET_KEY = env.getProperty("jwt.secret.key") != null ? env.getProperty("jwt.secret.key") : "some_default_value_that_can_be_used_when_nothing_is_seted";
        assert SECRET_KEY != null;
        secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
    }

    public Claims extractAllClaims(String token) {
        if(secretKey == null){
            resolveSecretKey();
        }
         return Jwts.parser().requireIssuer("auth-service").requireAudience("cinema-services").verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }
}

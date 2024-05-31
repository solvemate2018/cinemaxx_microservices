package com.example.cinemaservice.config;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

@Configuration
@Slf4j
public class DataSourceConfig {
    @Autowired
    private Environment env;

    @Bean
    @Primary
    public DataSource dataSource(){
        String dbUrl = env.getProperty("mysql.database");
        String dbUser = env.getProperty("mysql.user");
        String dbPassword = env.getProperty("mysql.password");

        log.info("Initializing DataSource:" + dbUrl + dbUser + dbPassword);
        if (dbUrl != null && !dbUrl.isEmpty() && dbUser != null && !dbUser.isEmpty() && dbPassword != null && !dbPassword.isEmpty()) {
            return DataSourceBuilder.create()
                    .url(dbUrl)
                    .username(dbUser)
                    .password(dbPassword)
                    .driverClassName("com.mysql.cj.jdbc.Driver")
                    .build();
        } else {
            return DataSourceBuilder.create()
                    .url("jdbc:h2:mem:cinema;")
                    .driverClassName("org.h2.Driver")
                    .build();
        }
    }
}

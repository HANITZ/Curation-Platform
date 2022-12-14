package com.ssafy.jiguhero.oauthlogin.domain.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.jiguhero.oauthlogin.domain.entity.time.DefaultTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Table(name="token")
@Entity
public class Token extends DefaultTime{

    @Id
    @Column(name = "user_email", length = 512 , nullable = false)
    private String userEmail;

    @Column(name = "refresh_token", length = 512 , nullable = false)
    private String refreshToken;

    public Token(){}

    public Token updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    @Builder
    public Token(String userEmail, String refreshToken) {
        this.userEmail = userEmail;
        this.refreshToken = refreshToken;
    }
}

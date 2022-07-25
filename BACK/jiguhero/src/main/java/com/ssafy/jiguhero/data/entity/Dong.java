package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Dong")
public class Dong {
    @Id
    @Column(name = "dong_code")
    private String dongCode;

    @Column(nullable = false, name = "dong_name")
    private String dongName;

    //@Column(nullable = false, name = "sido_code")
    //private String sidoCode;

    //@Column(nullable = false, name = "gugun_code")
    //private String gugunCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gugunCode")
    private Gugun gugun;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sidoCode")
    private Sido sido;
}

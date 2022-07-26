package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Ground;

import java.util.List;

public interface GroundDao {

    // 활동구역 Top5 조회순
    List<Ground> selectTop5ByOrderByHits();

    // 활동구역 Top5 좋아요순
    List<Ground> selectTop5ByOrderByLikes();

}
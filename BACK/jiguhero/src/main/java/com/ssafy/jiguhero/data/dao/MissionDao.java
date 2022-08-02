package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Like_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;

import java.util.List;

public interface MissionDao {

    // 임무 Top3 참여자순
    List<Mission> selectTop3NowPerson();

    // user에 해당하는 like_mission 인스터스 목록
    List<Like_Mission> selectLikeMissionByUser(User user);

    // mission_id로 미션 정보 조회
    Mission selectMissionById(Long missionId);

}

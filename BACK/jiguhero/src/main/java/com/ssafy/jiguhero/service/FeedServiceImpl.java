package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.FeedDao;
import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class FeedServiceImpl implements FeedService {

    private final FeedDao feedDao;
    private final MissionDao missionDao;
    private final UserDao userDao;
    private final ImageDao imageDao;

    @Autowired
    public FeedServiceImpl(FeedDao feedDao, MissionDao missionDao, UserDao userDao, ImageDao imageDao) {
        this.feedDao = feedDao;
        this.missionDao = missionDao;
        this.userDao = userDao;
        this.imageDao = imageDao;
    }

    @Override
    public FeedDto getFeedById(Long feedId, Long userId){
        User userEntity = userDao.selectUserById(userId);
        Feed feedEntity = feedDao.selectFeedById(feedId);
        FeedDto dto = FeedDto.of(feedEntity);

        int cnt = feedDao.countByFeed(feedEntity);
        dto.setLikeCnt(cnt);

        if(feedDao.selectLikeFeedByUser(feedEntity, userEntity)!=null){
            dto.setLikeCheck(true);
        }

        return dto;
    }

    @Transactional
    @Override
    public int insertFeed(FeedDto feedDto,Long missionId, Long userId){
        Feed feed = new Feed();
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);

        if(feedDao.searchFeed(userEntity)==null) {
            feed.setContent(feedDto.getContent());
            feed.setRegtime(LocalDate.now());
            feed.setUser(userEntity);
            feed.setMission(missionEntity);
            feedDao.insertFeed(feed);

            ///////////////////////////////////////////////////// 달성률 계산
            int days = (int) ChronoUnit.DAYS.between(missionEntity.getStartDate(), LocalDate.now()) + 1;
            int feeds = feedDao.countByFeed(missionEntity, userEntity);
            int successRate = (feeds/days)*100;

            Conn_Mission connMission = missionDao.selectConnMission(missionEntity, userEntity);
            connMission.setSuccessRate(successRate);
            /////////////////////////////////////////////////////

            return 1; // <해당 날짜, 유저>로 등록된 인증샷이 없는 경우 인증샷 등록 완료
        }
        else
            return 2; // <해당 날짜, 유저>로 등록된 인증샷이 있는 경우 인증샷 등록 불가

    }

    @Transactional
    @Override
    public FeedDto updateFeed(FeedDto feedDto, Long userId) throws Exception{
        User userEntity = userDao.selectUserById(userId);

        if(feedDao.selectFeed(feedDto.getFeedId(), userEntity)!=null) {
            Feed feed = feedDao.updateFeed(feedDto);
            FeedDto dto = FeedDto.of(feed);
            return dto;
        }
        else {
            throw new Exception();
        }
    }

    @Transactional
    @Override
    public int deleteFeed(Long feedId, Long userId, Long missionId){
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);
        Feed feedEntity = feedDao.selectFeedById(feedId);

        if(feedDao.selectFeed(missionEntity, userEntity)!=null) {
            feedDao.deleteLikeFeed(feedEntity);
            feedDao.deleteFeed(feedId);

            ///////////////////////////////////////////////////// 달성률 계산
            int days = (int) ChronoUnit.DAYS.between(missionEntity.getStartDate(), LocalDate.now()) + 1;
            int feeds = feedDao.countByFeed(missionEntity, userEntity);
            int successRate = (feeds/days)*100;

            Conn_Mission connMission = missionDao.selectConnMission(missionEntity, userEntity);
            connMission.setSuccessRate(successRate);
            /////////////////////////////////////////////////////

            return 1; // <해당 날짜, 미션, 유저>로 등록된 인증샷이 있는 경우 인증샷 삭제 완료
        }
        else return 2; // <해당 날짜, 미션, 유저>로 등록된 인증샷이 없는 경우 인증샷 삭제 불가
    }
}

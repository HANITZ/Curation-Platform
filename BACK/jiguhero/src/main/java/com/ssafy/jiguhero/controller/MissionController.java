package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.service.MissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/mission")
@Api("임무 관련 REST V1")
public class MissionController {

    private final MissionService missionService;

    @Autowired
    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @ApiOperation(value = "user_id에 해당하는 유저가 좋아요한 임무 목록을 반환한다.", response = List.class)
    @GetMapping("/{user_id}/hearts")
    public ResponseEntity<List<MissionDto>> getLikeMissions(@PathVariable("user_id") Long userId) {
        List<MissionDto> list = missionService.getLikeMissions(userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "user_id에 해당하는 유저가 참여중인 임무 리스트를 반환한다.", response = List.class)
    @GetMapping("/{user_id}/joins")
    public ResponseEntity<List<MissionDto>> getJoinMissions(@PathVariable("user_id") Long userId) {
        List<MissionDto> list = missionService.getJoinMissions(userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "전체 임무 리스트를 반환한다.", response = List.class)
    @GetMapping("/")
    public ResponseEntity<List<MissionDto>> getAllMissions() {
        List<MissionDto> list = missionService.getAllMissions();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "해당 임무의 모든 정보를 반환한다.", response = String.class) // 좋아요 클릭 여부/ 기능 추가해야 함 o
    @GetMapping("/{mission_id}/details")
    public ResponseEntity<MissionDto> getMission(@PathVariable("mission_id") Long missionId, @RequestParam("user_id") Long userId) {
        MissionDto result = missionService.getMissionById(missionId, userId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "새로운 임무를 등록한다.", response = String.class) // missionServiceImpl 확인!!! Conn_Mission도 추가해야함(임무 작성한 대원 저장 등)
    @PostMapping("/")
    public ResponseEntity<String> saveMission(@RequestBody MissionDto missionDto, @RequestParam("user_id") Long userId) {

        missionService.saveMission(missionDto, userId);

        return new ResponseEntity<String>("success", HttpStatus.OK);
        // missionServiceImpl 확인!!! Conn_Mission도 추가해야함(임무 작성한 대원 저장 등)
    }

    @ApiOperation(value = "해당 임무에 참여한다.", response = String.class)
    @PostMapping("/{mission_id}/details")
    public ResponseEntity<String> saveMission(@RequestParam("user_id") Long userId, @RequestParam("mission_id") Long missionId) {

        missionService.joinMission(userId, missionId);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "해당 임무의 '좋아요'를 클릭한다.", response = List.class)
    @PostMapping("/{mission_id}/hearts")
    public ResponseEntity<String> saveLikeMission(@PathVariable("mission_id") Long missionId, @RequestParam("user_id") Long userId) {
        int check = missionService.likeMission(missionId, userId);

        if(check == 1) return new ResponseEntity<String>("success", HttpStatus.OK);
        else return new ResponseEntity<String>("deletesuccess", HttpStatus.OK);
    }

    @ApiOperation(value = "해당 임무를 삭제한다.", response = List.class)
    @DeleteMapping("/{mission_id}/details")
    public ResponseEntity<String> deleteMission(@PathVariable("mission_id") Long missionId, @RequestParam("user_id") Long userId) {
        int check = missionService.deleteMission(missionId, userId);

        if(check == 1) return new ResponseEntity<String>("success", HttpStatus.OK);
        else return new ResponseEntity<String>("unauthorized", HttpStatus.OK);

    }
}
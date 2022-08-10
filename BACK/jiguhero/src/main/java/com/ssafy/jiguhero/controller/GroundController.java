package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.service.GroundService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ground")
@Api("활동구역 관련 REST V1")
public class GroundController {

    private final GroundService groundService;

    @Autowired
    public GroundController(GroundService groundService) {
        this.groundService = groundService;
    }

    @ApiOperation(value = "user_id에 해당하는 유저가 좋아요한 활동구역 목록을 반환한다.", response = List.class)
    @GetMapping("/{user_id}/hearts")
    public ResponseEntity<List<GroundDto>> getLikeGrounds(@PathVariable("user_id") Long userId) {
        List<GroundDto> list = groundService.getLikeGrounds(userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "활동구역 전체 리스트 목록을 반환한다.(리뷰 제외)", response = List.class)
    @GetMapping("/list")
    public ResponseEntity<List<GroundDto>> getGrounds() {
        List<GroundDto> list = groundService.getGrounds();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "특정 활동구역의 정보를 반환한다.", response = GroundDto.class)
    @GetMapping("/get/{ground_id}")
    public ResponseEntity<GroundDto> getGround(@PathVariable("ground_id") Long groundId){
        GroundDto dto = groundService.getGround(groundId);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @ApiOperation(value = "특정 활동구역에 포함된 장소 정보들을 반환한다.", response = List.class)
    @GetMapping("/list/{ground_id}")
    public ResponseEntity<List<PlaceDto>> getPlacesByGround(@PathVariable("ground_id") Long groundId){
        List<PlaceDto> list = groundService.getPlacesByGround(groundId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "특정 유저가 생성한 활동구역 목록을 반환한다.", response = List.class)
    @GetMapping("/list/{user_id}")
    public ResponseEntity<List<GroundDto>> getGroundsByUser(@PathVariable("user_id") Long userId){
        List<GroundDto> list = groundService.getGroundsByUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "활동구역을 생성한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<String> createGround(@RequestBody GroundDto groundDto, @RequestParam("user_id") Long userId){
        groundService.saveGround(groundDto, userId);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "활동구역에 장소를 추가한다.", response = String.class)
    @PostMapping("/place")
    public ResponseEntity<String> addGround(@RequestParam("place_id") String placeId, @RequestParam("ground_id") Long groundId, @RequestParam("user_id") Long userId){
        if(groundService.addGround(placeId, groundId, userId)){
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
        return new ResponseEntity<String>("unauthorized", HttpStatus.OK);
    }

    @ApiOperation(value = "활동구역에서 장소를 삭제한다.", response = String.class)
    @DeleteMapping("/place")
    public ResponseEntity<String> deletePlaceInGround(@RequestParam("place_id") String placeId, @RequestParam("ground_id") Long groundId, @RequestParam("user_id") Long userId){
        return new ResponseEntity<String>(String.valueOf(groundService.deletePlace(placeId, groundId, userId)), HttpStatus.OK);
    }

    @ApiOperation(value = "활동구역을 삭제한다.", response = String.class)
    @DeleteMapping("/")
    public ResponseEntity<String> deleteGround(@RequestParam("ground_id") Long groundId, @RequestParam("user_id") Long userId){
        return new ResponseEntity<String>(String.valueOf(groundService.deleteGround(groundId, userId)), HttpStatus.OK);
    }
}

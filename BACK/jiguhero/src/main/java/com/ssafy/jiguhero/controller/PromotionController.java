package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.PromotionDto;
import com.ssafy.jiguhero.service.ImageService;
import com.ssafy.jiguhero.service.PromotionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/promotion")
@Api("프로모션 관련 REST V1")
public class PromotionController {

    private final PromotionService promotionService;
    private final ImageService imageService;

    @Autowired
    public PromotionController(PromotionService promotionService, ImageService imageService) {
        this.promotionService = promotionService;
        this.imageService = imageService;
    }

    @ApiOperation(value = "모든 프로모션 및 이벤트 소식 리스트를 반환한다.", response = List.class)
    @GetMapping("/list")
    public ResponseEntity<List<PromotionDto>> getPromotions(){
        List<PromotionDto> list = promotionService.getPromotions();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "특정 프로모션 및 이벤트 소식 정보를 반환한다.", response = PromotionDto.class)
    @GetMapping("/get/{promotion_id}")
    public ResponseEntity<PromotionDto> getPromotion(@PathVariable("promotion_id") Long promotionId){
        PromotionDto dto = promotionService.getPromotion(promotionId);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @ApiOperation(value = "프로모션 및 이벤트 소식 정보를 등록한다.", response = PromotionDto.class)
    @PostMapping
    public ResponseEntity<PromotionDto> createPromotion(@RequestBody PromotionDto promotionDto){
        PromotionDto savedPromotion = promotionService.savePromotion(promotionDto);

        return ResponseEntity.status(HttpStatus.OK).body(savedPromotion);
    }

    @ApiOperation(value = "프로모션 및 이벤트 소식 정보를 수정한다.", response = PromotionDto.class)
    @PutMapping
    public ResponseEntity<PromotionDto> updatePromotion(@RequestParam("file") MultipartFile file, @RequestBody PromotionDto promotionDto){
        PromotionDto updatedPromotion = promotionService.savePromotion(promotionDto);

        if(!file.isEmpty()) { // 이미지가 포함되어 있을 경우
            imageService.savePromotionImage(file, updatedPromotion.getPromotionId());
        }

        return ResponseEntity.status(HttpStatus.OK).body(updatedPromotion);
    }

    @ApiOperation(value = "프로모션 및 이벤트 소식 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/")
    public ResponseEntity<String> deletePromotion(@RequestParam("promotion_id") Long promotionId){
        promotionService.deletePromotion(promotionId);

        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @ApiOperation(value = "제목을 통해 프로모션 및 이벤트 소식 정보를 검색한다.", response = String.class)
    @GetMapping("/search")
    public ResponseEntity<List<PromotionDto>> searchPromotion(@RequestParam("keyword") String keyword){
        List<PromotionDto> list = promotionService.searchByKeyword(keyword);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}

package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.support.request.AddReplyCond;
import com.donjo.backend.api.dto.support.request.AddSupportCond;
import com.donjo.backend.api.dto.support.request.DonationSettingCond;
import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.dto.support.response.FindSupportPayload;
import com.donjo.backend.api.dto.support.response.FindTop10Payload;
import com.donjo.backend.api.service.member.MemberService;
import com.donjo.backend.api.service.support.SupportService;
import com.donjo.backend.config.jwt.JwtFilter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;


@RestController
@Api(tags = "후원 관련 기능 API")
@RequiredArgsConstructor
public class SupportController {
    // logger 선언
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    // SupportService 선언
    private final SupportService supportService;
    // MemberService 선언
    private final MemberService memberService;

    @GetMapping(path="/api/auth/member/dashboard/earning")
    @ApiOperation(value = "수익금 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getEarning(HttpServletRequest request, @RequestParam @NotNull String type, @RequestParam @NotNull int period) {
        // type과 period를 조건으로 수익금 조회
        logger.info("memberService.getMemberAddress 요청");
        return ResponseEntity.status(200)
                .body(supportService.getEarning(memberService.getMemberAddress(request), type, period));
    }

    @PostMapping(path="/api/member/supports")
    @ApiOperation(value = "후원내역 저장", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> createSupport(@RequestBody @Valid AddSupportCond addSupportCond) {
        logger.info("supportService.createSupports 요청");
        // 후원 저장
        supportService.createSupports(addSupportCond);
        return ResponseEntity.status(200).build();
    }

    @GetMapping(path="/api/member/dashboard/supports")
    @ApiOperation(value = "서포트 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupports(@RequestParam @NotNull String memberAddress, @RequestParam @NotNull String type, @RequestParam @NotNull int pageNum,@RequestParam @NotNull int pageSize) {
        logger.info("supportService.getSupports 요청");
        // type으로 support를 조회하고 pagination
        FindSupportPayload supports = supportService.getSupports(memberAddress, type, pageNum,pageSize);
        // 값이 들어있지 않다면 204 정보없음
        return ResponseEntity.status(supports.getSupportList().size() > 0 ? 200 : 204).body(supports);
    }

    @GetMapping(path="/api/member/supports")
    @ApiOperation(value = "서포트 상세 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportDetail(@RequestParam @NotNull String toAddress, @RequestParam @NotNull Long supportUid) {
        // Address와 supportUid로 SupportDetail을 조회합니다.
        try {
            logger.info("supportService.getSupportDetail 요청");
            FindSupportDetailPayload supportDetail = supportService.getSupportDetail(toAddress,supportUid);
            return ResponseEntity.status(200).body(supportDetail);
        }
        catch (Exception e){
            return ResponseEntity.status(404).body("정보 없음");
        }
    }

    @GetMapping(path="/api/member/supporters/count")
    @ApiOperation(value = "서포트 수 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportCount(HttpServletRequest request,@RequestParam @NotNull String type) {
        logger.info("supportService.getSupportCount 요청");
        // type을 조건으로 서포트 개수 조회
        int countSupport = supportService.getSupportCount(type,memberService.getMemberAddress(request));
        return ResponseEntity.status(200).body(countSupport);
    }

    @GetMapping(path="/api/auth/member/donation/setting")
    @ApiOperation(value = "도네이션 설정 가져오기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getDonationSetting(HttpServletRequest request) {
        logger.info("supportService.getDonationSetting 요청");
        // Header에 있는 토큰값으로 Address를 조회한 후 도네이션 정보 가져오기
        DonationSettingCond donationSettingCond = supportService.getDonationSetting(memberService.getMemberAddress(request));
        return ResponseEntity.status(200).body(donationSettingCond);
    }

    @PutMapping(path="/api/auth/member/donation/setting")
    @ApiOperation(value = "도네이션 수정하기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> changeDonationSetting(HttpServletRequest request,@RequestBody @Valid DonationSettingCond donationSettingCond) {
        logger.info("supportService.changeDonation 요청");
        // Header에 있는 토큰값으로 Address를 조회한 후 도네이션 정보 업데이트
        supportService.changeDonation(donationSettingCond,memberService.getMemberAddress(request));
        return ResponseEntity.status(200).build();
    }

    @GetMapping(path="/api/main/supports")
    @ApiOperation(value = "최근 후원 내역 10개 가져오기(인트로페이지)", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "NOT FOUND(정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportTop10() {
        logger.info("supportService.getTop10 요청");
        // 최근 후원 10개 불러오기
        List<FindTop10Payload> top10 = supportService.getTop10();
        return ResponseEntity.status(200).body(top10);
    }

    @PostMapping(path="/api/auth/support/reply")
    @ApiOperation(value = "댓글 저장", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성,수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(작성,수정 실패)"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> saveReply(@RequestBody @Valid AddReplyCond dto) {
        logger.info("supportService.saveReply 요청");
        // 댓글 저장
        supportService.saveReply(dto);
        return ResponseEntity.status(200).body("저장 성공");
    }

    @PutMapping(path="/api/auth/support/reply")
    @ApiOperation(value = "댓글 수정", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성,수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(작성,수정 실패)"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> changeReply(@RequestBody @Valid AddReplyCond dto) {
        logger.info("supportService.saveReply 요청");
        // 댓글 수정
        supportService.saveReply(dto);
        return ResponseEntity.status(200).body("수정 성공");
    }


    @DeleteMapping(path="/api/auth/support/reply")
    @ApiOperation(value = "댓글 삭제", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(삭제 실패)"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> deleteReply(@RequestParam @NotNull String transactionHash) {
        logger.info("supportService.deleteReply 요청");
        // transactionHash값으로 support에 있는 댓글 삭제
        supportService.deleteReply(transactionHash);
        return ResponseEntity.status(200).body("삭제 성공");
    }
}

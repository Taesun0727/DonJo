package com.donjo.backend.api.service.Support;

import com.donjo.backend.api.dto.Support.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportServiceImpl implements SupportService {

    @Override
    public EarningsResponseDto getEarning(String type, int period){
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 period : int
        // type과 period를 입력 받아 수익금 리턴!
        return null;
    }
    @Override
    public List<SupportResponseDto> getSupports(String type, int pageNum){
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 pageNum: int
        //support 조회해서 리스트로 넘겨줘야함!
        return null;
    }

    @Override
    public SupportDetailResponseDto getSupportDetail(String type,int supportUid ){
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 support_uid : int
        // 서포트 상세 조회!
        return null;
    }
    @Override
    public CountResponseDto getSupportCount(String type){
        //🌍 type : String
        //- donation or
        //- item or
        //- wishilist or
        //- all
        // type을 받아 서포트 수 return!
        return null;
    }


    @Override
    public DonationResponseDto getDonationSetting(int uid){
        //맴버 접근해서 도네이션 셋팅 가져오기!
        return null;
    }

    @Override
    public void changeDonation(DonationRequestDto donationRequestDto){
        //업데이트 해줘야함 도네이션 설정!
    }

    @Override
    public QrResponseDto getQrcode(int uid){
        //맴버 접근해서 qr코드 가져오기!
        return null;
    }
}

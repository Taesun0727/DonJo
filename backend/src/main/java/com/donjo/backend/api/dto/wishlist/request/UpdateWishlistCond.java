package com.donjo.backend.api.dto.wishlist.request;

import com.donjo.backend.solidity.wishlist.WishlistSol;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWishlistCond {
    // 위시리스트 Uid
    @NotNull
    private Long uid;
    // 위시리스트 제목
    @NotNull
    private String title;
    // 위시리스트 이미지경로
    @NotNull
    private String imgPath;
    // 위시리스트 설명
    @NotNull
    private String description;
    // 위시리스트 목표금액
    @NotNull
    private Long targetAmount; // ETH
    // 감사 메세지
    @NotNull
    private String message;
    // 엔티티에 저장
    public WishlistSol toWishlist(String memberAddress) {
        return WishlistSol.builder()
                .id(uid)
                .title(title)
                .imgPath(imgPath)
                .description(description)
                .targetAmount(targetAmount)
                .message(message)
                .seller(memberAddress)
                .build();

    }
}

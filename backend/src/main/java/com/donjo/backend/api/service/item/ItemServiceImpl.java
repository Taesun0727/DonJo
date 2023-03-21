package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.solidity.Item.Item;
import com.donjo.backend.solidity.Item.ItemSolidity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final ItemSolidity itemSolidity;

    @Override
    public Optional<List<Item>> getItemList(String address) {
        return itemSolidity.getMemberItemList(address);
    }

    @Override
    public void addItem(String address, AddItemCond cond) {
        itemSolidity.addMemberItem(cond.from(address));
    }

    @Override
    public void deleteMemberItem(String address, Long uid) {
        itemSolidity.deleteMemberItem(address, uid);
    }

    @Override
    public void updateMemberItem(String address, UpdateItemCond cond) {
        itemSolidity.updateMemberItem(cond.from(address));
    }

    @Override
    public Optional<Item> getItemDetail(Long uid) {
        return itemSolidity.getItemDetail(uid);
    }
}
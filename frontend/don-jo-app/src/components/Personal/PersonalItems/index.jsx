import * as S from "./style";
import ItemCard from "./ItemsCard";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddItemModal from "../../Common/Modal/AddItemModal";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";
import { itemApi } from "../../../api/items";

const PersonalItems = () => {
  //로그인 유저의 지갑주소 정보
  const loginUserMemberAddress = useSelector(
    (state) => state.web3.walletAddress
  );

  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  //로그인 유저가 페이지 주인인지 확인
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    setIsOwner(pageMemberAddress === loginUserMemberAddress);
  }, []);

  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 6;
  const [itemList, setItemList] = useState([]);
  const [hasMore, setIsEnd] = useState(false);

  const getItemList = async () => {
    const { data } = await itemApi.getItemList(
      pageMemberAddress,
      pageNum,
      PAGE_SIZE
    );
    setPageNum((prev) => prev + 1);
    setItemList((prev) => [...prev, ...(data.itemList || [])]);
    setIsEnd(data.hasMore);
  };

  useEffect(() => {
    getItemList();
  }, []);

  const handleOnClickShowMoreButton = () => {
    console.log("Show More");
    getItemList();
  };

  const OwnerOrHasItemList = () => {
    return (
      <S.CardContainer>
        {isOwner && (
          <S.AddCard
            onClick={() => {
              setIsOpenAddItemModal(true);
            }}
          >
            <S.IconWrapper>
              <FiPlus color="white" size={30} />
            </S.IconWrapper>
          </S.AddCard>
        )}

        {itemList.map((item, i) => {
          return <ItemCard key={i} item={item} isOwner={isOwner} />;
        })}
      </S.CardContainer>
    );
  };

  const Nothing = () => {
    return <S.Nothing>There's no items 🥲</S.Nothing>;
  };

  return (
    <S.Container>
      <S.Title>This is my Items</S.Title>
      {isOwner || itemList.length !== 0 ? <OwnerOrHasItemList /> : <Nothing />}

      {hasMore && (
        <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />
      )}

      {isOpenAddItemModal && (
        <AddItemModal handleSetShowModal={setIsOpenAddItemModal} />
      )}
    </S.Container>
  );
};

export default PersonalItems;

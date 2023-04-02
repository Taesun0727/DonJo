import * as S from "./style";
import ProfileImg from "../../../../Common/ProfileImg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ContractModal from "../../../../Common/Modal/ContractModal";
import { supportApi } from "../../../../../api/support";

const RecentSupportBlock = ({
  supportContent: initContent,
  isOwner,
  num,
  supportListLength,
}) => {
  const [supportText, setSupportText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isShowReplyInput, setIsShowReplyInput] = useState(false);
  const [isShowModifyInput, setIsShowModifyInput] = useState(false);
  const [supportContent, setSupportContent] = useState(initContent);
  const [commentInputText, setCommentInputText] = useState(
    initContent.replyMsg
  ); //댓글 입력
  const [isShowContractModal, setIsShowContractModal] = useState(false);

  useEffect(() => {
    switch (supportContent.supportType) {
      case "donation":
        setSupportText("donates to ");
        setEmoji("💰");
        break;
      case "wishlist":
        setSupportText(" supports  ");
        setEmoji("🙏");
        break;
      case "item":
        setSupportText(" buys from ");
        setEmoji("📁");
        break;
      default:
        console.log("Wrong Support type");
        break;
    }
  }, []);

  //댓글 입력 반영
  const handleOnChangeInput = (e) => {
    setCommentInputText(e.target.value);
  };

  //해당 후원 block 다시 가져오기
  const refreshRecentBlock = () => {
    //UID 붙어서 나오게되면 후원상세조회 다시 해서 setSupportContent 하기.
  };

  //댓글 등록
  const doRegistComment = async () => {
    const replyDto = {
      replyMsg: commentInputText,
      transactionHash: supportContent.transactionHash,
    };
    try {
      await supportApi.postReply(replyDto);
      refreshRecentBlock();
    } catch (error) {
      console.log("error: ", error);
    }
    setIsShowReplyInput(false);
  };

  //댓글 수정
  const doModifyComment = async () => {
    const replyDto = {
      replyMsg: commentInputText,
      transactionHash: supportContent.transactionHash,
    };
    try {
      await supportApi.updateReply(replyDto);
      refreshRecentBlock();
    } catch (error) {
      console.log("error: ", error);
    }
    setIsShowModifyInput(false);
  };

  //댓글 삭제
  const doDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete the comments?")) {
      try {
        await supportApi.deleteReply(supportContent.transactionHash);
        window.alert("Done deleting comments");
      } catch (error) {
        console.log("error: ", error);
        window.alert("Failed to delete comment");
      }
    }
  };

  return (
    <div>
      {/* 누가 누구에게 어떠한 후원을 했는지 노출 */}
      <S.Container>
        <S.RepresentContainer
          onClick={() => {
            setIsShowContractModal(true);
          }}
        >
          <S.ProfileImgContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ProfileImg
              width={3}
              src={supportContent.fromMember.fromMemberProfileImagePath}
              to={`/${supportContent.fromMember.fromMemberPageName}`}
            />
          </S.ProfileImgContainer>
          <S.TitleWrapper>
            <S.TitleContent>
              <S.Nickname>
                {supportContent.fromMember.fromMemberNickname}
              </S.Nickname>
              &nbsp;
              {supportText}
              &nbsp;
              <S.Nickname>
                {supportContent.toAddress.toMemberNickname}
              </S.Nickname>
            </S.TitleContent>
            {isOwner && !supportContent.replyMsg && (
              <S.ReplyBtn
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowReplyInput((prev) => !prev);
                }}
              >
                {isShowReplyInput ? "Close" : "Reply"}
              </S.ReplyBtn>
            )}
          </S.TitleWrapper>
          <S.EmojiWrapper>
            <label style={{ marginLeft: "0.5rem" }}>{emoji}</label>
          </S.EmojiWrapper>
        </S.RepresentContainer>
        {isOwner && isShowReplyInput && (
          <S.InputContainer>
            <S.ReplyInput onChange={handleOnChangeInput} />
            <S.RegistBtn onClick={doRegistComment}>Regist</S.RegistBtn>
          </S.InputContainer>
        )}
      </S.Container>
      {/* 서포트 메세지가 있을 경우 노출 */}
      {supportContent.sendMsg !== "" && (
        <S.CommentContainer>
          <S.ProfileImgContainer>
            <ProfileImg
              width={3}
              src={supportContent.fromMember.fromMemberProfileImagePath}
              to={`/${supportContent.fromMember.fromMemberPageName}`}
            />
          </S.ProfileImgContainer>
          <div>
            <S.Nickname>
              {supportContent.fromMember.fromMemberNickname}
            </S.Nickname>
            <S.Comment>{supportContent.sendMsg}</S.Comment>
            <S.SupportMsgText>Support message</S.SupportMsgText>
          </div>
        </S.CommentContainer>
      )}
      {/* 해당 후원에 댓글이 있을 경우 노출 */}
      {!!supportContent.replyMsg && (
        <S.CommentContainer>
          <S.ProfileImgContainer>
            <ProfileImg
              width={3}
              src={supportContent.toAddress.toMemberProfileImagePath}
            />
          </S.ProfileImgContainer>
          <div>
            <S.Nickname>{supportContent.toAddress.toMemberNickname}</S.Nickname>
            <S.Comment>{supportContent.replyMsg}</S.Comment>

            {isOwner && supportContent.replyMsg && (
              <S.ButtonContainer>
                <S.ModifyBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsShowModifyInput((prev) => !prev);
                  }}
                >
                  {isShowModifyInput ? "Close" : "Modify"}
                </S.ModifyBtn>
                <S.DeleteBtn onClick={doDeleteComment}>Delete</S.DeleteBtn>
              </S.ButtonContainer>
            )}

            {isShowModifyInput && (
              <S.ModifyInputContainer>
                <S.ReplyInput
                  onChange={handleOnChangeInput}
                  defaultValue={commentInputText}
                />
                <S.RegistBtn onClick={doModifyComment}>Modify</S.RegistBtn>
              </S.ModifyInputContainer>
            )}
          </div>
        </S.CommentContainer>
      )}
      {num !== supportListLength - 1 && <S.Line />}

      {isShowContractModal && (
        <ContractModal
          handleSetShowModal={setIsShowContractModal}
          uid={supportContent.uid}
          toMemberAddress={supportContent.toAddress.toMemberAddress}
        />
      )}
    </div>
  );
};

export default RecentSupportBlock;

RecentSupportBlock.propTypes = {
  supportContent: PropTypes.shape({
    uid: PropTypes.number.isRequired,
    supportType: PropTypes.string.isRequired,
    fromMember: PropTypes.shape({
      fromMemberAddress: PropTypes.string.isRequired,
      fromMemberNickname: PropTypes.string.isRequired,
      fromMemberPageName: PropTypes.string.isRequired,
      fromMemberProfileImagePath: PropTypes.string,
    }).isRequired,
    toAddress: PropTypes.shape({
      toMemberAddress: PropTypes.string.isRequired,
      toMemberNickname: PropTypes.string.isRequired,
      toMemberProfileImagePath: PropTypes.string,
    }),
    sendMsg: PropTypes.string,
  }).isRequired,
  isOwner: PropTypes.bool,
};

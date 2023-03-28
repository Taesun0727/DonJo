import * as S from "./style";
import ProfileImg from "../../../../Common/ProfileImg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ContractModal from "../../../../Common/Modal/ContractModal";

const RecentSupportBlock = ({ supportContent, isOwner }) => {
  const [supportText, setSupportText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isShowReplyInput, setIsShowReplyInput] = useState(false);
  const [commentInputText, setCommentInputText] = useState(""); //댓글 입력
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
      case "items":
        setSupportText(" buys from ");
        setEmoji("📁");
        break;
    }
  }, []);

  //댓글 입력 반영
  const handleOnChangeInput = (e) => {
    setCommentInputText(e.target.value);
  };

  //댓글 등록
  const doRegistComment = () => {
    console.log({ commentInputText }, "댓글 등록");
    setIsShowReplyInput(false);
  };

  return <div></div>;

  // return (
  //   <div>
  //     누가 누구에게 어떠한 후원을 했는지 노출
  //     <S.Container>
  //       <S.RepresentContainer
  //         onClick={() => {
  //           setIsShowContractModal(true);
  //         }}
  //       >
  //         <S.ProfileImgContainer
  //           onClick={(e) => {
  //             e.stopPropagation();
  //           }}
  //         >
  //           <ProfileImg
  //             width={3}
  //             src={supportContent.fromMember.profileImgPath}
  //             to={`/${supportContent.fromMember.pageName}`}
  //           />
  //         </S.ProfileImgContainer>
  //         <S.TitleWrapper>
  //           <S.TitleContent>
  //             <S.Nickname>{supportContent.fromMember.nickname}</S.Nickname>
  //             &nbsp;
  //             {supportText}
  //             &nbsp;
  //             <S.Nickname>{pageOwner.nickname}</S.Nickname>
  //           </S.TitleContent>
  //           {isOwner && Object.keys(supportContent.comments).length === 0 && (
  //             <S.ReplyBtn
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 setIsShowReplyInput((prev) => !prev);
  //               }}
  //             >
  //               {isShowReplyInput ? "Close" : "Reply"}
  //             </S.ReplyBtn>
  //           )}
  //         </S.TitleWrapper>
  //         <S.EmojiWrapper>
  //           <label style={{ marginLeft: "0.5rem" }}>{emoji}</label>
  //         </S.EmojiWrapper>
  //       </S.RepresentContainer>
  //       {isOwner && isShowReplyInput && (
  //         <S.InputContainer>
  //           <S.ReplyInput handleOnChangeValue={handleOnChangeInput} />
  //           <S.RegistBtn onClick={doRegistComment}>Regist</S.RegistBtn>
  //         </S.InputContainer>
  //       )}
  //     </S.Container>
  //     {/* 서포트 메세지가 있을 경우 노출 */}
  //     {supportContent.sendMsg !== "" && (
  //       <S.CommentContainer>
  //         <S.ProfileImgContainer>
  //           <ProfileImg
  //             width={3}
  //             src={supportContent.fromMember.profileImgPath}
  //             to={`/${supportContent.fromMember.pageName}`}
  //           />
  //         </S.ProfileImgContainer>
  //         <div>
  //           <S.Nickname>{supportContent.fromMember.nickname}</S.Nickname>
  //           <S.Comment>{supportContent.sendMsg}</S.Comment>
  //           <S.SupportMsgText>Support message</S.SupportMsgText>
  //         </div>
  //       </S.CommentContainer>
  //     )}
  //     {/* 해당 후원에 댓글이 있을 경우 노출 */}
  //     {Object.keys(supportContent.comments).length !== 0 && (
  //       <S.CommentContainer>
  //         <S.ProfileImgContainer>
  //           <ProfileImg width={3} src={pageOwner.profileImgPath} />
  //         </S.ProfileImgContainer>
  //         <div>
  //           <S.Nickname>{pageOwner.nickname}</S.Nickname>
  //           <S.Comment>{supportContent.comments.content}</S.Comment>
  //         </div>
  //       </S.CommentContainer>
  //     )}
  //     <S.Line />
  //     {isShowContractModal && (
  //       <ContractModal
  //         handleSetShowModal={setIsShowContractModal}
  //         supportContent={supportContent}
  //       />
  //     )}
  //   </div>
  // );
};

export default RecentSupportBlock;

RecentSupportBlock.propTypes = {
  supportContent: PropTypes.shape({
    uid: PropTypes.number.isRequired,
    supportType: PropTypes.string.isRequired,
    fromMember: PropTypes.shape({
      pageName: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      profileImgPath: PropTypes.string,
    }).isRequired,
    sendMsg: PropTypes.string,
  }).isRequired,
  isOwner: PropTypes.bool,
};

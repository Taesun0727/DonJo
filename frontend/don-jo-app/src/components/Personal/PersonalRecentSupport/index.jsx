import * as S from "./style";

const PersonalRecentSupport = () => {
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Recent Support</S.Title>
        <S.Typecontainer>
          <S.Type>🙏 Wishlist</S.Type>
          <S.Type>💰 Donation</S.Type>
          <S.Type>📁 Items</S.Type>
        </S.Typecontainer>
      </S.TitleContainer>
      <S.Card></S.Card>
    </S.Container>
  );
};

export default PersonalRecentSupport;

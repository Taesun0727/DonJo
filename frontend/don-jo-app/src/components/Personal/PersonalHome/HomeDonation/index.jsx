import { useEffect, useState } from "react";
import * as S from "./style";
import BasicTextarea from "../../../Common/BasicTextarea";
import BasicButton from "../../../Common/BasicButton";
import { FiMinus, FiPlus } from "react-icons/fi";
import { type } from "@testing-library/user-event/dist/type";

//해당 페이지의 후원 세팅
const donationSetting = {
  pricePerDonation: 3,
  donationEmoji: "🍪",
  donationName: "MyCookie",
  thankMsg: "Thanks for ur donation~",
};

const HomeDonation = () => {
  const [count, setCount] = useState(1);
  const [msg, setMsg] = useState("");
  const [btnText, setBtnText] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  const DecreaseBtn = () => {
    return (
      <div style={{ margin: "0 auto" }}>
        <S.RoundBtn onClick={decreaseCount}>
          <FiMinus color="white" size={22} />
        </S.RoundBtn>
      </div>
    );
  };

  const IncreaseBtn = () => {
    return (
      <S.RoundBtn onClick={increaseCount}>
        <FiPlus color="white" size={22} />
      </S.RoundBtn>
    );
  };

  const decreaseCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleOnChangeCount = (e) => {
    setCount(Number(e.target.value));
    if (count < 1) setCount(1);
  };

  const handleOnChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleOnClickDonate = () => {};

  useEffect(() => {
    const donationAmount = donationSetting.pricePerDonation * count;
    setDonationAmount(donationAmount);
    setBtnText("Donate $" + String(donationAmount));
  }, [count, donationSetting.pricePerDonation]);

  return (
    <S.Container>
      <S.Title>Buy Robert Downy Jr.</S.Title>
      <S.Card>
        <S.ImojiContainer>
          <S.Imoji>{donationSetting.donationEmoji}</S.Imoji>
          <S.ImojiTitle>{donationSetting.donationName}</S.ImojiTitle>
        </S.ImojiContainer>
        <S.CounterContainer>
          <S.CountInput
            type="number"
            value={count}
            onChange={handleOnChangeCount}
          ></S.CountInput>
          <DecreaseBtn />
          <IncreaseBtn />
        </S.CounterContainer>
        <BasicTextarea
          handleOnChangeValue={handleOnChangeMsg}
          placeholder="Send a message"
        />
        <S.BasicButtonWrapper>
          <BasicButton
            text={btnText}
            color="var(--color-primary)"
            handleOnClickButton={handleOnClickDonate}
            isBackground={true}
          />
        </S.BasicButtonWrapper>
      </S.Card>
    </S.Container>
  );
};

export default HomeDonation;

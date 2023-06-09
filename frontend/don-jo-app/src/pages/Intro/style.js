import styled from "styled-components";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background-color: #f7f7f7;
  padding: 2rem 2.5rem 8rem 2.5rem;
  @media (max-width: 768px) {
    padding: 1rem 1.25rem 4rem 1.25rem;
  }
`;

export const DonJoTitle = styled.div`
  display: flex;
  width: 100%;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
  position: relative;
  width: 100%;
  height: 38.125rem;
  margin-top: 2rem;
  border-radius: 1.25rem;
  background: #222222;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);

  @media (max-width: 767px) {
    height: 400px;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 20s linear infinite;
    bottom: -150px;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

export const InputWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  width: calc(100% - 2.5rem);
  height: 4rem;
  max-width: 60rem;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 3.125rem;
  font-family: "RobotoBold";
  font-size: 2rem;
  line-height: 2.9375rem;
  padding: 0 2.25rem;
  @media (max-width: 769px) {
    width: calc(100% - 20px);
    max-width: 29rem;
    height: 2.625rem;
    font-size: 14px;
    line-height: 2.5rem;
    padding: 0 1rem;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.875rem;
  line-height: 2.25rem;
  flex: 1;
  margin-left: 0.25rem;
  font-family: "RobotoMedium";
  @media (max-width: 769px) {
    font-size: 0.875rem;
    height: 100%;
    margin-left: 0rem;
  }
`;

export const ArrowIcon = styled(FiArrowRight)`
  margin-left: 1rem;
  @media (max-width: 769px) {
    font-size: 1rem;
  }
`;

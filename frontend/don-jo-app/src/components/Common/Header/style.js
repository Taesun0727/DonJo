import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media screen and (max-width: 80rem) {
    padding: 0 1.25rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80rem;
`;

export const Logo = styled.img`
  height: 2rem;
  object-fit: contain;
  cursor: pointer;
`;

export const GuideSelect = styled.button`
  margin-left: auto;
  font-size: 1rem;
`;

export const ProfileImgContainer = styled.div`
  margin-left: 1.5rem;
  cursor: pointer;
`;

export const Startbtn = styled.button`
  font-size: 1rem;
  width: 100px;
  height: 40px;
  border-radius: 1.25rem;
  font-family: "RobotoMedium";
  background-color: var(--color-primary);
  color: var(--color-background);
`;

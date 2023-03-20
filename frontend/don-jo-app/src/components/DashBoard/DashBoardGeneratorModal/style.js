import styled from "styled-components";

export const PreViewWrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  height: 120px;
  background-color: black;
  border-radius: 1.25rem;
  position: relative;
`;

export const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
`;

export const PreView = styled.div`
  position: absolute;
  left: 5rem;
  top: 2.25rem;
  background-color: white;
  border-radius: 1.5rem;
  height: 3rem;
  width: calc(100% - 156px);
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

export const ColorPalette = styled.div`
  display: flex;
  width: 16.75rem;
  height: 2.75rem;
  justify-content: space-between;
  align-items: center;
`;

export const Color = styled.input`
  appearance: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.value || "#d9d9d9"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  &:checked {
    ::after {
      content: "✔";
      color: white;
    }
  }
`;

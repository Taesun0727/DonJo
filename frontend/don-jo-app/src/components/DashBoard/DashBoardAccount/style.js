import styled from "styled-components";
export const AccountWrapper = styled.div`
  width: 100%;
  max-width: 53.75rem;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2.5rem;
`;

export const EditIconWrapper = styled.div`
  display: none;
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .edit-icon {
    cursor: pointer;
  }
`;

export const BackgroundImg = styled.div`
  position: relative;
  max-width: 40rem;
  height: 7.1875rem;
  border-radius: 0.5rem;
  background-color: #d9d9d9;
  margin-bottom: 3.75rem;
  background-image: ${(props) => `url(${props.url})` || ""};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover > ${EditIconWrapper} {
    display: flex;
  }
`;

export const UserProfileImg = styled.div`
  position: relative;
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-bottom: 3.75rem;
  background-image: ${(props) => `url(${props.url})` || ""};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover > ${EditIconWrapper} {
    display: flex;
  }
`;

export const InputWrapper = styled.div`
  max-width: ${(props) => props.size || "50.75rem"};
  margin-bottom: 3.75rem;
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

export const ButtonWrapper = styled.div`
  width: 17.5rem;
  margin: 3.75rem auto 0 auto;
`;

export const UploadButton = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

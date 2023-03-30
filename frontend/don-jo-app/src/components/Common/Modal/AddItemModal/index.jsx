import * as S from "./style";
import React, { useState } from "react";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import PropTypes from "prop-types";
import FullScreenModal from "../FullScreenModal";
import BasicTitle from "../../BasicTitle";
import BasicInput from "../../BasicInput";
import BasicTextarea from "../../BasicTextarea";
import BasicButton from "../../BasicButton";
import { itemApi } from "../../../../api/items";
import { fileApi } from "../../../../api/file";
import { fileSizeValidator } from "../../../../utils/validation/validator";
import { checkItemValidation } from "../../../../utils/validation/checkItemValidation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * 아이템 추가/수정 모달
 * @param {function} handleSetShowModal - Modal을 닫는 함수
 * @param {function} transactionFunc - Create 시에 블록체인에 보낼 요청
 * @param {string} imageTitle - 아이템 추가 모달: "Featured Image", 위시리스트 추가 모달: "Image"
 * @returns
 */

const ITEM_TYPE = "item";
const IMAGE_TYPE = "img/item";
const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const AddItemModal = ({
  handleSetShowModal,
  whichApiChoose,
  imageTitle,
  isModify,
}) => {
  const currentItem = useSelector((state) => state.items.currentItem);

  // 아이템 프로필 설정
  const [itemFile, setItemNamFile] = useState({
    previewImgUrl: "",
    file: {},
  });
  const [itemImageFile, setItemImageFile] = useState({
    previewImgUrl: "",
    file: {},
  });

  // 아이템 정보 저장 및 비구조분해 할당으로 가져옴
  const [itemInfo, setItemInfo] = useState({
    title: "",
    price: "",
    description: "",
    message: "",
    imgPath: "",
    filePath: "",
  });
  const { title, price, description, message, imgPath, filePath } = itemInfo;

  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;
    setItemInfo({
      ...itemInfo,
      [id]: value,
    });
  };

  const setFileChange = async (id, previewImgUrl = "", file = {}) => {
    if (id === "featured-image") {
<<<<<<< HEAD
      setItemImageFile({ previewImgUrl, file });
    } else if (id === "file-upload") {
      setItemNamFile({ previewImgUrl, file });
=======
      console.log(id, previewImgUrl, file);
      setItemImageFile({ previewImgUrl: previewImgUrl, file: file });
      setItemInfo({ ...itemInfo, imgPath: "" });
    } else if (id === "file-upload") {
      setItemNamFile({ previewImgUrl: previewImgUrl, file: file });
      setItemInfo({ ...itemInfo, filePath: "" });
>>>>>>> 6ee062dc01cecf64f866924fa5361d900ac53daa
    }
  };

  const handleFileChange = async (e) => {
    const {
      target: { id, files },
    } = e;

    if (e.target.value === "") {
      setFileChange(id, "", {});
      return;
    }

    if (!fileSizeValidator(files[0])) {
      setFileChange(id, "", {});
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setFileChange(id, reader.result, files[0]);
    };
  };

  // 파일 업로드를 위한 API 호출
  const handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const { data } = await fileApi.uploadFile(formData, type);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleUploadItem = async () => {
    if (itemFile.previewImgUrl === "" && filePath === "") {
      alert("파일 업로드 가이드 제공");
      return;
    }

    if (itemImageFile.previewImgUrl === "" && imgPath === "") {
      alert("이미지 업로드 가이드 제공");
      return;
    }

    // 필수 입력 확인
    if (!message) {
      alert("안내처리 - 메세지 예정");
      return;
    }

    if (!checkItemValidation({ name: title, price: price })) return;

    let itemData = {
      ...itemInfo,
    };
<<<<<<< HEAD
    console.log("cond: ", cond);
    if (whichApiChoose) {
      itemApi
        .registerItem(cond)
        .then(() => {
          alert("아이템 등록 성공!");
        })
        .catch((error) => {
          alert("아이템 등록 실패!");
        });
    } else {
      wishlistAPI
        .registerWishlistItem(cond)
        .then(() => {
          alert("위시리스트 등록 성공!");
        })
        .catch((error) => {
          alert("위시리스트 등록 실패!");
        });
=======

    // 아이템 이미지 업로드 확인
    if (itemInfo.imgPath === "" && itemImageFile.previewImgUrl !== null) {
      let createdItemPath = await handleUploadFile(
        itemImageFile.file,
        IMAGE_TYPE
      );
      itemData = { ...itemData, imgPath: createdItemPath };
    }

    // 아이템 파일 업로드 확인
    if (itemInfo.filePath === "" && itemFile.previewImgUrl !== null) {
      let createdItemFilePath = await handleUploadFile(
        itemFile.file,
        ITEM_TYPE
      );
      itemData = { ...itemData, filePath: createdItemFilePath };
    }

    // API 호출
    if (isModify) {
      itemData = { ...itemData, uid: currentItem.id };
      try {
        const { status } = await itemApi.updateItem(itemData);
        if (status === 200) {
          handleSetShowModal(true);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      try {
        const { status } = await itemApi.registerItem(itemData);
        if (status === 200) {
          handleSetShowModal(true);
        }
      } catch (error) {
        console.log("error: ", error);
      }
>>>>>>> 6ee062dc01cecf64f866924fa5361d900ac53daa
    }
  };

  useEffect(() => {
    if (isModify) {
      setItemInfo({
        uid: currentItem.id,
        title: currentItem.title,
        price: currentItem.price,
        description: currentItem.description,
        filePath: currentItem.filePath,
        imgPath: currentItem.imgPath,
        message: currentItem.message,
      });
    }
  }, []);

  return (
    <FullScreenModal handleSetShowModal={handleSetShowModal}>
      <S.Container>
        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Name" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.BasicInputWrap>
            <BasicInput
              id="title"
              type="text"
              value={title || ""}
              placeholder="Items Title"
              handleOnChangeValue={handleOnChangeInput}
            />
          </S.BasicInputWrap>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Price" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.SeparationContainer width="16.75">
            <S.BasicInput
              id="price"
              type="text"
              value={price || ""}
              placeholder="1000.000"
              onChange={handleOnChangeInput}
            />
            <S.UnitWrap>eth</S.UnitWrap>
          </S.SeparationContainer>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text={imageTitle} />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.ImageSizeInfo>
            We recommend an image at least 460px wide and 200px tall.
          </S.ImageSizeInfo>
          <S.ItemProfileImg
            url={
              imgPath ? `${S3URL}${imgPath}` : itemImageFile.previewImgUrl || ""
            }
          >
            <S.EditIconWrapper>
              <label htmlFor="featured-image">
                <FiUpload className="edit-icon" size="20px" color="white" />
              </label>
              <S.UploadButton
                id="featured-image"
                type="file"
                accept="image/*"
                defaultValue=""
                onChange={handleFileChange}
                placeholder="select"
              />
            </S.EditIconWrapper>
          </S.ItemProfileImg>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="File Upload" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          {isModify && filePath ? (
            <>
              <a
                href={`${S3URL}${filePath}`}
                style={{ textDecoration: "underline" }}
              >
                Download File
              </a>
              <S.DeleteButton
                onClick={() => {
                  setItemNamFile({ previewImgUrl: "", file: {} });
                  setItemInfo({ ...itemInfo, filePath: "" });
                }}
              >
                Delete File
              </S.DeleteButton>
            </>
          ) : (
            <S.SeparationContainer width="20.75">
              <S.FileUpload
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                placeholder="select a file"
              />
              <S.ButtonWrap>
                <S.FileUploadButton
                  htmlFor="file-upload"
                  color="var(--color-primary)"
                >
                  Open
                </S.FileUploadButton>
              </S.ButtonWrap>
            </S.SeparationContainer>
          )}
        </S.ContentWrap>

        <S.ContentWrap>
          <BasicTitle text="Description" />
          <BasicTextarea
            id="description"
            value={description || ""}
            handleOnChangeValue={handleOnChangeInput}
            placeholder="Description what you are selling."
          />
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Confirmation Message" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <BasicTextarea
            id="message"
            value={message || ""}
            handleOnChangeValue={handleOnChangeInput}
            placeholder="Thank you for supporting my wishlist!"
          />
        </S.ContentWrap>

        <S.BasicButtonWrap>
          <S.BasicButtonContainer>
            <BasicButton
              text="Create"
              color="var(--color-primary)"
              handleOnClickButton={handleUploadItem}
            />
          </S.BasicButtonContainer>
        </S.BasicButtonWrap>
      </S.Container>
    </FullScreenModal>
  );
};

export default AddItemModal;

AddItemModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  imageTitle: PropTypes.string,
  isModify: PropTypes.bool,
};

AddItemModal.defaultProps = {
  imageTitle: "Image",
};

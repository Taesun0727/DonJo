import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";

const handleKeyDown = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
};

const BasicTextarea = ({
  handleOnChangeValue,
  placeholder,
  isReadOnly,
  width,
  height,
}) => {
  return (
    <S.Textarea
      type="string"
      onKeyDown={handleKeyDown}
      onChange={handleOnChangeValue}
      placeholder={placeholder}
      readOnly={isReadOnly}
      width={width}
      height={height}
    />
  );
};

export default BasicTextarea;

BasicTextarea.propTypes = {
  handleOnChangeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

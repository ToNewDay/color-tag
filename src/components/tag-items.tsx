import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import CloseIcon from "@/assets/close.svg";
import { Component } from "@/constants/types";

// #region 色标样式

const ColorItem = styled.div`
  width: fit-content;
  height: 20px;
  min-width: 60px;
  background-color: #ffffff;
  padding: 0 8px 0 6px;
  border-radius: 9px;
  margin-right: 6px;
  margin-top: 3px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 0.5px solid #dadfe6;
  box-sizing: border-box;
  & > div {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ::before {
    width: 8px;
    height: 8px;
    content: "";
    border-radius: 50%;
    background-color: ${(props) => props.color};
  }
`;

const titleClass = css`
  padding: 0 3px;
  font-size: 11px;
  flex: 1;
  color: #666666;
`;

const closeIconClass = css`
  width: 9px;
  height: 9px;
  font-size: 9px;
  color: #aaaaaa;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background: #eeeeee;
  }
`;
// #endregion

export const TagItems: Component.TagItemsType = ({
  value,
  onChange,
  tagsList,
  readOnly = false,
}) => {
  const handleRemove = (id: any) => {
    onChange?.(value?.filter((colorId) => colorId !== id) || []);
  };

  return (
    <>
      {value?.map((colorId) => {
        const item = tagsList?.find((item) => item.id === colorId);
        if (item) {
          return (
            <ColorItem color={item.color} key={item.id}>
              <div className={titleClass} title={item.name}>
                {item.name}
              </div>
              {!readOnly && (
                <CloseIcon
                  className={closeIconClass}
                  onClick={() => {
                    handleRemove(item.id);
                  }}
                />
              )}
            </ColorItem>
          );
        }
        return null;
      })}
    </>
  );
};

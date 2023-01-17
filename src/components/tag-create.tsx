import PlusIcon from "@/assets/add-color-tag.svg";
import ArrowLeft from "@/assets/arrow-left.svg";
import TagChecked from "@/assets/check.svg";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

import { COLOR_TAG_LIST } from "@/constants";
import { useCtx } from "@/context";

// #region  styles

const SelectHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 16px;
  color: rgb(32, 45, 64);
  justify-content: space-between;
  border-radius: 0px;
  padding: 5px 10px;
  margin-bottom: 1px;
`;
const SelectBox = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 16px;
  color: rgb(32, 45, 64);
  justify-content: space-between;
  padding: 5px 10px;
  margin-bottom: 1px;
`;

const arrowLeftClass = css`
  width: 20px;
  height: 20px;
  font-size: 16px;
  padding-left: 2px;
  border-radius: 2px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const SelectHeaderTitle = styled.div`
  flex: 1;
  font-weight: 600;
  padding-right: 30px;
  text-align: center;
`;

const SelectTip = styled.div`
  padding: 11px 12px 11px 12px;
  color: rgb(133, 146, 166);
  font-size: 12px;
`;

const ColorContainer = styled.div`
  margin: 0 10px;
  padding-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const ColorItem = styled.div`
  width: 20px;
  height: 20px;
  margin: 3px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  transition: all 0.05s ease-in;
  :hover {
    transform: scale(1.15);
  }
`;

const SelectFooter = styled.div`
  height: 40px;
  border-top: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  padding: 5px 10px;
  margin-bottom: 1px;
`;

const CompleteText = styled.div`
  padding-left: 20px;
  text-align: center;
  flex: 1;
`;

const checkedClass = css`
  font-size: 14px;
  color: #ffffff;
`;

const buttonClass = css`
  display: flex;
  align-content: center;
  align-items: center;
`;

const enterIconClass = css`
  width: 18px;
  height: 18px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
`;
// #endregion

export interface ITagCreateProps {
  onClose?: () => void;
  onCreated?: (id: string) => void;
  defaultName?: string;
}

export const TagCreate: React.FC<ITagCreateProps> = ({
  onClose,
  onCreated,
  defaultName,
}) => {
  const {
    createTag,
    solts: { uikit },
  } = useCtx();

  const [color, setColor] = useState(COLOR_TAG_LIST?.[0]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [tagName, setTagName] = useState<string>();
  const refColorText = useRef<any>(null);

  useEffect(() => {
    refColorText.current?.focus();
    setTagName(defaultName);
  }, []);

  const HandleCreateNewTag = async (newColor: string, newName: string) => {
    setSpinning(true);
    try {
      const newTagInfo = await createTag({ name: newName, color: newColor });
      onClose?.();
      onCreated?.(newTagInfo?.id);
    } catch (e) {
    } finally {
      setSpinning(false);
    }
  };

  return (
    <uikit.spin spinning={spinning}>
      <>
        <SelectHeader>
          <ArrowLeft className={arrowLeftClass} onClick={onClose} />
          <SelectHeaderTitle>创建标签</SelectHeaderTitle>
        </SelectHeader>
        <SelectTip>标签名称</SelectTip>
        <SelectBox>
          <uikit.input
            ref={refColorText}
            size="middle"
            placeholder=""
            value={tagName}
            onChange={(v) => {
              setTagName(v);
            }}
          />
        </SelectBox>
        <SelectTip>标签颜色</SelectTip>
        <ColorContainer>
          {COLOR_TAG_LIST?.map((item: string) => (
            <ColorItem
              color={item}
              key={item}
              onClick={() => {
                setColor(item);
              }}
            >
              {item === color && <TagChecked className={checkedClass} />}
            </ColorItem>
          ))}
        </ColorContainer>
        <SelectFooter>
          <uikit.button
            type="primary"
            block
            onClick={() => HandleCreateNewTag(color, tagName!)}
          >
            <div className={buttonClass}>
              <CompleteText>完成创建</CompleteText>
              <PlusIcon className={enterIconClass} />
            </div>
          </uikit.button>
        </SelectFooter>
      </>
    </uikit.spin>
  );
};

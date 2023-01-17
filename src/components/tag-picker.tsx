import PlusIcon from "@/assets/add-color-tag.svg";
import Checked from "@/assets/check.svg";
import ChevronRight from "@/assets/chevron-right.svg";
import Cog from "@/assets/cog.svg";
import Plus from "@/assets/plus.svg";
import SearchSvg from "@/assets/search.svg";
import { useCtx } from "@/context";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { debounce as _debounce, get as _get } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TagCreate } from "./tag-create";
// import TagManagement from "./TagManagement";
import { Component } from "@/constants/types";
// #region 色标选择样式

const resize_ob = new MutationObserver(function (entries) {
  // since we are observing only a single element, so we access the first element in entries array

  console.log("Current Width : ", entries);
});

const TagChecked = styled.div`
  width: 16px;
  height: 100%;
  display: flex;
  position: absolute;
  right: 15px;
  top: 0;
  align-items: center;
`;

const TagItem = styled.div`
  padding: 7px 36px 7px 32px;
  position: relative;
  font-weight: normal;
  cursor: pointer;
  & > span {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  :before {
    width: 8px;
    height: 8px;
    position: absolute;
    border-radius: 50%;
    content: "";
    background-color: ${(props) => props.color};
    left: 18px;
    top: 50%;
    margin-top: -4px;
  }
  &:hover {
    background-color: #f5f7fa;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.12),
    0px 0.5px 1.5px 0px rgba(0, 0, 0, 0.08);
`;

const SelectHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 16px;
  color: rgb(32, 45, 64);
  justify-content: space-between;
  background: rgb(245, 247, 250);
  box-shadow: 0px 1px 0px 0px rgb(218, 223, 230);
  border-radius: 0px;
  padding: 5px 10px;
  margin-bottom: 1px;
`;

const SelectAction = styled.div`
  height: 40px;
  display: flex;
  color: #8592a6;
  align-items: center;
  padding: 12px 16px 12px 16px;
  cursor: pointer;
  font-size: 12px;
  justify-content: space-between;
  &:hover {
    background: rgb(245, 247, 250);
  }
  span {
    color: #202d40;
  }
`;

const plusIconClass = css`
  color: #8592a6;
  margin-right: 10px;
`;

const SelectItems = styled.div`
  max-height: 200px;
  overflow: auto;
`;

const PlusBtn = styled.div`
  width: 20px;
  height: 20px;
  line-height: 15px;
  text-align: center;
  font-size: 16px;
  color: #202d40;
  font-weight: 300;
  border: 0.5px solid #dadfe6;
  box-sizing: border-box;
  margin-right: 6px;
  margin-top: 3px;
  margin-bottom: 4px;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: #eeeeee;
  }
`;

const DropDownTriger = styled.div`
  width: 100%;
  height: 0;
  position: absolute;
  left: 0;
  bottom: 0;
`;
// #endregion

export const TagPicker: Component.TagPickerType = ({
  value,
  onChange,
  tagsList = [],
  onCreated,
  spinning,
  showFooter = true,
}) => {
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [showTagsManagement, setShowTagsManagement] = useState<boolean>(false);
  const refDropdownTriger = useRef<HTMLDivElement>(null);
  const prevPosi = useRef<number>(0);
  const [marginTop, setMarginTop] = useState(0);

  const {
    solts: { uikit },
  } = useCtx();

  useEffect(() => {
    if (!refDropdownTriger.current) return;
    const currTop = refDropdownTriger.current.getClientRects()[0].top;
    if (Math.abs(currTop - prevPosi.current) > 5) {
      setMarginTop((p) => {
        const newMarginTop = p + (currTop - prevPosi.current);
        prevPosi.current = currTop;
        return newMarginTop;
      });
    }
  }, [value]);

  const handleCreateFormClose = () => {
    setSearchKey("");
    setCreateFormVisible(false);
  };

  const handleItemClick = useCallback(
    (id: string) => {
      if (value?.includes(id)) {
        onChange?.(value.filter((colorId) => colorId !== id));
        return;
      }
      onChange?.([...value, id]);
    },
    [value]
  );

  const handleDropdownVisibleChange = (v: boolean) => {
    setSearchKey("");
    setVisible(v);
    setTimeout(() => {
      setCreateFormVisible(false);
    }, 300);
  };

  const searchInputChange = useMemo(
    () =>
      _debounce((val) => {
        setSearchKey(val);
      }, 500),
    [searchKey, tagsList]
  );

  const renderTagList = useMemo(() => {
    if (!searchKey) return tagsList;
    return tagsList.filter((d) => d?.name?.indexOf(searchKey) !== -1);
  }, [searchKey, tagsList]);

  const createText = useMemo(() => {
    if (!searchKey || renderTagList?.length) return "创建标签";
    let text = searchKey;
    if (text.length > 6) {
      text = `${searchKey.substring(0, 6)}..`;
    }
    return `创建 ${text}`;
  }, [renderTagList, searchKey]);

  const DropdownRender = () => (
    <uikit.spin spinning={spinning}>
      <SelectContainer>
        {createFormVisible === false && (
          <>
            <SelectHeader>
              <uikit.input
                size="middle"
                placeholder="快速筛选"
                suffix={<SearchSvg style={{ color: "#adbacc" }} />}
                onChange={searchInputChange}
              />
            </SelectHeader>
            <SelectItems>
              {renderTagList.map((info) => (
                <TagItem
                  key={info.id}
                  color={info.color}
                  onClick={() => {
                    handleItemClick(info.id);
                  }}
                >
                  <span title={info.name}>{info.name}</span>
                  {value?.includes(info?.id) && (
                    <TagChecked>
                      <Checked />
                    </TagChecked>
                  )}
                </TagItem>
              ))}
            </SelectItems>
            {showFooter && (
              <SelectAction
                onClick={() => {
                  setCreateFormVisible(true);
                }}
              >
                <div>
                  <Plus
                    className={plusIconClass}
                    style={{ color: "#8592a6" }}
                  />
                  {createText}
                </div>
                <PlusIcon />
              </SelectAction>
            )}
            {showFooter && (
              <SelectAction
                onClick={() => {
                  setVisible(false);
                  setShowTagsManagement(true);
                }}
              >
                <div>
                  <Cog className={plusIconClass} style={{ color: "#8592a6" }} />
                  管理标签
                </div>
                <ChevronRight style={{ color: "#8592a6" }} />
              </SelectAction>
            )}
          </>
        )}
        {createFormVisible && (
          <TagCreate
            onClose={handleCreateFormClose}
            onCreated={onCreated}
            defaultName={searchKey}
          />
        )}
      </SelectContainer>
    </uikit.spin>
  );

  return (
    <>
      <uikit.dropdown
        overlay={DropdownRender}
        visible={visible}
        onVisibleChange={handleDropdownVisibleChange}
        placement="bottomLeft"
        overlayStyle={{ marginTop: marginTop }}
      >
        <DropDownTriger ref={refDropdownTriger} />
      </uikit.dropdown>
      <PlusBtn
        onClick={() => {
          refDropdownTriger?.current?.click();
        }}
      >
        +
      </PlusBtn>
      <uikit.modal
        zIndex={2000}
        width={492}
        title={<div style={{ marginBottom: 20 }}>标签管理</div>}
        visible={showTagsManagement}
        onCancel={() => setShowTagsManagement(false)}
        onOk={() => setShowTagsManagement(false)}
      >
        {/* <TagManagement /> */}
      </uikit.modal>
    </>
  );
};

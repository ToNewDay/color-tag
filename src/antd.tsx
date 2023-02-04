import {
  ColorTag as BaseColorTag,
  IColorTagProps as IBaseColorTagProps,
} from "./components";
import {
  Modal,
  Input as InputBase,
  Button,
  Spin,
  Dropdown as DropdownBase,
} from "antd";
import "antd/dist/reset.css";
import { Context, IContext, useCtx } from "./context";
import { API } from "./constants/types";
import { TagItems } from "./components/tag-items";
import { TagPicker } from "./components/tag-picker";
import { TagManagement } from "./components/tag-management"

export interface IColorTagProps extends IBaseColorTagProps {
  /**获取 tag 列表 */
  getTagList: API.GetTagList;
  /**创建 tag */
  createTag: API.CreateTag;
  /**更新 tag */
  updateTag: API.UpdateTag;
  /**删除 tag */
  deleteTag: API.DeleteTag;
  /**dropdown 等浮层元素挂载点 */
  getRootContainer: IContext["getRootContainer"];
}

export const Dropdown: IContext["solts"]["uikit"]["dropdown"] = (props) => {
  const { getRootContainer } = useCtx();

  return (
    <DropdownBase
      getPopupContainer={getRootContainer}
      dropdownRender={props.overlay}
      trigger={["click"]}
      placement={props.placement}
      open={props.visible}
      onOpenChange={props.onVisibleChange}
      overlayStyle={props.overlayStyle}
    >
      {props?.children}
    </DropdownBase>
  );
};

export const Input: IContext["solts"]["uikit"]["input"] = (props) => {
  const { onChange, ...other } = props;
  return (
    <InputBase
      {...other}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
};

export const contextVal = {
  solts: {
    tagItems: TagItems,
    tagPicker: TagPicker,
    tagManagement: TagManagement,
    uikit: {
      button: Button as any,
      input: Input as any,
      modal: Modal as any,
      spin: Spin as any,
      dropdown: Dropdown,
    },
  },
};

/**基于 antd 作为 uikit 的 color tag 实现 */
export const ColorTag: React.FC<IColorTagProps> = (props) => {
  const {
    getTagList,
    createTag,
    updateTag,
    deleteTag,
    getRootContainer,
    ...other
  } = props;
  return (
    <Context.Provider
      value={{
        getTagList,
        createTag,
        updateTag,
        deleteTag,
        getRootContainer,
        ...contextVal,
      }}
    >
      <BaseColorTag {...other} />
    </Context.Provider>
  );
};

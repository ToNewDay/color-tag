import React, { InputHTMLAttributes } from "react";

/**
 * api interface
 */
declare namespace API {
  /**
   * api page response data
   */
  type IPageData<T> = {
    data: T[];
    count: number;
  };

  /**
   * api page query param
   */
  type IPageParam<T> = Partial<T> & {
    offset?: number;
    limit?: number;
  };

  type ITagInfo = {
    id: string;
    name: string;
    color: string;
  };
  /**
   * when param have not offset and limit ,response all data ,need  page data sturct
   */
  type GetTagList = (
    param?: IPageParam<ITagInfo>
  ) => Promise<IPageData<ITagInfo>>;

  type PostTagParam = Omit<ITagInfo, "id">;
  type CreateTag = (param: PostTagParam) => Promise<ITagInfo>;

  type UpdateTag = (id: string, param: PostTagParam) => Promise<ITagInfo>;

  type DeleteTag = (id: string) => Promise<any>;
}

/**
 * business component abstract
 */
declare namespace Component {
  type TagItemsProps = {
    value?: string[];
    onChange?: (res: string[]) => void;
    tagsList?: ITagInfo[];
    readOnly?: boolean;
  };
  type TagItemsType = React.FC<TagItemsProps>;

  type TagPickerProps = {
    value: string[];
    onChange?: (res: string[]) => void;
    tagsList?: any[];
    onCreated?: (id: string) => void;
    spinning?: boolean;
    showFooter?: boolean;
  };
  type TagPickerType = React.FC<TagPickerProps>;

  type TagManagementProps = {};

  type TagManagementType = React.FC<TagManagementProps>;
}

/**
 * base component abstract
 */
declare namespace Uikit {
  // Input
  type InputTypeProps = {
    ref?: any;
    onChange?: (val: string) => void;
    value?: string;
    size?: "middle" | "small" | "large";
    placeholder?: string;
    suffix?: React.ReactNode;
  };
  type InputType = React.FC<InputTypeProps>;

  // Button
  type ButtonTypeProps = {
    children?: React.ReactNode;
    type?: "default" | "primary";
    block?: boolean;
    onClick?: () => void;
  };
  type ButtonType = React.FC<ButtonTypeProps>;

  // Modal
  type ModalTypeProps = {
    children?: React.ReactNode;
    zIndex: number;
    width: number;
    title: React.ReactNode;
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
  };
  type ModalType = React.FC<ModalTypeProps>;

  // Spin
  type SpinTypeProps = {
    children?: React.ReactNode;
    spinning?: boolean;
  };
  type SpinType = React.FC<SpinTypeProps>;

  // Dropdown
  type DropdownProps = {
    children?: React.ReactNode;
    overlay?: React.FC<any>;
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    placement?: "topLeft" | "bottomLeft";
    overlayStyle?: React.CSSProperties;
  };
  type DropdownType = React.FC<DropdownProps>;
}

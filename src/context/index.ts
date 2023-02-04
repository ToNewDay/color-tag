import { API, Component, Uikit } from "@/constants/types";
import React, { useContext } from "react";

export interface IContext {
  getTagList: API.GetTagList;
  createTag: API.CreateTag;
  updateTag: API.UpdateTag;
  deleteTag: API.DeleteTag;
  getRootContainer?: () => HTMLElement;
  solts: {
    tagItems: Component.TagItemsType;
    tagPicker: Component.TagPickerType;
    tagManagement: Component.TagManagementType;
    uikit: {
      input: Uikit.InputType;
      button: Uikit.ButtonType;
      modal: Uikit.ModalType;
      spin: Uikit.SpinType;
      dropdown: Uikit.DropdownType;
    };
  };
}

export const Context = React.createContext<IContext>({} as any);

export const useCtx = () => {
  return useContext(Context);
};

import { TagCreate } from "@/components/tag-create";
import { TagItems } from "@/components/tag-items";
import { Context } from "@/context";
import styled from "@emotion/styled";
import { ComponentMeta } from "@storybook/react";
import { useRef, useState } from "react";
import { ColorTag, contextVal } from "../antd";

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TagCreateExpContainer = styled.div`
  width: 200px;
  background-color: white;
  margin: 60px;
`;

const COLOR_TAG_LIST: string[] = [
  "#c6c8cc",
  "#5a606b",
  "#5fd9c6",
  "#7ad94e",
  "#d98657",
  "#ffce40",
  "#ff8c40",
  "#ff5757",
  "#fe6fd4",
  "#ab6bff",
  "#4dbafd",
  "#3e70f8",
];

const TAG_LIST = COLOR_TAG_LIST.map((c, i) => ({
  id: `${i}`,
  name: `test-${i}`,
  color: c,
}));

const getTagList = () => Promise.resolve(TAG_LIST);

const createTag = (param: any) =>
  new Promise<any>((r, j) => {
    setTimeout(() => {
      r({ id: "1", name: "test", color: "#666" });
    }, 3000);
  });

export default {
  title: "Example/Antd",
  component: ColorTag,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ColorTag>;

export const ColorTagExample = () => {
  const [value, setValue] = useState<string[]>([]);
  const rootRef = useRef<HTMLDivElement>();
  return (
    <div
      ref={(d) => (rootRef.current = d!)}
      style={{
        height: 400,
        width: 200,
        position: "relative",
        margin: "20px 0 0 40px",
      }}
    >
      <ColorTag
        onChange={setValue}
        getRootContainer={() => {
          return rootRef.current!;
        }}
        getTagList={getTagList}
        createTag={createTag}
        value={value}
      />
    </div>
  );
};

export const TagItemsComponent = () => {
  return (
    <div style={{ display: "flex",padding:"20px 40px" }}>
      <TagItems tagsList={TAG_LIST} value={["1", "2", "3"]} />
    </div>
  );
};

TagItemsComponent.parameters = {
  docs: {
    description: {
      story: "单独使用 TagItems",
    },
  },
};

/**创建标签组件 */
export const TagCreateComponent = () => {
  return (
    <Context.Provider
      value={{
        getTagList,
        createTag,
        ...contextVal,
      }}
    >
      <CenterContainer>
        <TagCreateExpContainer>
          <TagCreate />
        </TagCreateExpContainer>
      </CenterContainer>
    </Context.Provider>
  );
};

TagCreateComponent.parameters = {
  docs: {
    description: {
      story: "单独使用 TagCreate",
    },
  },
};

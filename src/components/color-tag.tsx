import styled from "@emotion/styled";
import React, { useMemo } from "react";
import useSwr from "swr";

import { SWR_KEY } from "@/constants";
import { API } from "@/constants/types";
import { useCtx } from "@/context";

const ColorTagContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: flex-start;
  position: relative;
`;
export interface IColorTagProps {
  value?: any[];
  onChange?: (val: string[]) => void;
  readOnly?: boolean;
  showFooter?: boolean;
}

export const ColorTag: React.FC<IColorTagProps> = ({
  value = [],
  onChange,
  readOnly = false,
  showFooter = true,
}) => {
  const { getTagList, solts } = useCtx();

  const { data: tagsList, error } = useSwr<API.ITagInfo[]>(
    SWR_KEY.TAG_LIST,
    () => getTagList().then((d) => d.data)
  );

  const loading = useMemo(() => {
    return !tagsList && !error;
  }, [tagsList, error]);

  if (readOnly) {
    const isVal = Boolean(value?.length && value.length !== 0);
    return (
      <ColorTagContainer>
        {!isVal && <span style={{ color: "rgb(185, 193, 205)" }}>未填写</span>}
        {isVal && (
          <solts.tagItems
            readOnly
            value={value}
            onChange={onChange}
            tagsList={tagsList}
          />
        )}
      </ColorTagContainer>
    );
  }

  return (
    <ColorTagContainer>
      <solts.tagItems value={value} onChange={onChange} tagsList={tagsList} />
      <solts.tagPicker
        showFooter={showFooter}
        value={value}
        onChange={onChange}
        tagsList={tagsList}
        spinning={loading}
      />
    </ColorTagContainer>
  );
};

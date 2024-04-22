import { useEffect, useState } from "react";

import { ITextEntryProps } from "../../constants/types";
import { styled } from "styled-components";
import { useDataStore } from "../../context/DataStore";

const StyledWrapper = styled.div``;

const TextEntry = ({
  fieldKey,
  editable,
  initialValue,
  onChange,
}: ITextEntryProps) => {
  const { saveValue } = useDataStore();

  const [text, setText] = useState(initialValue ?? "");
  useEffect(() => {
    saveValue(fieldKey, text);
    onChange({ key: fieldKey, value: text });
  }, [text]);

  return (
    <StyledWrapper>
      <input
        className={`${editable ? "editable" : "disabled"}`}
        disabled={!editable}
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
    </StyledWrapper>
  );
};

export default TextEntry;

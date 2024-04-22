import { Field, Fields, IWidgetProps, WidgetType } from "../../constants/types";
import { useEffect, useState } from "react";

import Button from "./Button";
import TextEntry from "./TextEntry";
import config from "../../constants/config";
import styled from "styled-components";
import { useDataStore } from "../../context/DataStore";

const StyledWrapper = styled.div`
  padding: 1em;
`;

const Widget = ({ widget }: IWidgetProps) => {
  return (
    <StyledWrapper>
      <h1>Widget</h1>
      {widget.type === WidgetType.ListEntry && (
        <ListEntryWidget widget={widget} />
      )}
    </StyledWrapper>
  );
};

export default Widget;

const ListEntryWidget = ({ widget }: IWidgetProps) => {
  const { sessionStore, userProfile, registerNewField } = useDataStore();

  // const [fields, setFields] = useState<Fields>(widget.fields);

  // const fieldKey = registerNewField(widget.id);

  // const onChange = ({ key, value }: { key: string; value: string }) => {};
  const onButtonClick = () => {
    registerNewField(widget.id);
  };

  console.log("Widget Render Fields", widget.fields);
  return (
    <div>
      {widget.fields?.map((field) => (
        <TextEntry
          key={field.key}
          fieldKey={field.key}
          initialValue={field.value}
          editable={true}
          // onChange={onChange}
        />
      ))}
      <Button text={"Add Row"} onClick={onButtonClick} />
    </div>
  );
};

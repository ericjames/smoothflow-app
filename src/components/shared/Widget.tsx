import { Field, IWidgetProps, WidgetType } from "../../constants/types";

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
  const { generateFieldKey } = useDataStore();

  const fieldKey = generateFieldKey(widget.id);

  const onChange = ({ key, value }: Field) => {

    
  };

  console.log("WIDGET", widget);
  return (
    <div>
      <TextEntry
        fieldKey={fieldKey}
        editable={true}
        initialValue={""}
        onChange={onChange}
      />

      {widget.fields?.map((field) => (
        <TextEntry
          key={field.key}
          fieldKey={field.key}
          initialValue={field.value}
          editable={true}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

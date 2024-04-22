import { IBlockProps } from "../../constants/types";
import Widget from "./Widget";
import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 1em;
  background: ${(props) => props.theme.blockbg};
`;

const Block = ({ block }: IBlockProps) => {
  return (
    <StyledWrapper>
      <h1>Block</h1>
      {block.widgets.map((widget, key) => (
        <Widget key={key} widget={widget} />
      ))}
    </StyledWrapper>
  );
};
export default Block;

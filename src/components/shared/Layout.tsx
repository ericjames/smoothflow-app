import Block from "./Block";
import { LayoutProps } from "../../constants/types";
import TextEntry from "./TextEntry";
import { styled } from "styled-components";

const StyledWrapper = styled.main`
  display: flex;
  place-content: center;
  place-items: center;
  min-height: 80vh;
  width: 100%;
`;

const Layout = ({ blocks }: LayoutProps) => {
  return (
    <StyledWrapper>
      {blocks.map((block, i) => (
        <Block block={block} key={i} />
      ))}
    </StyledWrapper>
  );
};

export default Layout;

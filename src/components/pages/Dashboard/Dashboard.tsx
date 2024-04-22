import Layout from "../../shared/Layout";
import { LayoutProps } from "../../../constants/types";
import TextEntry from "../../shared/TextEntry";
import config from "../../../constants/config";
import { styled } from "styled-components";
import { useDataStore } from "../../../context/DataStore";
import { useEffect } from "react";

const StyledWrapper = styled.section`
  width: 1200px;
  margin: auto;
  padding: 2em;
`;

const Dashboard = ({ blocks }: LayoutProps) => {
  return (
    <StyledWrapper>
      <h1>Dashboard</h1>
      <Layout blocks={blocks} />
    </StyledWrapper>
  );
};

export default Dashboard;

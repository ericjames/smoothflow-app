import {
  Block,
  Blocks,
  Field,
  Fields,
  Layouts,
  SessionStore,
  UserProfile,
  Widget,
  WidgetType,
  Widgets,
} from "../../constants/types";
import { useEffect, useState } from "react";

import Dashboard from "../pages/Dashboard/Dashboard";
import { ThemeProvider } from "styled-components";
import config from "../../constants/config";
import { styled } from "styled-components";
import theme from "../../constants/theme";
import { useDataStore } from "../../context/DataStore";

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
`;

const App = () => {
  const { userProfile, setNewDataStore, sessionStore } = useDataStore();
  const [appLayouts, setAppLayouts] = useState<Layouts | null>(null);

  useEffect(() => {
    console.log("userProfile?", userProfile);
    if (!userProfile) {
      setNewDataStore(config.dataStore.user1, {});
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      const layouts = getAppLayouts(userProfile, sessionStore);
      if (layouts) {
        setAppLayouts(layouts);
      }
    }
  }, [userProfile]);
  console.log("appLayouts", appLayouts);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        {appLayouts?.map((layout, i) => {
          if (layout.componentName === "Dashboard") {
            return <Dashboard key={i} blocks={layout.blocks} />;
          }
          return null;
        })}
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;

// This data mapping should only ever happen in App.tsx
const getAppLayouts = (
  userProfile: UserProfile,
  sessionStore: SessionStore | null
): Layouts => {
  // Convert schema into usable UI types
  const layoutSchema = userProfile.layouts;
  const blockSchema = userProfile.blocks;
  const widgetSchema = userProfile.widgets;

  const fields: Fields | null =
    sessionStore &&
    Object.entries(sessionStore).map(
      ([key, value]) =>
        ({
          key: value,
        } as Field)
    );

  const widgets: Widgets = widgetSchema.map(
    (widget) =>
      ({
        id: 1,
        type: WidgetType.ListEntry,
        fields:
          fields?.filter(
            ({ key, value }) => widget.fieldKeys.indexOf(key) !== -1
          ) ?? [],
      } as Widget)
  );

  const blocksWithWidgets: Blocks = blockSchema.map(
    (block) =>
      ({
        id: block.id,
        order: 1,
        widgets: widgets.filter((widget) =>
          block.widgetIds.find((id) => widget.id === id)
        ),
      } as Block)
  );

  const appLayouts: Layouts = layoutSchema.map((layout) => ({
    id: 1,
    componentName: layout.componentName,
    blocks: blocksWithWidgets,
  }));

  return appLayouts;
};

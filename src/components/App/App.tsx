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

const Debug = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 200px;
  width: 500px;
  overflow-wrap: break-word;
  color: ${(props) => props.theme.text};
`;

const App = () => {
  const { userProfile, setNewDataStore, sessionStore } = useDataStore();
  const [appLayouts, setAppLayouts] = useState<Layouts | null>(null);

  // Upon loading of a successful user profile we can load the app data
  useEffect(() => {
    if (userProfile && sessionStore) {
      console.log("useEffect userProfile?", userProfile);
      const layouts = getAppLayouts(userProfile, sessionStore);
      if (layouts) {
        setAppLayouts(layouts);
      }
    }
  }, [userProfile, sessionStore]);

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
      <Debug>
        {JSON.stringify(userProfile)}
        <br />
        {JSON.stringify(sessionStore)}
      </Debug>
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
          key,
          value,
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

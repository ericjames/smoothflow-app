import "./index.css";

import App from "./components/App/App";
import { DataStoreProvider } from "./context/DataStore";
import React from "react";
import ReactDOM from "react-dom/client";
import config from "./constants/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
    <DataStoreProvider storeId={config.dataStore.id}>
      <App />
    </DataStoreProvider>
  // </React.StrictMode>
);

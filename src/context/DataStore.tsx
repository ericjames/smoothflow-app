import { IDataStoreContext, SessionStore, UserProfile } from "../constants/types";
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import config from "../constants/config";
import helpers from "./helpers";

const DataStoreContext = createContext<IDataStoreContext | undefined>({
  userProfile: null,
  sessionStore: null,
  setNewDataStore: () => {},
  saveValue: () => {
    return false;
  },
  getValue: () => {
    return "";
  },
  generateFieldKey: () => {
    return "";
  },
});
// const DataStoreContext = createContext<IDataStoreContext | null>(null);

interface ProviderProps {
  storeId: string;
  children: any;
}

// This data store provider is agnostic to the data modeling
// It is on UI components to synchronize data
export const DataStoreProvider = ({ storeId, children }: ProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionStore, setSessionStore] = useState<SessionStore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userProfileId = storeId + "user";
  const sessionStoreId = storeId + "store";

  useEffect(() => {
    if (storeId) {
      try {
        const userProfile = localStorage.getItem(userProfileId);
        const sessionStore = localStorage.getItem(sessionStoreId);
        console.log("startup data store", userProfile, sessionStore);
        if (userProfile) {
          const json = JSON.parse(userProfile);
          if (json) {
            setUserProfile(json);
          }
        }
      } catch (e) {
        setError(`${e}`);
      }
    }
    return () => {};
  }, []);

  const generateFieldKey = (widgetId: number) => {
    const wPrefix = config.dataStore.widgetIdPrefix;
    const fPrefix = config.dataStore.fieldIdPrefix;
    const wfKey = `${wPrefix}${widgetId}`;

    const keys = sessionStore && Object.keys(sessionStore);
    const wKeys = keys?.filter((key) => key.indexOf(wfKey) !== -1);

    if (wKeys && wKeys.length > 0) {
      const ids = wKeys
        .map((key) =>
          parseFloat(key.replace(config.dataStore.regexForFieldId, ""))
        )
        .sort();
      const newId = ids[ids.length] + 1;
      console.log("add field key", sessionStore, ids, newId);
      return `${wPrefix}${widgetId}${fPrefix}${newId}`;
    }
    return `${wPrefix}${widgetId}${fPrefix}${1}`;
  };

  const setNewDataStore = (
    userProfile: UserProfile,
    sessionStore: SessionStore
  ) => {
    setUserProfile(userProfile);
    saveAllData(userProfile, sessionStore);
  };

  const saveAllData = (
    userProfile: UserProfile,
    sessionStore: SessionStore
  ) => {
    localStorage.setItem(userProfileId, JSON.stringify(userProfile));
    localStorage.setItem(sessionStoreId, JSON.stringify(sessionStore));
    return true;
  };

  const saveValue = (key: string, value: string): boolean => {
    if (sessionStore) {
      sessionStore[key] = value;
      localStorage.setItem(sessionStoreId, JSON.stringify(sessionStore));
      return true;
    }
    return false;
  };

  const getValue = (key: string) => {
    if (sessionStore && sessionStore[key]) {
      return sessionStore[key];
    }
  };

  const purgeData = () => {
    localStorage.clear();
  };

  const deleteData = (key: string) => {
    if (sessionStore && sessionStore[key]) {
      const change = sessionStore[key];
      delete change[key];
      localStorage.setItem(storeId, JSON.stringify(change));
    }
  };

  return (
    <DataStoreContext.Provider
      value={{
        userProfile,
        sessionStore,
        setNewDataStore,
        saveValue,
        getValue,
        generateFieldKey,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  const context = useContext(DataStoreContext);
  if (context === undefined) {
    throw new Error("context not avail");
  }
  return context;
};

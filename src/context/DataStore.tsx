import {
  IDataStoreContext,
  SessionStore,
  UserProfile,
} from "../constants/types";
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
  registerNewField: () => {
    return "";
  },
});
// const DataStoreContext = createContext<IDataStoreContext | null>(null);

interface ProviderProps {
  storeId: string;
  children: any;
}

export const DataStoreProvider = ({ storeId, children }: ProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionStore, setSessionStore] = useState<SessionStore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userProfileId = storeId + "user";
  const sessionStoreId = storeId + "store";

  useEffect(() => {
    if (storeId) {
      try {
        const dataUserProfile = localStorage.getItem(userProfileId);
        if (dataUserProfile) {
          setJSONData(dataUserProfile, setUserProfile);
          const dataSessionStore = localStorage.getItem(sessionStoreId);
          setJSONData(dataSessionStore, setSessionStore);
        } else {
          setNewDataStore(config.dataStore.user1, {});
        }
      } catch (e) {
        setError(`${e}`);
      }
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log("Save to DB");
    if (userProfile && sessionStore) {
      console.log("With", userProfile, sessionStore);
      saveAllData(userProfile, sessionStore);
    }
  });

  const setJSONData = (
    jsonString: string | null,
    setState: SetStateAction<any>
  ) => {
    if (jsonString) {
      const json = JSON.parse(jsonString);
      setState(json);
    }
  };

  const saveFieldKeyToWidget = (fieldKey: string, widgetId: number) => {
    const w = userProfile?.widgets.find((widget) => widget.id === widgetId);
    if (w?.fieldKeys.indexOf(fieldKey) === -1) {
      w?.fieldKeys.push(fieldKey);
    }
    setUserProfile(userProfile);
  };

  const registerNewField = (widgetId: number) => {
    const fieldKey = generateFieldKey(widgetId);
    saveFieldKeyToWidget(fieldKey, widgetId);
    saveValue(fieldKey, "");
    return fieldKey;
  };

  const setNewDataStore = (
    userProfile: UserProfile,
    sessionStore: SessionStore
  ) => {
    setUserProfile(userProfile);
    setSessionStore(sessionStore);
  };

  const saveAllData = (
    userProfile: UserProfile,
    sessionStore: SessionStore
  ) => {
    localStorage.setItem(userProfileId, JSON.stringify(userProfile));
    localStorage.setItem(sessionStoreId, JSON.stringify(sessionStore));
  };

  const saveValue = (fieldKey: string, value: string): boolean => {
    if (sessionStore) {
      const newStore = { ...sessionStore };
      newStore[fieldKey] = value;
      setSessionStore(newStore);
      console.log("saveValue", sessionStore, newStore, fieldKey, value);
      // localStorage.setItem(sessionStoreId, JSON.stringify(sessionStore));
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

  const generateFieldKey = (widgetId: number) => {
    const wPrefix = config.dataStore.widgetIdPrefix;
    const fPrefix = config.dataStore.fieldIdPrefix;
    const wfKey = `${wPrefix}${widgetId}`;

    const keys = sessionStore && Object.keys(sessionStore);
    const wKeys = keys?.filter((key) => key.indexOf(wfKey) !== -1);

    if (wKeys && wKeys.length > 0) {
      const ids = wKeys
        .map((key) => {
          const num = key.replace(config.dataStore.regexForFieldId, "");
          console.log("TEST1", num);
          const int = parseFloat(num);
          console.log("TEST2", int);
          return int;
        })
        .sort();
      const newId = ids[ids.length - 1] + 1;
      console.log("add field key", sessionStore, ids, newId);
      return `${wPrefix}${widgetId}${fPrefix}${newId}`;
    }
    return `${wPrefix}${widgetId}${fPrefix}${1}`;
  };

  return (
    <DataStoreContext.Provider
      value={{
        userProfile,
        sessionStore,
        setNewDataStore,
        saveValue,
        getValue,
        registerNewField,
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

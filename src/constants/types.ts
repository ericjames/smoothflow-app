// Modeling

/* A page has
 * Layout that contains
 * - Blocks that contains any kind of
 * -- Widget of multiple WidgetTypes
 * --- WidgetTypes: ListEntry | ...
 *
 * You could have multiple pages and therefore Layouts
 *
 */

// Enums
export enum WidgetType {
  ListEntry = "ListEntry",
}

// Types
export type Layouts = Array<Layout>;
export type Blocks = Array<Block>;
export type Widgets = Array<Widget>;
export type Fields = Array<Field>;

// Interfaces

// Data Interfaces

// export interface DataImport {
//   user: any;
//   layouts: Array<Layouts>;
//   widgets: Array<Widget>;
// }

export interface UserProfile {
  id: number;
  layouts: Array<LayoutSchema>;
  blocks: Array<BlockSchema>;
  widgets: Array<WidgetSchema>;
}

export interface LayoutSchema {
  id: number;
  blockIds: Array<number>;
  componentName: string;
}

export interface BlockSchema {
  id: number;
  widgetIds: Array<number>;
}

export interface WidgetSchema {
  id: number;
  type: WidgetType;
  fieldKeys: Array<string>;
}

export interface FieldSchema {
  key: string;
  value: string;
}

// Our "database" is json with key: value
// Stores single values like Fields
export interface SessionStore {
  [key: string]: any[string];
}

export interface IDataStoreContext {
  userProfile: UserProfile | null;
  sessionStore: SessionStore | null;
  setNewDataStore: (
    userProfile: UserProfile,
    sessionStore: SessionStore
  ) => void | null;
  saveValue: (key: string, value: string) => boolean;
  getValue: (key: string) => string;
  generateFieldKey: (widgetId: number) => string;
}

// UI Interfaces

export interface Layout {
  id: number;
  componentName: string;
  blocks: Blocks;
}

export interface Block {
  id: number;
  order: number;
  widgets: Widgets;
}

export interface Widget {
  id: number;
  type: WidgetType;
  fields: Fields;
}

export interface Field {
  key: string;
  value: string;
}

// Props

export interface ITextEntryProps {
  fieldKey: string;
  initialValue: string;
  editable: boolean;
  onChange: (field: Field) => void;
}

export interface LayoutProps {
  blocks: Blocks;
}

export interface IBlockProps {
  block: Block;
}

export interface IWidgetProps {
  widget: Widget;
}

// Reusables

type AnyKeyValue = {
  [key: string]: any[string];
};
type DispatchAction = React.Dispatch<React.SetStateAction<SessionStore>> | null;

import {
  UserProfile,
  WidgetType,
  BlockSchema,
  WidgetSchema,
  LayoutSchema,
} from "./types";

export default {
  dataStore: {
    id: "_smoothflow",
    widgetIdPrefix: "_w",
    fieldIdPrefix: "_f",
    regexForFieldId: /^(_w)(\d)+(_f)/,

    user1: <UserProfile>{
      layouts: <Array<LayoutSchema>>[
        { id: 1, blockIds: [1], componentName: "Dashboard" },
      ],
      blocks: <Array<BlockSchema>>[{ id: 1, widgetIds: [1] }],
      widgets: <Array<WidgetSchema>>[
        { id: 1, type: WidgetType.ListEntry, fieldKeys: [] },
      ],
    },
  },
};

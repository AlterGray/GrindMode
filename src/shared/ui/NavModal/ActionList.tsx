import React from "react";

import { IoniconsName } from "@shared/types/commonTypes";

import NavModalListItem from "./NavModalListItem";

// TODO move to separate file
export type Action = {
  title: string;
  onPress: () => void;
  iconName?: IoniconsName;
  iconColor?: string;
  isMarked?: boolean;
};

type ListItemProps = {
  title: string;
  onPress: () => void;
  iconName?: IoniconsName;
  iconColor?: string;
  isMarked?: boolean;
};

type ActionListProps = {
  actions: Action[];
  CustomListItem?: React.ComponentType<ListItemProps>;
};

// TODO make same with other components which take custom component
const ActionList: React.FC<ActionListProps> = ({ actions, CustomListItem }) => (
  <>
    {actions.map((action) =>
      CustomListItem ? (
        <CustomListItem
          key={action.title}
          onPress={action.onPress}
          iconName={action.iconName}
          iconColor={action.iconColor}
          title={action.title}
        />
      ) : (
        <NavModalListItem
          key={action.title}
          onPress={action.onPress}
          iconName={action.iconName}
          iconColor={action.iconColor}
          title={action.title}
          isMarked={action.isMarked}
        />
      ),
    )}
  </>
);

export default ActionList;

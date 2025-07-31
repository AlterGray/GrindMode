import React, { ReactNode, memo } from "react";
import { FlatList } from "react-native";

import { useRouter } from "expo-router";

import { useFolderStore } from "@features/folder/folderStore";

import { ROUTES } from "@shared/constants/routes";
import { useNavigationFocus } from "@shared/hooks/useNavigationFocus";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import StyledButton from "@shared/ui/StyledButton";

import NoItemsInList from "./NoItemsInList";
import StyledItem from "./StyledItem";
import { ItemData } from "./types";

type StyledListProps = {
  // change to status?
  isSelecting: boolean;
  onPress: (id: string) => void;
  data: ItemData[];
  renderContent?: (item: ItemData) => ReactNode;
  noItemsText?: string;
  toggleItem: (itemId: string) => void;
};

const StyledList: React.FC<StyledListProps> = ({
  isSelecting,
  onPress,
  toggleItem,
  data,
  renderContent = null,
  noItemsText = i18n.t("noItemsYet") ?? "",
}) => {
  const isNavigating = useNavigationFocus();
  const router = useRouter();
  const selectedFolderId = useFolderStore((state) => state.selectedId);

  const backgroundColor = useThemeColors("background");

  const handleItemAction = (itemId: string, isLongPress: boolean) => {
    if (isNavigating) return;

    if (isLongPress || isSelecting) toggleItem(itemId);
    else onPress?.(itemId);
  };

  const renderItemComponent = ({ item }: { item: ItemData }) => {
    return (
      <StyledItem
        item={item}
        onLongPress={() => handleItemAction(item.id, true)}
        onPress={() => handleItemAction(item.id, false)}
      >
        {renderContent ? (
          renderContent(item)
        ) : (
          // TODO improve it to show correctly selected items
          <AnimatedThemedText>{item.title}</AnimatedThemedText>
        )}
      </StyledItem>
    );
  };

  if (data.length === 0) {
    return (
      <NoItemsInList
        text={noItemsText}
        actionButton={
          <StyledButton
            title={i18n.t("createNewOne")}
            onPress={() => {
              router.push({
                pathname: ROUTES.RITUALS_CREATE,
                params: { folderId: selectedFolderId },
              }); // pass id of folder
            }}
          />
        }
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item: ItemData) => item.id}
      renderItem={renderItemComponent}
      className={`w-full ${backgroundColor}`}
    />
  );
};

export default memo(StyledList);

import React from "react";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import StyledInput from "@shared/ui/StyledInput";

const TitleSection = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (val: string) => void;
}) => (
  <StyledInput
    placeholder={i18n.t("ritualText")}
    value={title}
    onChangeText={setTitle}
    autoFocus
  />
);

export default TitleSection;

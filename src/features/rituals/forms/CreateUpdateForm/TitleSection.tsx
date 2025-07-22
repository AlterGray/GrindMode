import React from "react";

import StyledInput from "@shared/ui/StyledInput";

const TitleSection = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (val: string) => void;
}) => (
  <StyledInput
    placeholder="Ritual Title"
    value={title}
    onChangeText={setTitle}
    autoFocus
  />
);

export default TitleSection;

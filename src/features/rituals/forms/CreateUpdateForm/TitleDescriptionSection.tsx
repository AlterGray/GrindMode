import React from "react";

import StyledInput from "@shared/ui/StyledInput";

const TitleDescriptionSection = ({
  title,
  setTitle,
  description,
  setDescription,
}: {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
}) => (
  <>
    <StyledInput
      placeholder="Ritual Title"
      value={title}
      onChangeText={setTitle}
      autoFocus
    />
    <StyledInput
      placeholder="Description (optional)"
      value={description}
      onChangeText={setDescription}
      multiline
      numberOfLines={8}
    />
  </>
);

export default TitleDescriptionSection;

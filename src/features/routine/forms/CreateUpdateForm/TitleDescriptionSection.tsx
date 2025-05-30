import StyledInput from "@ui/StyledInput";
import React from "react";

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
      placeholder="Routine Title"
      value={title}
      onChangeText={setTitle}
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

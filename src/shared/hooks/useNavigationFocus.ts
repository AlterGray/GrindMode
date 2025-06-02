import { useRef } from "react";

import { useFocusEffect } from "expo-router";

export const useNavigationFocus = () => {
  const isNavigatingRef = useRef(false);
  useFocusEffect(() => {
    isNavigatingRef.current = false;
    return () => (isNavigatingRef.current = true);
  });

  return isNavigatingRef.current;
};

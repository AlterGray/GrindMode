import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";

import { AnimatedRect } from "../AnimatedComponents/AnimatedSvgs";

type BackgroundSegmentsProps = {
  width: number;
  height: number;
  radius: number;
  backgroundColorOpacity: number;
};

const BackgroundSegments: React.FC<BackgroundSegmentsProps> = ({
  width,
  height,
  radius,
  backgroundColorOpacity,
}) => {
  const backgroundColorFillProps = useAnimatedSvgColor("background", "fill");

  return (
    <AnimatedRect
      x={0}
      y={0}
      width={width}
      height={height}
      rx={radius}
      ry={radius}
      animatedProps={backgroundColorFillProps}
      fillOpacity={backgroundColorOpacity}
    />
  );
};

export default BackgroundSegments;

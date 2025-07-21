import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";

import { AnimatedPath } from "../AnimatedComponents/AnimatedSvgs";
import { createSegmentPath } from "./utils";

type BackgroundSegmentsProps = {
  total: number;
  doneCount: number;
  highlightedSet: Set<number>;
  segmentWidth: number;
  height: number;
  radius: number;
  backgroundColorOpacity: number;
};

const BackgroundSegments: React.FC<BackgroundSegmentsProps> = ({
  total,
  doneCount,
  highlightedSet,
  segmentWidth,
  height,
  radius,
  backgroundColorOpacity,
}) => {
  const backgroundColorFillProps = useAnimatedSvgColor("background", "fill");

  return (
    <>
      {Array.from({ length: total }).map((_, i) => {
        const isHighlighted = highlightedSet.has(i);
        const scale = isHighlighted ? 0.85 : 1;
        const x = i * segmentWidth;
        const translateX = x + segmentWidth / 2;
        const translateY = height / 2;

        const transform = `
            translate(${translateX} ${translateY})
            scale(${scale})
            translate(${-translateX} ${-translateY})
          `;

        return (
          <AnimatedPath
            key={`bg-${i}`}
            d={createSegmentPath(i, segmentWidth, height, radius, total)}
            animatedProps={backgroundColorFillProps}
            opacity={
              !isHighlighted && i >= doneCount ? backgroundColorOpacity : 1
            }
            transform={transform}
          />
        );
      })}
    </>
  );
};

export default BackgroundSegments;

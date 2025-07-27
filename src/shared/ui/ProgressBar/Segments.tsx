import { AnimatedLine, AnimatedPath } from "../AnimatedComponents/AnimatedSvgs";
import { calcSegments } from "./utils";

type SegmentProps = {
  total: number;
  doneCount: number;
  highlightedSet: Set<number>;
  segmentWidth: number;
  height: number;
  separatorWidth: number;
  showSeparators: boolean;
  separatorColorFillProps: Partial<{ stroke: string }>;
  animatedPaths: Partial<{ d: string; fill: string; opacity: number }>[];
  isDiff: boolean;
};

const Segment: React.FC<SegmentProps> = ({
  total,
  doneCount,
  highlightedSet,
  segmentWidth,
  height,
  separatorWidth,
  showSeparators,
  separatorColorFillProps,
  animatedPaths,
}) => {
  const segments = () => {
    if (total === 0) return [];

    const segmentsCount = calcSegments(doneCount, Array.from(highlightedSet));

    return Array.from({ length: segmentsCount.length }).map((_, i) => {
      return <AnimatedPath key={i} animatedProps={animatedPaths[i]} />;
    });
  };

  return (
    <>
      {segments()}

      {showSeparators &&
        Array.from({ length: total - 1 }).map((_, i) => {
          const x = segmentWidth * (i + 1);
          return (
            <AnimatedLine
              key={`sep-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={height}
              strokeWidth={separatorWidth}
              animatedProps={separatorColorFillProps}
            />
          );
        })}
    </>
  );
};

export default Segment;

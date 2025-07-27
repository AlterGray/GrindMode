import { AnimatedLine, AnimatedPath } from "../AnimatedComponents/AnimatedSvgs";
import { calcSegments, createRoundedPath } from "./utils";

type SegmentProps = {
  total: number;
  doneCount: number;
  highlightedSet: Set<number>;
  segmentWidth: number;
  height: number;
  radius: number;
  separatorWidth: number;
  showSeparators: boolean;
  separatorColorFillProps: Partial<{ stroke: string }>;
  bouncedPathProps: Partial<{ d: string; fill: string }>;
  pathProps: {
    done: Partial<{ fill: string }>;
    missed: Partial<{ fill: string; opacity: number }>;
  };
  isDiff: boolean;
};

const Segment: React.FC<SegmentProps> = ({
  total,
  doneCount,
  highlightedSet,
  segmentWidth,
  height,
  radius,
  separatorWidth,
  showSeparators,
  separatorColorFillProps,
  bouncedPathProps,
  pathProps,
}) => {
  const segments = () => {
    if (total === 0) return [];

    const segmentsCount = calcSegments(doneCount, Array.from(highlightedSet));

    return Array.from({ length: segmentsCount.length }).map((_, i) => {
      if (i === segmentsCount.length - 1) {
        return <AnimatedPath key={i} animatedProps={bouncedPathProps} />;
      }

      return (
        <AnimatedPath
          key={i}
          d={createRoundedPath({
            x: segmentWidth * segmentsCount[i].start,
            width:
              segmentWidth * (segmentsCount[i].end - segmentsCount[i].start),
            height,
            radius,
            roundLeft: segmentsCount[i].start === 0,
            roundRight: segmentsCount[i].end === total,
          })}
          animatedProps={
            segmentsCount[i].type === "done" ? pathProps.done : pathProps.missed
          }
        />
      );
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

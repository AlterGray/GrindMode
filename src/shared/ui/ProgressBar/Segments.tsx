import { AnimatedLine, AnimatedPath } from "../AnimatedComponents/AnimatedSvgs";

type SegmentProps = {
  total: number;
  doneCount: number;
  highlightedSet: Set<number>;
  segmentWidth: number;
  height: number;
  animatedPaths: any[];
  separatorWidth: number;
  showSeparators: boolean;
  separatorColorFillProps: Partial<{ stroke: string }>;
};

const Segment: React.FC<SegmentProps> = ({
  total,
  doneCount,
  highlightedSet,
  segmentWidth,
  height,
  animatedPaths,
  separatorWidth,
  showSeparators,
  separatorColorFillProps,
}) => {
  return (
    <>
      {Array.from({ length: total }).map((_, i) => {
        if (i >= doneCount) return null;

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
            key={`fg-${i}`}
            animatedProps={animatedPaths[i]}
            transform={transform}
          />
        );
      })}

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

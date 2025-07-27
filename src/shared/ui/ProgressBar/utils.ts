export const createSegmentPath = (
  index: number,
  nwidth: number,
  nheight: number,
  radius: number,
  total: number,
) => {
  "worklet";
  const x = index * nwidth;
  const w = nwidth;
  const h = nheight;

  if (index === 0) {
    return `
          M ${x + radius},0
          H ${x + w}
          V ${h}
          H ${x + radius}
          A ${radius},${radius} 0 0 1 ${x},${h - radius}
          V ${radius}
          A ${radius},${radius} 0 0 1 ${x + radius},0
          Z
        `;
  } else if (index === total - 1) {
    return `
          M ${x},0
          H ${x + w - radius}
          A ${radius},${radius} 0 0 1 ${x + w},${radius}
          V ${h - radius}
          A ${radius},${radius} 0 0 1 ${x + w - radius},${h}
          H ${x}
          Z
        `;
  } else {
    return `
          M ${x},0
          H ${x + w}
          V ${h}
          H ${x}
          Z
        `;
  }
};

export const calcSegments = (
  doneCount: number,
  highlightedIndexes: number[],
) => {
  let segmentObjs: {
    start: number;
    end: number;
    type: "done" | "missed";
  }[] = [];

  const lastIndex = highlightedIndexes[highlightedIndexes.length - 1];
  highlightedIndexes.forEach((i) => {
    const prevIndex =
      highlightedIndexes[i - 1] !== undefined
        ? highlightedIndexes[i - 1] - 1
        : 0;
    // if (i !== lastIndex) {
    segmentObjs.push({
      start: prevIndex,
      end: i,
      type: "done",
    });
    segmentObjs.push({
      start: i,
      end: i + 1,
      type: "missed",
    });
    // } else {

    if (i === lastIndex && i !== doneCount) {
      segmentObjs.push({
        start: i + 1,
        end: doneCount,
        type: "done",
      });
    }
    // }
  });

  if (highlightedIndexes.length === 0) {
    segmentObjs.push({
      start: 0,
      end: doneCount,
      type: "done",
    });
  } else if (doneCount === highlightedIndexes.length) {
    segmentObjs.push({
      start: 0,
      end: doneCount - 1,
      type: "missed",
    });
  }

  return segmentObjs;
};

export const createRoundedPath = ({
  x,
  y = 0,
  width,
  height,
  radius = 6,
  roundLeft = false,
  roundRight = false,
}: {
  x: number;
  y?: number;
  width: number;
  height: number;
  radius?: number;
  roundLeft?: boolean;
  roundRight?: boolean;
}) => {
  "worklet";
  const r = Math.min(radius, height / 2, width / 2);
  const right = x + width;
  const bottom = y + height;

  const topStart = roundLeft ? x + r : x;
  const topEnd = roundRight ? right - r : right;
  const bottomStart = roundRight ? right - r : right;
  const bottomEnd = roundLeft ? x + r : x;

  const path = [`M${topStart},${y}`];

  // Top line
  path.push(`H${topEnd}`);

  // Top-right corner
  if (roundRight) {
    path.push(`A${r},${r} 0 0 1 ${right},${y + r}`);
  }

  // Right side
  path.push(`V${bottom - (roundRight ? r : 0)}`);

  // Bottom-right corner
  if (roundRight) {
    path.push(`A${r},${r} 0 0 1 ${right - r},${bottom}`);
  }

  // Bottom line
  path.push(`H${bottomEnd}`);

  // Bottom-left corner
  if (roundLeft) {
    path.push(`A${r},${r} 0 0 1 ${x},${bottom - r}`);
  }

  // Left side
  path.push(`V${y + (roundLeft ? r : 0)}`);

  // Top-left corner
  if (roundLeft) {
    path.push(`A${r},${r} 0 0 1 ${x + r},${y}`);
  }

  path.push("Z");
  return path.join(" ");
};

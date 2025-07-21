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

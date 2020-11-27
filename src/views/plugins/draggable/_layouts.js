// layout is an array of objects
const layoutXl = [
  { i: "a", x: 0, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
  { i: "b", x: 1, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
];
const layoutLg = [
  { i: "a", x: 0, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
  { i: "b", x: 1, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
];
const layoutMd = [
  { i: "a", x: 0, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
  { i: "b", x: 1, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
];
const layoutSm = [
  { i: "a", x: 0, y: 0, w: 1, h: 5, minH: 5, maxH: 5 },
  { i: "b", x: 0, y: 1, w: 1, h: 5, minH: 5, maxH: 5 },
];

const layouts = {
  xl: layoutXl,
  lg: layoutLg,
  md: layoutMd,
  sm: layoutMd,
  xs: layoutSm,
};

export default layouts;

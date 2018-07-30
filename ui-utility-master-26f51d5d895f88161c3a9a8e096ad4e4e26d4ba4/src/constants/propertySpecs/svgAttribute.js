import {
  // ANY,
  // ARRAY,
  BOOLEAN,
  // ELEMENT,
  ENUM,
  // FUNCTION,
  // NODE,
  NUMBER,
  // OBJECT,
  // PROPTYPES,
  STRING,
  // UNION,
  // VALIDATELABEL,
} from '../propertyTypes';
/**
 * all svg attribute, but they just for some svg element using
 * remove undefined and flexible value
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */
export default {
  accentHeight: NUMBER, // <font-face>
  accumulate: ENUM, // <animate> <animatecolor> <animatemotion> <animatetransform>
  additive: ENUM, // <animate> <animatecolor> <animatemotion> <animatetransform>
  alignmentBaseline: ENUM, // <tspan> <tref> <altGlyph> <textPath>
  ascent: NUMBER, // <font-face>
  attributeName: STRING, // <animate> <animatecolor> <animatetransform> <set>
  attributeType: ENUM, // <animate> <animatecolor> <animatetransform> <set>
  azimuth: NUMBER, // <fedistantlight>
  baseFrequency: NUMBER, // <feturbulence>
  baselineShift: ENUM, // <tspan> <tref> <altGlyph> <textPath>
  begin: STRING, // Animation elements
  bias: NUMBER, // <feconvolvematrix>
  calcMode: ENUM, // <animate> <animatecolor> <animatemotion> <animatetransform>
  class: STRING, // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/class
  clip: STRING, // <svg> <symbol> <image> <foreignobject> <pattern> <marker>
  clipPathUnits: ENUM, // <clippath>
  clipPath: STRING, // <clipPath>
  clipRule: ENUM, // <clipPath>
  color: STRING,
  /*
  Text content elements »
  Shape elements »
  <stop>
  <feflood>
  <fediffuselighting>
  <fespecularlighting>
   */
  colorInterpolation: ENUM, // Containers elements » Graphics elements » <animate> <animateColor>
  colorInterpolationFilters: ENUM, // Filter primitive elements »
  colorProfile: ENUM, // <image>
  colorRendering: ENUM, // Containers elements » Graphics elements » <animate> <animatecolor>
  contentScriptType: STRING,
  contentStyleType: STRING,
  cursor: ENUM, // Container elements » Graphics elements »
  cx: NUMBER, // <circle> <ellipse> <radialgradient>
  cy: NUMBER, // <circle> <ellipse> <radialgradient>
  d: STRING, // <path> <glyph>
  diffuseConstant: NUMBER, // <fediffuselighting>
  direction: ENUM, // Text content elements »
  display: ENUM,
  /*
  Graphics elements »
  Text content elements »
  <svg>
  <g>
  <switch>
  <a>
  <foreignobject>
   */
  divisor: NUMBER, // <fconvolvematrix>
  dominantBaseline: ENUM, // Text content elements »
  dur: STRING, // Animation elements »
  dx: NUMBER, // <altGlyph> <feOffset> <glyphRef> <text> <tref> <tspan>
  dy: NUMBER, // <altGlyph> <feOffset> <glyphRef> <text> <tref> <tspan>
  edgeMode: ENUM, // <feconvolvematrix>
  elevation: NUMBER, // <fedistantlight>
  end: NUMBER, // Animation elements »
  externalResourcesRequired: BOOLEAN,
  /*
  Animation elements »
  Gradient elements »
  Graphics elements »
  Text content elements »
  Structural elements »
  <a>
  <clippath>
  <cursor>
  <feimage>
  <filter>
  <font>
  <foreignobject>
  <marker>
  <mask>
  <mpath>
  <pattern>
  <script>
  <switch>
  <view>
   */
  fill: STRING, // Shape elements » Text content elements »
  fillOpacity: NUMBER, // Shape elements » Text content elements »
  fillRule: ENUM, // Shape elements » Text content elements » Document Tags and Contributors
  /*
  Graphics elements »
  <a>
  <defs>
  <glyph>
  <g>
  <marker>
  <missing-glyph>
  <pattern>
  <svg>
  <switch>
  <symbol>
   */
  filterRes: STRING, // <filter>
  filterUnits: ENUM, // <filter>
  floodColor: ENUM, // <feflood>
  floodOpacity: NUMBER, // <feflood>
  fontFamily: STRING, // Text content elements »
  fontSize: STRING, // Text content elements »
  fontSizeAdjust: NUMBER, // Text content elements »
  fontStretch: ENUM, // Text content elements »
  fontStyle: ENUM, // Text content elements »
  fontVariant: ENUM, // Text content elements »
  fontWeight: ENUM, // Text content elements »
  from: NUMBER, // <animate> <animatecolor> <animatemotion> <animatetransform>
  fx: NUMBER, // <radialGradient>
  fy: NUMBER, // <radialGradient>
  gradientTransform: STRING, // <lineargradient> <radialgradient>
  gradientUnits: ENUM, // <lineargradient> <radialgradient>
  height: NUMBER,
  /*
  Filter primitive elements »
  <filter>
  <foreignObject>
  <image>
  <pattern>
  <rect>
  <svg>
  <use>
  <mask>
   */
  href: STRING, // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href
  imageRendering: ENUM, // <image>
  in: ENUM,
  /*
  <feblend>
  <fecolormatrix>
  <fecomponenttransfer>
  <fecomposite>
  <feconvolvematrix>
  <fediffuselighting>
  <fedisplacementmap>
  <fegaussianblur>
  <femorphology>
  <feoffset>
  <fespecularlighting>
  <fetile>
  Docum
   */
  in2: ENUM,
  k1: NUMBER, // <fecomposite>
  k2: NUMBER, // <fecomposite>
  k3: NUMBER, // <fecomposite>
  k4: NUMBER, // <fecomposite>
  kernelMatrix: STRING, // <feconvolvematrix>
  kernelUnitLength: STRING, // <feconvolvematrix> <fediffuselighting> <fespecularlighting>
  kerning: STRING, // Text content elements »
  keySplines: STRING, // <animate> <animatecolor> <animatemotion> <animatetransform>
  keyTimes: STRING, // <animate> <animatecolor> <animatemotion> <animatetransform>
  letterSpacing: STRING, // Text content elements »
  lightingColor: STRING, // <fediffuselighting> <fespecularlighting>
  limitingConeAngle: NUMBER, // <fespotlight>
  local: STRING,
  markerEnd: STRING, // <path> <line> <polyline> <polygon>
  markerMid: STRING, // <path> <line> <polyline> <polygon>
  markerStart: STRING, // <path> <line> <polyline> <polygon>
  markerHeight: NUMBER, // <marker>
  markerUnits: ENUM, //  <marker>
  markerWidth: NUMBER, // <marker>
  mask: STRING, // Container elements » Graphical elements »
  maskContentUnits: ENUM, // <mask>
  maskUnits: ENUM, // <mask>
  max: NUMBER, // Animation elements »
  min: NUMBER, // Animation elements »
  mode: ENUM, // <feblend>
  numOctaves: NUMBER, // <feturbulence>
  opacity: NUMBER,
  /*
  Graphics elements »
  <a>
  <defs>
  <glyph>
  <g>
  <marker>
  <missing-glyph>
  <pattern>
  <svg>
  <switch>
  <symbol>
   */
  operator: ENUM, // <fecomposite> <femorphology>
  order: NUMBER, // <feconvolvematrix>
  overflow: ENUM, // <svg> <symbol> <image> <foreignObject> <pattern> <marker>
  overlinePosition: NUMBER, // <font-face>
  overlineThickness: NUMBER, // <font-face>
  paintOrder: ENUM, // Shape elements » Text content elements »
  pathLength: NUMBER, // <path>
  patternContentUnits: ENUM, // <pattern>
  patternTransform: STRING, // <pattern>
  patternUnits: ENUM,  // <pattern>
  pointerEvents: ENUM, // Graphics elements »
  points: STRING, // <polyline> <polygon>
  pointsAtX: NUMBER, // <fespotlight>
  pointsAtY: NUMBER, // <fespotlight>
  pointsAtZ: NUMBER, // <fespotlight>
  preserveAlpha: BOOLEAN, // <feconvolvematrix>
  preserveAspectRatio: ENUM, // <svg> <symbol> <image> <feImage> <marker> <pattern> <view>
  primitiveUnits: ENUM, // <filter>
  r: NUMBER, // <circle> <radialgradient>
  radius: NUMBER, // <femorphology>
  repeatCount: ENUM, // Animation elements »
  repeatDur: STRING, // Animation elements »
  requiredFeatures: STRING, // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/requiredFeatures
  restart: ENUM, // Animation elements »
  result: STRING, // Filter primitive elements »
  rx: NUMBER, // <ellipse> <rect>
  ry: NUMBER, // <ellipse> <rect>
  scale: NUMBER, // <fedisplacementmap>
  seed: NUMBER, // <feTurbulence>
  shapeRendering: ENUM, // Shape elements »
  specularConstant: NUMBER, // <fespecularlighting>
  specularExponent: NUMBER, // <fespotlight> <fespecularlighting>
  stdDeviation: NUMBER, // <fegaussianblur>
  stitchTiles: ENUM, // <feturbulence>
  stopColor: STRING, // <stop>
  stopOpacity: NUMBER, // <stop>
  strikethroughPosition: NUMBER, // <font-face>
  strikethroughThickness: NUMBER, // <font-face>
  stroke: STRING, // Shape elements » Text content elements »
  strokeDasharray: STRING, // Shape elements » Text content elements »
  strokeDashoffset: NUMBER, // Shape elements » Text content elements »
  strokeLinecap: ENUM, // Shape elements » Text content elements »
  strokeLinejoin: ENUM, // Shape elements » Text content elements »
  strokeMiterlimit: NUMBER, // Shape elements » Text content elements »
  strokeOpacity: NUMBER, // Shape elements » Text content elements »
  strokeWidth: NUMBER, // Shape elements » Text content elements »
  style: STRING, // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/style
  surfaceScale: NUMBER, // <fediffuselighting> <fespecularlighting>
  tabindex: NUMBER, // ALL
  targetX: NUMBER, // <feconvolvematrix>
  targetY: NUMBER, // <feconvolvematrix>
  textAnchor: ENUM, // Text content elements »
  textDecoration: ENUM, // Text content elements »
  textRendering: ENUM, // <text>
  textLength: NUMBER, // <text> <tspan>
  to: NUMBER, // Animation elements »
  transform: STRING,
  /*
  <a>
  <clipPath>
  <defs>
  <foreignObject>
  <g>
  <switch>
  <use>
  <svg> (SVG 2 onwards)
  Graphics elements »
   */
  type: ENUM,
  /*
  <animatetransform>
  <fecolormatrix>
  <fefunca>
  <fefuncb>
  <fefuncg>
  <fefuncr>
  <feturbulence>
  <script>
  <style>
   */
  underlinePosition: NUMBER, // <font-face>
  underlineThickness: NUMBER, // <font-face>
  values: STRING, // Animation elements » <fecolormatrix>
  version: ENUM, // <svg>
  viewBox: STRING, // <svg> <symbol> <image> <marker> <pattern> <view>
  visibility: ENUM, // Graphics elements » Text content elements »
  width: NUMBER,
  /*
  Filter primitive elements »
  <filter>
  <foreignObject>
  <image>
  <pattern>
  <rect>
  <svg>
  <use>
  <mask>
   */
  wordSpacing: NUMBER, // Text content elements »
  writingMode: ENUM, // <text>
  x: NUMBER,
  /*
  Filter primitive elements »
  <altGlyph>
  <fePointLight>
  <feSpotLight>
  <filter>
  <foreignObject>
  <glyphRef>
  <image>
  <pattern>
  <rect>
  <svg>
  <text>
  <use>
  <mask>
  <tref>
  <tspan>
   */
  x1: NUMBER, // <line> <linearGradient>
  x2: NUMBER, // <line> <linearGradient>
  xChannelSelector: ENUM, // <fedisplacementmap>
  y: NUMBER,
  /*
  Filter primitive elements »
  <altGlyph>
  <fePointLight>
  <feSpotLight>
  <filter>
  <foreignObject>
  <glyphRef>
  <image>
  <pattern>
  <rect>
  <svg>
  <text>
  <use>
  <mask>
  <tref>
  <tspan>
   */
  y1: NUMBER, // <line> <linearGradient>
  y2: NUMBER, // <line> <linearGradient>
  yChannelSelector: ENUM, // <fedisplacementmap>
  z: NUMBER, // <fepointlight> <fespotlight>
};

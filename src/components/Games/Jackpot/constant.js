/**
 * Default symbol for the blocks.
 * @type {string}
 */
export const DEFAULT_SYMBOL = "?";

/**
 * Text for the "START" button.
 * @type {string}
 */
export const START_TEXT = "START";

/**
 * Text for the "SPIN" button.
 * @type {string}
 */
export const SPIN_TEXT = "SPIN";

/**
 * Object mapping the result symbols to their corresponding point values.
 * @type {object}
 */
export const SYMBOLS = {
  C: { point: 10 },
  L: { point: 20 },
  O: { point: 30 },
  W: { point: 40 },
};

/**
 * Object mapping the result symbols to their corresponding image names and alt text.
 * @type {object}
 */
export const LIST_RESULT_SYMBOL = {
  "?": {
    name: "cherries",
    alt: "cherries",
  },
  C: {
    name: "cherries",
    alt: "cherries",
  },
  L: {
    name: "lemon",
    alt: "lemon",
  },
  O: {
    name: "orange",
    alt: "orange",
  },
  W: {
    name: "watermelon",
    alt: "watermelon",
  },
};

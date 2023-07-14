/**
 * Delays the execution of code for the specified duration.
 * @param {number} ms - The duration in milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

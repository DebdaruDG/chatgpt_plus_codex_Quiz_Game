export function isValidOption(index, options) {
  return Number.isInteger(index) && index >= 0 && index < options.length;
}

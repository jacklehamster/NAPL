export function generateRandomHexColor() {
  // Generate a random number between 0 and 0xFFFFFF
  let randomNum = Math.floor(Math.random() * 0xffffff);

  // Convert the number to a hexadecimal string
  let hexColor = randomNum.toString(16);

  // Pad the string with leading zeros if necessary to ensure it is 6 digits long
  let fullHexColor = hexColor.padStart(6, "0");

  return `#${fullHexColor.toUpperCase()}`; // Prepend '#' and convert to uppercase
}

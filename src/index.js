module.exports = function toReadable(number) {

  const string = number.toString();

  if (parseInt(string) === 0) {
    return 'zero';
  }

  const units = [
    "", "one", "two", "three", "four",
    "five", "six", "seven","eight","nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen",
    "fifteen","sixteen","seventeen","eighteen","nineteen"
  ];

  const tens = [
    "", "", "twenty", "thirty", "forty",
    "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  const scales = [
    "", "thousand", "million",
    "billion", "trillion", "quadrillion",
    "quintillion", "sextillion", "septillion",
    "octillion", "nonillion", "decillion"
  ];

  let start = string.length;
  const chunks = [];

  while (start > 0) {
      let end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  const chunksLength = chunks.length;

  if (chunksLength > scales.length) {
      return '';
  }

  const words = [];

  for (i = 0; i < chunksLength; i++) {

    chunk = parseInt(chunks[i]);

    if (chunk) {

      let word;
      let chunkDigits = chunks[i].split('').reverse().map(parseFloat);

      if (chunkDigits[1] === 1) {
          chunkDigits[0] += 10;
      }

      if (word = scales[i]) {
        words.push(word);
      }

      if (word = units[chunkDigits[0]]) {
        words.push(word);
      }

      if (word = tens[chunkDigits[1]]) {
        words.push(word);
      }

      if (word = units[chunkDigits[2]]) {
        words.push(word + ' hundred');
      }

    }

  }

  return words.reverse().join(' ');

}

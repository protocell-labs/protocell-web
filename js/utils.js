//////UTILS//////


// random function for specific implimentation - assumes generator producing float point between 0 and 1
gene = Math.random;

// random weighted choice of an element from a list
function gene_weighted_choice(data) {
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
      total += data[i][1];
  }
  const threshold = gene() * total;
  total = 0;
  for (let i = 0; i < data.length - 1; ++i) {
      total += data[i][1];
      if (total >= threshold) {
          return data[i][0];
      }
  }
  return data[data.length - 1][0];
}

// clamp a number between a minimum and a maximum
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

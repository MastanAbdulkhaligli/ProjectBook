function filterOutliers(someArray) {
  if (someArray.length < 4) return someArray;

  let values, q1, q3, iqr, maxValue, minValue;

  values = someArray.slice().sort((a, b) => a - b); //copy array fast and sort

  if ((values.length / 4) % 1 === 0) {
    //find quartiles
    q1 = (1 / 2) * (values[values.length / 4] + values[values.length / 4 + 1]);
    q3 =
      (1 / 2) *
      (values[values.length * (3 / 4)] + values[values.length * (3 / 4) + 1]);
  } else {
    q1 = values[Math.floor(values.length / 4 + 1)];
    q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
  }

  iqr = q3 - q1;
  maxValue = q3 + iqr * 1.5;
  minValue = q1 - iqr * 1.5;

  let cleanData = values.filter((x) => x >= minValue && x <= maxValue);

  let result;
  // Sorted Arr, IQR, Upper Boundary, Lower Boundary,Q1,Q3, Cleaned Data
  result = [values, iqr, maxValue, minValue, q1, q3, cleanData];
  return result;
}

export default filterOutliers;

export const average = (data) => {
  const sum = data.reduce((total, value) => (
    total + value
  ), 0);

  const avg = sum / data.length;
  return avg;
};

export const standardDeviation = (values) => {
  const avg = average(values);

  const squareDiffs = values.map((value) => {
    const diff = value - avg;
    const sqrDiff = diff * diff;
    return sqrDiff;
  });

  const avgSquareDiff = average(squareDiffs);

  return Math.sqrt(avgSquareDiff);
};

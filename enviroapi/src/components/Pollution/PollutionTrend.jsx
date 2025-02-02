export const calculateTrend = (measurementsData) => {
  const validValues = measurementsData.filter(item => item.value !== null).slice(0, 3);
  if (validValues.length !== 3) return null;

  const [A, B, C] = validValues.map(item => item.value);
  const totalChange = (A - B) + (B - C);

  return totalChange > 0.1 ? 2 : totalChange < -0.1 ? 0 : 1;
};

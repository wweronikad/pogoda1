export const getWaterLevelColorAndTooltip = (stanWody, warningValue, alarmValue) => {
  if (!stanWody || isNaN(stanWody)) {
    return { color: 'black', tooltip: 'Brak danych o stanie wody' };
  }

  if (stanWody >= alarmValue) {
    return { color: 'red', tooltip: 'Przekroczony poziom alarmowy' };
  }

  if (stanWody >= warningValue) {
    return { color: 'orange', tooltip: 'Przekroczony poziom ostrzegawczy' };
  }

  return { color: 'green', tooltip: 'Poziom wody w normie' };
};

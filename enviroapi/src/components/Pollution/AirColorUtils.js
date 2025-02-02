export const pollutionColors = {
  veryGood: '#0D5504', // ciemnozielony
  good: '#14A302', // zielony
  moderate: '#BAA809', // żółty
  sufficient: '#DB7909', // pomarańczowy
  bad: '#D4150B', // czerwony
  veryBad: '#900C05', // ciemnoczerwony
  normal: '#12BAAC', // niebieski dla 'w normie'
  outOfNorm: '#12243D', // pomarańczowo-czerwony dla 'poza normą'
  unknown: '#343434', // szary
};

export const getColorForIndex = (index) => {
  switch(index.toLowerCase()) {
    case 'bardzo dobry':
      return pollutionColors.veryGood;
    case 'dobry':
      return pollutionColors.good;
    case 'umiarkowany':
      return pollutionColors.moderate;
    case 'dostateczny':
      return pollutionColors.sufficient;
    case 'zły':
      return pollutionColors.bad;
    case 'bardzo zły':
      return pollutionColors.veryBad;
    case 'w normie':
      return pollutionColors.normal;
    case 'poza normą':
      return pollutionColors.outOfNorm;
    default:
      return pollutionColors.unknown;
  }
};

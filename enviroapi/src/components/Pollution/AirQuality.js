const parameterMap = {
    'pył zawieszony PM10': 'PM10',
    'pył zawieszony PM2.5': 'PM2.5',
    'dwutlenek azotu': 'NO2',
    'ozon': 'O3',
    'dwutlenek siarki': 'SO2',
    'benzen': 'C6H6',
    'tlenek węgla': 'CO',
  };
  
  export const getPollutionDescription = (param, value) => {
    const mappedParam = parameterMap[param] || param;
  
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return 'brak danych';
    }
  
    switch (mappedParam) {
      case 'PM10':
        if (numericValue <= 20) return 'bardzo dobry';
        if (numericValue <= 50) return 'dobry';
        if (numericValue <= 80) return 'umiarkowany';
        if (numericValue <= 110) return 'dostateczny';
        if (numericValue <= 150) return 'zły';
        return 'bardzo zły';
  
      case 'PM2.5':
        if (numericValue <= 13) return 'bardzo dobry';
        if (numericValue <= 35) return 'dobry';
        if (numericValue <= 55) return 'umiarkowany';
        if (numericValue <= 75) return 'dostateczny';
        if (numericValue <= 110) return 'zły';
        return 'bardzo zły';
  
      case 'O3':
        if (numericValue <= 70) return 'bardzo dobry';
        if (numericValue <= 120) return 'dobry';
        if (numericValue <= 150) return 'umiarkowany';
        if (numericValue <= 180) return 'dostateczny';
        if (numericValue <= 240) return 'zły';
        return 'bardzo zły';
  
      case 'NO2':
        if (numericValue <= 40) return 'bardzo dobry';
        if (numericValue <= 100) return 'dobry';
        if (numericValue <= 150) return 'umiarkowany';
        if (numericValue <= 200) return 'dostateczny';
        if (numericValue <= 230) return 'zły';
        return 'bardzo zły';
  
      case 'SO2':
        if (numericValue <= 50) return 'bardzo dobry';
        if (numericValue <= 100) return 'dobry';
        if (numericValue <= 200) return 'umiarkowany';
        if (numericValue <= 350) return 'dostateczny';
        if (numericValue <= 500) return 'zły';
        return 'bardzo zły';
  
      case 'C6H6':
        if (numericValue <= 5) return 'w normie';
        if (numericValue <= 30) return 'poza normą';
        return 'brak danych';
  
      case 'CO':
        if (numericValue <= 10000) return 'w normie';
        if (numericValue <= 3000) return 'poza normą';
        return 'brak danych';
  
      default:
        return 'brak danych';
    }
  };
  
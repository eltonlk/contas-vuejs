const dateLocalize = (locale = 'pt-BR') => {
  return new Intl.DateTimeFormat(locale);
}

const numberToCurrency = (locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigitis: 2,
    maximumFractionDigitis: 2,
    style: 'currency',
    currency: 'BRL'
  });
};

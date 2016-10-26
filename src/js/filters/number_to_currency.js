/* global Vue */

const numberToCurrency = (locale = "pt-BR") => {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigitis: 2,
        maximumFractionDigitis: 2,
        style: "currency",
        currency: "BRL"
    });
};

Vue.filter("numberToCurrency", {
    read (value, locale) {
        let number = 0;

        if (value && typeof value !== undefined) {
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);

            number = numberRegex ? numberRegex[0] : 0;
        }

        return numberToCurrency(locale).format(number);
    },
    write (value) {
        let number = 0;

        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, "").replace(/\,/g, ".");

            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});

/* global Vue */

const dateLocalize = (locale = "pt-BR") => {
    return new Intl.DateTimeFormat(locale);
};

Vue.filter("dateLocalize", {
    read (value, locale) {
        if (value && typeof value !== undefined) {
            if (!(value instanceof Date)) {
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);

                if (dateRegex) {
                    value = new Date(dateRegex[0] + "T03:00:00");
                } else {
                    return value;
                }
            }

            return dateLocalize(locale).format(value);
        }

        return value;
    },
    write (value) {
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);

        if (dateRegex) {
            let date = new Date(dateRegex[0].split("/").reverse().join("-") + "T03:00:00");

            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        return value;
    }
});

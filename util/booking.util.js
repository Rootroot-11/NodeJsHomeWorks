const dayJs = require('dayjs');

module.exports = {
    isDateNotReserved: (reservedApartments) => {
        Object.keys(reservedApartments).forEach((reservedApartment) => {
            if (reservedApartment) {
                const {booking_start, booking_end} = reservedApartment;

                dayJs.unix(booking_start / 1000)
                    .format('DD MMM YYYY');

                dayJs.unix(booking_end / 1000)
                    .format('DD MMM YYYY');
            }
        });
    },

    calculatePrice: (check_in, check_out, apartmentPrice) => {

        const booking_start1 = dayJs(check_in);
        const booking_end1 = dayJs(check_out);

        const numberOfDays = booking_end1.diff(booking_start1, 'day');

        return numberOfDays * apartmentPrice;
    }
};

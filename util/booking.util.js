const dayJs = require('dayjs');
const {ErrorHandler, BAD_REQUEST} = require('../errors');

module.exports = {
    isDateNotReserved: (reservedApartments, check_in, check_out) => {
        reservedApartments.forEach((reservedApartments) => {
            if (reservedApartments) {
                const {booking_start, booking_end} = reservedApartments;

                const startReservedDate = dayJs.unix(booking_start / 1000)
                    .format('DD MMM YYYY');

                const endReservedDate = dayJs.unix(booking_end / 1000)
                    .format('DD MMM YYYY');

                const isBetweenCheckIn = dayJs(check_in)
                    .isBetween(startReservedDate, endReservedDate, null, '[]');

                const isBetweenCheckOut = dayJs(check_out)
                    .isBetween(startReservedDate, endReservedDate, null, '[]');

                const isBetweenDateSt = dayJs(startReservedDate)
                    .isBetween(check_in, check_out, null, '[]');

                const isBetweenDateEn = dayJs(endReservedDate)
                    .isBetween(check_in, check_out, null, '[]');

                if (isBetweenCheckIn || isBetweenCheckOut || isBetweenDateSt || isBetweenDateEn) {
                    throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
                }

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

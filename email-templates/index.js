const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!'
    },

    [emailActionsEnum.ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool!'
    }
};

const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!'
    },

    [emailActionsEnum.LOGIN]: {
        templateName: 'login',
        subject: 'You are log in'
    },

    [emailActionsEnum.LOGOUT]: {
        templateName: 'logout',
        subject: 'You are log out'
    },

    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'You were update'
    },

    [emailActionsEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something'
    }

};

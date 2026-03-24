const Validator = require("validatorjs");

const validate = (data, rules, messages, callback) => {
    const validation = new Validator(data, rules, messages);

    if (validation.passess()) {
        callback(null, true);
    } else {
        callback(validation.errors.all(), false);
    }
};

module.exports = validate;
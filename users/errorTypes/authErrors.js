class TokenError extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Token not valid or not provided';
        this.status = 401;
    }
}

class LoginError extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Login and password pair does not exist';
        this.status = 401;
    }
}

class RegistrationError extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'This user name already exist';
        this.status = 409;
    }
}

module.exports = {TokenError, LoginError, RegistrationError};
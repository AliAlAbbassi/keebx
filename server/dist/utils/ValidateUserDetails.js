"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserDetails = void 0;
const validateUserDetails = (options) => {
    if (options.email)
        if (!options.email.includes('@')) {
            return [
                {
                    field: 'email',
                    message: 'invalid email',
                },
            ];
        }
    if (options.username)
        if (options.username.length <= 2) {
            return [
                {
                    field: 'username',
                    message: 'length must be greater than 2',
                },
            ];
        }
    if (options.username)
        if (options.username.includes('@')) {
            return [
                {
                    field: 'username',
                    message: 'cannot include an @',
                },
            ];
        }
    if (options.bio)
        if (options.bio.length > 40) {
            return [
                {
                    field: 'bio',
                    message: 'length must not be greater than 40 letters',
                },
            ];
        }
    return null;
};
exports.validateUserDetails = validateUserDetails;
//# sourceMappingURL=ValidateUserDetails.js.map
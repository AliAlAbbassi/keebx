import { UserDetailsInput } from '../resolvers/UserDetailsInput';

export const validateUserDetails = (options: UserDetailsInput) => {
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

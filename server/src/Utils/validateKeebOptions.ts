import { KeebOptions } from '../options'

export const validateKeebOptions = (options: KeebOptions) => {
  if (options.title.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2',
      },
    ]
  }

  if (options.title)
    if (options.title.length > 60) {
      return [
        {
          field: 'bio',
          message: 'length must not be greater than 60 letters',
        },
      ]
    }

  return null
}

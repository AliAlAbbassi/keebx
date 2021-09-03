type Links = {
  title: string
  url: string
}[]

type Option = {
  title: string
  options: {
    id: number
    price: number
    greaterThan: boolean
  }[]
}

export const Links: Links = [
  {
    title: 'Keyboards',
    url: './keyboard',
  },
  {
    title: 'Keycaps',
    url: './keycaps',
  },
  {
    title: 'Switches',
    url: './switches',
  },
]

export const Options: Option[] = [
  {
    title: 'Price',
    options: [
      {
        id: 0,
        price: 50,
        greaterThan: false,
      },
      {
        id: 1,
        price: 100,
        greaterThan: false,
      },
      {
        id: 2,
        price: 200,
        greaterThan: false,
      },
      {
        id: 3,
        price: 300,
        greaterThan: true,
      },
    ],
  },
]

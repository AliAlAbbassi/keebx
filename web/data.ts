type Links = {
  title: string
  url: string
}[]

type Option = {
  title: string
  options: string[]
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
    options: ['$50', '$50 to $100', '$100 to $200', '$200 to $300', '$300+'],
  },
]

export type Keeb = {
    id: number
    title: string
    imageUrl: string
    ticker: string
    condition: string
    authenticity: Number
    switches: string[]
    createdAt: Date
    updatedAt: Date
}

export type Product = 'Keeb' | 'Switch' | 'Keycaps' | 'custom'
type Product = {
    price: number,
    _id: string,
    title: string,
    alt: string | null,
    type: string,
    image: SanityImage,
    category: {
      name: string
    }
  }
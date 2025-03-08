export interface Book {
  title: string;
  url: string;
  image: string;
  rating?: number;
  notes?: string;
  date: Date;
}

export const books: Book[] = [
  {
    title: "Stand Up Straight: 10 Life Lessons from the Royal Military Academy Sandhurst",
    url: "https://www.amazon.co.uk/gp/product/B0815XPBVD",
    image: "stand-up-straight.jpg",
    rating: 4,
    date: new Date("2025-03-08")
  }
];
export interface Book {
  title: string;
  subtitle?: string;
  url: string;
  image: string;
  rating?: number;
  notes?: string;
  date: Date;
  audiobook?: boolean;
}

export const books: Book[] = [
  {
    title: "Outlive",
    subtitle: " The Science and Art of Longevity",
    url: "https://www.amazon.co.uk/Audible-Outlive-Science-Art-Longevity/dp/B0BTHVPHLJ",
    image: "outlive.jpg",
    audiobook: true,
    date: new Date("2025-03-22"),
    rating: 4,
  },
  {
    title: "A Court Of Thorns And Roses",
    url: "https://www.amazon.co.uk/Court-Thorns-Roses/dp/B07955KZ1V",
    image: "a-court-of-thorns-and-roses.jpg",
    rating: 4,
    date: new Date("2025-03-10"),
    audiobook: true,
  },
  {
    title: "How to Take Smart Notes in Obsidian",
    url: "https://www.amazon.co.uk/gp/product/B0B9R1BG72",
    image: "how-to-take-smart-notes-in-obsidian.jpg",
    rating: 2,
    date: new Date("2025-03-09"),
  },
  {
    title: "Stand Up Straight",
    subtitle: "10 Life Lessons from the Royal Military Academy Sandhurst",
    url: "https://www.amazon.co.uk/gp/product/B0815XPBVD",
    image: "stand-up-straight.jpg",
    rating: 4,
    date: new Date("2025-03-08"),
    audiobook: false,
  },
  {
    title: "The Pragmatic Programmer",
    subtitle: "Your Journey to Mastery",
    url: "https://www.amazon.co.uk/gp/product/0135957052",
    image: "the-pragmatic-programmer.jpg",
    rating: 5,
    date: new Date("2025-02-13"),
    audiobook: false,
  },
  {
    title: "Digital Minimalism",
    subtitle: "Choosing a Focused Life in a Noisy World",
    url: "https://www.amazon.co.uk/Digital-Minimalism-Living-Better-Technology/dp/0241341132",
    image: "digital-minimalism.jpg",
    rating: 4,
    date: new Date("2025-02-27"),
    audiobook: false,
  },
  {
    title: "The Software Engineer's Guidebook",
    subtitle:
      " Navigating senior, tech lead, and staff engineer positions at tech companies and startups",
    url: "https://www.amazon.co.uk/gp/product/B0CV6ZNLLP",
    image: "the-software-engineers-guidebook.jpg",
    rating: 4,
    date: new Date("2025-03-04"),
    audiobook: false,
  },
  {
    title: "System Design Inteview",
    subtitle: "An Insider's Guide: Vol 2",
    url: "https://www.amazon.co.uk/gp/product/B0CR977BQH",
    image: "system-design-interview-vol2.jpg",
    rating: 4,
    date: new Date("2025-02-27"),
    audiobook: false,
  },
  {
    title: "System Design Inteview",
    subtitle: "An Insider's Guide: Vol 1",
    url: "https://www.amazon.co.uk/System-Design-Interview-Insiders-Guide-ebook/dp/B08B3FWYBX",
    image: "system-design-interview-vol1.jpg",
    rating: 5,
    date: new Date("2025-02-27"),
    audiobook: false,
  },
  {
    title: "The hobbit",
    subtitle: "There and back again",
    url: "https://www.amazon.co.uk/Hobbit-J-R-Tolkien/dp/0007458428",
    image: "the-hobbit.jpg",
    rating: 4,
    date: new Date("2024-09-20"),
  },
  {
    title: "Tracers in the Dark",
    subtitle: "The Global Hunt for the Crime Lords of Cryptocurrency",
    url: "https://www.amazon.co.uk/Tracers-Dark-Global-Crime-Cryptocurrency/dp/0385548095",
    image: "tracers-in-the-dark.jpg",
    rating: 4,
    date: new Date("2023-02-19"),
  },
  {
    title: "Snow Crash",
    url: "https://www.amazon.co.uk/Snow-Crash/dp/B002SPXDZ4",
    image: "snow-crash.jpg",
    rating: 5,
    date: new Date("2022-12-21"),
  },
  {
    title: "Sandworm",
    subtitle:
      "A New Era of Cyberwar and the Hunt for the Kremlin's Most Dangerous Hackers",
    url: "https://www.amazon.co.uk/gp/product/B0B9R1BG72",
    image: "sandworm.jpg",
    rating: 4,
    date: new Date("2022-11-04"),
  },
  {
    title: "Countdown to Zero Day",
    subtitle: "Stuxnet and the Launch of the World's First Digital Weapon",
    url: "https://www.amazon.co.uk/gp/product/B00KEPLC08",
    image: "countdown-to-zero-day.jpg",
    rating: 4,
    date: new Date("2020-03-02"),
  },
  {
    title: "Permanent Record",
    url: "https://www.amazon.co.uk/gp/product/B0B9R1BG72",
    image: "permanent-record.jpg",
    rating: 4,
    date: new Date("2020-01-26"),
  },
  {
    title: "Do Androids Dream of Electric Sheep?",
    url: "https://www.amazon.co.uk/Blade-Runner-Originally-published-Androids/dp/B002SQDI3K",
    image: "do-androids-dream-of-electric-sheep.jpg",
    rating: 4,
    date: new Date("2023-12-16"),
  },
  {
    title: "Ghost in the Wires",
    subtitle: "My Adventures as the World's Most Wanted Hacker",
    url: "https://www.amazon.co.uk/gp/product/B00FOQS8D6?ie=UTF8&tag=x_gr_bb_amazon-21&linkCode=as2&camp=1634&creative=6738",
    image: "ghost-in-the-wires.jpg",
    rating: 3,
    date: new Date("2019-11-08"),
  },
];

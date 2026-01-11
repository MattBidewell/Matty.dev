import styles from "./books.module.css";
import { books, IBook } from "./books";
import Book from "../components/book/Book";

// Group books by year
function groupBooksByYear(books: IBook[]): Map<number, IBook[]> {
  const sorted = [...books].sort((a, b) => b.date.getTime() - a.date.getTime());
  const grouped = new Map<number, IBook[]>();

  for (const book of sorted) {
    const year = book.date.getFullYear();
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(book);
  }

  return grouped;
}

export default async function Bookshelf() {
  const booksByYear = groupBooksByYear(books);

  return (
    <div className={styles["bookshelf-container"]}>
      {Array.from(booksByYear.entries()).map(([year, yearBooks]) => (
        <section key={year} className={styles["year-section"]}>
          <h2 className={styles["year-heading"]}>{year}</h2>
          <div className={styles["book-shelf"]}>
            {yearBooks.map((book) => (
              <Book key={book.title + book.date.getTime()} book={book} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

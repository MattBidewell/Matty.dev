import styles from "./books.module.css";
import { books, IBook } from "./books";
import Book from "../components/book/Book";

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
  const yearGroups = Array.from(groupBooksByYear(books).entries());

  return (
    <div className={`container ${styles.container}`}>
      <h1>Bookshelf</h1>
      <p className={styles.intro}>
        A running log of the books that stuck with me, from engineering and systems work to
        sci-fi, fantasy, and the odd health rabbit hole.
      </p>

      <div className={styles["year-list"]}>
        {yearGroups.map(([year, yearBooks]) => (
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
    </div>
  );
}

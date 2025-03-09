import styles from "./books.module.css";
import { books } from "./books";
import Book from "../components/book/Book";

export default async function Bookshelf() {
  return (
    <div className={styles["book-shelf"]}>
      {books.sort((a, b) => b.date.getTime() - a.date.getTime()).map((book) => (
          <Book key={book.title} book={book}/>
        ))}
      </div>
  );
}

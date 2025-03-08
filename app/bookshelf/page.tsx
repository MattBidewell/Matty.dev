import styles from "./books.module.css";
import { books } from "./books";
import Book from "../components/book/Book";

export default async function Bookshelf() {
  return (
      <div className={styles["book-shelf"]}>
        {books.map((book) => (
          <Book key={book.title} book={book}/>
        ))}
      </div>
  );
}

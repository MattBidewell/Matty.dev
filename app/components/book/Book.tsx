import Image from 'next/image';
import { Link } from "next-view-transitions";
import { IBook } from "../../bookshelf/books";
import styles from '../../bookshelf/books.module.css';

export default function Book({ book }: { book: IBook }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const renderRating = (rating: number | undefined) => {
    if (rating === undefined) return null;

    return (
      <div className={styles["book-rating"]} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < rating;

          return (
            <span
              key={index}
              aria-hidden="true"
              className={filled ? styles["star-filled"] : styles["star-empty"]}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <Link
      href={book.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles["book-item"]}
    >
      <div className={styles["book-image-container"]}>
        <Image
          src={`/assets/images/books/${book.image}`}
          alt={`Cover of ${book.title}`}
          width={160}
          height={200}
          className={styles["book-image"]}
          sizes="(max-width: 480px) 40vw, (max-width: 900px) 25vw, 180px"
        />
        {book.audiobook && <span className={styles["book-badge"]}>Audio</span>}
      </div>

      <div className={styles["book-info"]}>
        <h3 className={styles["book-title"]}>{book.title}</h3>
        {book.subtitle && (
          <p className={styles["book-subtitle"]}>{book.subtitle}</p>
        )}
      </div>

      <div className={styles["book-meta"]}>
        {renderRating(book.rating)}
        <div className={styles["book-date"]}>{formatDate(book.date)}</div>
      </div>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Book } from '../../bookshelf/books';
import styles from '../../bookshelf/books.module.css';

export default function Book({ book }: { book: Book }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Generate star rating display
  const renderRating = (rating: number | undefined) => {
    if (rating === undefined) return null;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return <div className={styles["book-rating"]}>{stars}</div>;
  };

  return (
    <Link href={book.url} target="_blank" rel="noopener noreferrer" className={styles["book-item"]}>
      <div className={styles["book-image-container"]}>
        <Image
          src={`/assets/images/books/${book.image}`}
          alt={`Cover of ${book.title}`}
          width={160}
          height={200}
          className={styles["book-image"]}
        />
        {book.audiobook && (
          <span className={styles["book-badge"]}>Audio</span>
        )}
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
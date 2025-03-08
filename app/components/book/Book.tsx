import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book as BookType } from '../../bookshelf/books';
import styles from '../../bookshelf/books.module.css';

interface BookProps {
  book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return <div className={styles['book-rating']}>{stars}</div>;
  };

  return (
    <Link href={book.url} target="_blank" rel="noopener noreferrer">
      <div className={styles['book-item']}>
        <Image
          src={`/assets/images/books/${book.image}`}
          alt={book.title}
          width={200}
          height={250}
          className={styles['book-image']}
        />
        <h3 className={styles['book-title']}>{book.title}</h3>
        {book.rating && renderStars(book.rating)}
      </div>
    </Link>
  );
};

export default Book;
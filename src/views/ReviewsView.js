import { useState, useEffect } from 'react';
import { fetchgetMovieReviews } from '../services/moviesApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewsView({ movieId }) {
  const [reviewsList, setReviewsList] = useState(null);

  useEffect(() => {
    fetchgetMovieReviews(movieId).then(data => {
      console.log(data);
      if (!data.results.length) {
        toast.error('no reviews:(');
        return;
      }
      setReviewsList(data.results);
    });
  }, [movieId]);

  return (
    reviewsList && (
      <ul>
        {reviewsList.map(review => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    )
  );
}

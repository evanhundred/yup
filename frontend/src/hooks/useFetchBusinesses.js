import { useEffect } from 'react';
import { fetchBusinesses } from '../store/businesses';
import { useDispatch } from 'react-redux';

const useFetchBusinesses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);
};

export default useFetchBusinesses;

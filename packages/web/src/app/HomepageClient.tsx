'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../lib/hooks';
import { setHomepage } from '../lib/slices/homepageSlice';

interface HomepageClientProps {
  data: any;
}

export default function HomepageClient({ data }: HomepageClientProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Homepage data:', data);
    dispatch(setHomepage(data));
  }, [data, dispatch]);

  return <h1>Home Page</h1>;
}

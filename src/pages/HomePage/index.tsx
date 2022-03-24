import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Product } from '../../components/Product';

export function HomePage() {
  return (
    <Product name="Libro2" price="200" brand="Librua" imageURI="https://images.pexels.com/photos/3358707/pexels-photo-3358707.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" description="Un libro de lectura"/>
  );
}

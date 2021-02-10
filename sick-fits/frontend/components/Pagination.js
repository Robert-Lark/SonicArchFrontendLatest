import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

//This page takes care of the ui and code needed to scroll to new pages to 
// view more items


export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;
//this component is rendered at the top and bottom of the products page (/pages/products/index)
export default function Pagination({page}) {
//GQL Code  
const { error, loading, data } = useQuery(PAGINATION_QUERY);
if (loading) return 'Loading...';
if (error) return <DisplayError error={error} />;
const { count } = data._allProductsMeta;
//Round the returned ammount of pages up and store it.   
const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
        {/* SEO */}
      <Head>
        <title>Sonic Architecture - Page {page} of {pageCount}</title>
      </Head>
    {/* Page is brought in from pages/products/index and placed on the url */}
    <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}

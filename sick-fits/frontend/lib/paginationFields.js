// //This page allows you to remove items from the cache without messing up the pagination

// import {PAGINATION_QUERY} from "../components/Pagination";

// export default function paginationField() {
//   return {
//     keyArgs: false, //tells Apollo we will take care of everything

//     read(existing = [], {args, cache}) {
//       const {skip, first} = args;

//       //read the number of items on the page from the cache
//       const data = cache.readQuery({query: PAGINATION_QUERY});
//       //how many products are there?
//       const count = data?._allProductsMeta?.count;
//       //what page are we on?
//       const page = skip / first + 1;
//       //how many pages are there?
//       const pages = Math.ceil(count / first);

//       //check if we have existing items
//       //filter out for undefined items
//       const items = existing.slice(skip, skip + first).filter((x) => x);

//       if (items.length && items.length !== first && page == pages) {
//         //if there are items & there arent enough items to satisfy how many we are requesting to show per page
//         //and we are on the last page
//         //then just send it anyway
//         return items;
//       }
//       if (items.length !== first) {
//         //we dont have any items and must go to the network to fetch them
//         return false;
//       }
//       //if there are items return them from the cache
//       if (items.length) {
//         return items;
//       }
//       return false; // fallback to network if either if statements dont run
//     },
//     merge(existing, incoming, {args}) {
//       const {skip, first} = args;
//       //This runs when Apollo client comes back from the network with our products
//       // you can then define how they are added to the cache
//       const merged = existing ? existing.slice(0) : [];
//       for (let i = skip; i < skip + incoming.length; ++i) {
//         merged[i] = incoming[i - skip];
//       }
//       return merged;
//     },
//   };
// }


import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN JUST SEND IT

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just reutrn them from the cache, and we don't need to go to the network
      if (items.length) {
        // console.log(
        //   `There are ${items.length} items in the cache! Gonna send them to apollo`
        // );
        return items;
      }

      return false; // fallback to network

      // First thing it does it asks the read function for those items.
      // We can either do one of two things:
      // First things we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our product
      // console.log(`MErging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // Finally we return the merged items from the cache,
      return merged;
    },
  };
}
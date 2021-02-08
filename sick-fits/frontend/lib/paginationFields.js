//This page allows you to remove items from the cache without messing up the pagination

import {PAGINATION_QUERY} from "../components/Pagination";

export default function paginationField() {
  return {
    keyArgs: false, //tells Apollo we will take care of everything

    read(existing = [], {args, cache}) {
      const {skip, first} = args;

      //read the number of items on the page from the cache
      const data = cache.readQuery({query: PAGINATION_QUERY});
      //how many products are there?
      const count = data?._allProductsMeta?.count;
      //what page are we on?
      const page = skip / first + 1;
      //how many pages are there?
      const pages = Math.ceil(count / first);

      //check if we have existing items
      //filter out for undefined items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page == pages) {
        //if there are items & there arent enough items to satisfy how many we are requesting to show per page
        //and we are on the last page
        //then just send it anyway
        return items;
      }
      if (items.length !== first) {
        //we dont have any items and must go to the network to fetch them
        return false;
      }
      //if there are items return them from the cache
      if (items.length) {
        return items;
      }
      return false; // fallback to network if either if statements dont run
    },
    merge(existing, incoming, {args}) {
      const {skip, first} = args;
      //This runs when Apollo client comes back from the network with our products
      // you can then define how they are added to the cache
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}

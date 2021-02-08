// This is the page where people will add titles to their library

import UpdateProduct from "../components/UpdateProduct";
//query comes from the params in the url

export default function updatePage({query}) {
  
    return (
    <div>
      <UpdateProduct id={query.id}/>
    </div>
  );
}

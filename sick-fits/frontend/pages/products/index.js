import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

export default function ProductsPage() {
  //query is a prop of the useRouter hook. When a page is names in brackets
  //like [page].js it creates as many as needed and gives each a number (as a string)
  const {query} = useRouter()
  //because it is a string we need to convert it to a number below
  const page= parseInt(query.page)
    return (
      <div>
        {/* then we pass down the data, if there is now page input (if you are on the homepage)
        pass down 1 */}
        <Pagination page={page || 1}/>
        <Products page={page || 1}/>
        <Pagination page={page || 1}/>
      </div>
    );
  }
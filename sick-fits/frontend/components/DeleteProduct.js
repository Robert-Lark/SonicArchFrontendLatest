import {useMutation} from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
// a feature of Apollo 3 this function removes the deleted item from the 
//cache so it is instantly removed from the page when the user clicks delete
//payoad = what gets returned from the mutation
    cache.evict(cache.identify(payload.data.deleteProduct))
}

//children is the content between the actual button on the product page
export default function DeleteProduct({id, children}) {
    const [deleteProduct, { loading, error }] = useMutation(
        DELETE_PRODUCT_MUTATION,
        {
          variables: { id },
          update: update
        }
      );
  return (
    <button
    type="button"
    disabled={loading}
    onClick={() => {
      if (confirm('Are you sure you want to delete this item?')) {
        // go ahead and delete it
        console.log('DELTEe');
        deleteProduct().catch((err) => alert(err.message));
      }
    }}
  >
    {children}
  </button>
  );
}

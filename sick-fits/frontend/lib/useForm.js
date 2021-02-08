import {useState, useEffect} from "react";

export default function useForm(initialState = {}) {
  //create a state object for the inputs
  const [inputs, setInputs] = useState(initialState);
  
  const initialValues = Object.values(initialState).join("");
  useEffect(() => {
    //This function runs when the things we are monitoring changes
  }, [initialValues]);

  function handleChange(e) {
    let {value, name, type} = e.target;
    //this stops the html input from reverting from
    //a number to a string on change
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      //copy the existing state
      ...inputs,
      //update the specific piece of state
      [name]: value,
    });
  }
  //revert the form back to initial state
  function resetForm() {
    setInputs(initialState);
  }
  //clear all of the form values
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }
  //return the data we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

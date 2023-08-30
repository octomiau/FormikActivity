import React from "react";
import { useFormik } from 'formik';

function App() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''      
    },
    onSubmit: values => {
      if (!formik.errors.email && !formik.errors.password) {
        alert("Login Successful");
      }
      console.log('form:', values);
    },
    validate: values => {
      let errors = {};

      const emailInput = document.querySelector('input[name="email"]');
      if (!values.email) {
        errors.email = 'Field required';
      } else if (emailInput && !emailInput.validity.valid) {
        // type="email" validation from the browser
        errors.email = 'Username should be an email';
      }

      if (!values.password) {
        errors.password = 'Field required';
      }

      return errors;
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>Email:</div>
        <input 
          type="email" 
          name="email" 
          onChange={formik.handleChange} 
          value={formik.values.email}
          /* pattern attribute validation
          doc: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s01.html
          still got an error in the console
          */

          pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
          required
        />
        {formik.errors.email ? <div style={{color:'red'}}>{formik.errors.email}</div> : null}        
        <div>Password:</div>
        <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password}/><br/>
        {formik.errors.password ? <div style={{color:'red'}}>{formik.errors.password}</div> : null}                
        <button type="submit">Submit</button>
      </form>      
    </div>
  );
}

export default App;

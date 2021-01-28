import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// resend confirm email link
export const sendEmailConf = (email) => {
  return new Promise((resolve, reject) => {
    axios
  .post(`${API_URL}/auth/send-email-confirmation`, {
    email: email, // user's email
  })
  .then(res => {
    console.log('Your user received an email');
    resolve(res);
  })
  .catch(error => {
    console.error('An error occurred:', error.response);
    reject(error);
  });
  })
}

// forgot password
export const forgotPassword = (email) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/forgot-password`, {
        email: email, // user's email
      })
      .then(response => {
        console.log('Your user received an email');
        resolve(response)
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
        reject(error)
      });
      })
}
// reset password
export const resetPassword = (code, password, passwordConfirmation) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/reset-password`, {
        code: code, 
        password: password,
        passwordConfirmation: passwordConfirmation,
      })
      .then(response => {
        console.log("Your user's password has been reset.");
        resolve(response)
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
        reject(error)
      });
      })
}

//register a new user
export const registerUser = (firstName, lastName, username, email, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { firstName, lastName, username, email, password })
      .then((response) => {
        //resolve the promise to set loading to false in SignUp form
        resolve(response);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (identifier, password, rememberMe) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        if (rememberMe) {
          //set token response from Strapi for server validation
          Cookie.set("token", res.data.jwt, {expires: 100});
        } else {
          Cookie.set("token", res.data.jwt);
        }

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/");
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};

import { toast } from 'react-toastify';


  const logout = () => {
    localStorage.clear();
    window.location.href = "/parent/sign-in";
    toast.error('Session expired!')
  };

  export const requestHeader = {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  };

  /**
   *
   * @param {string} url
   * @param {string, [GET, POST, PATCH, PUT...]} method
   * @param {payload} payload
   * @param {boolean} token
   * @param {boolean} text
   * @param {boolean} form
   * @param {string | null} xHash
   * @returns Response Data;
   */


  // const API_USER_URL = "https://api-pro.rydlearning.com"    // production BASE URL from backend
   //const API_USER_URL =   "http://192.168.0.161:3000"   // development BASE URL from backend
   const API_USER_URL =   "http://localhost:3000"   // development BASE URL from backend
//    const API_USER_URL =  "https://ryd-learning-api-v2.onrender.com"

  export async function request(url, method, payload, token, text, form) {
    const  bearerToken = localStorage.getItem('ryd-parent-token');

    if (token) {
      requestHeader['authorization'] = `bearer ${bearerToken}`;
    }

    requestHeader["Content-Type"] = form === true ? "multipart/form-data" : "application/json";

    if (method === "GET") {
      return fetch(API_USER_URL + url, {
        method,
        headers: Object.assign(requestHeader),
      })
      .then((res) => {
          if (res.status === 403 || res.status === 401) {
              // Redirect to the login page
              logout();
              throw new Error("Access forbidden. Redirecting to login page.");
          } else if (text === true) {
              return res.text();
          } else {
              return res.json();
          }
      })
      .catch((err) => {
      console.error(`Request Error ${url}: `, err);
      throw new Error(err);
      // return err;
      });
    } else {
      return fetch(API_USER_URL + url, {
        method,
        headers: Object.assign(requestHeader),
        body: form === true ? payload : JSON.stringify(payload),
      })
        .then((res) => {
          if (res.status === 403 || res.status === 401) {
            logout();
            throw new Error("Access forbidden. Redirecting to login page.");
            // Redirect to the login page
            // window.location.href = "/auth/login";
          } else if (text === true) {
            return res.text();
          } else {
            return res.json();
          }
        })
        .catch((err) => {
          console.error(`Request Error ${url}: `, err);
          throw new Error(err);
        });
    }
  }

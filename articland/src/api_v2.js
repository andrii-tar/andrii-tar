import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AxClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  //   headers: {
  //      Authorization: sessionStorage.getItem('basicAuth')
  //  }
});


export const ErrorHandler = (error) =>{
  const navigate=useNavigate();
  console.log("handler", error.message);
  if (error.response.status === 400) {
    //console.log(error.response.status);
    alert("Bad request, check if input data is corect");
  }
  if (error.response.status === 401) {
    //console.log(error.response.status);
    alert("Log into your account to perform this action");
  }
  if (error.response.status === 403) {
    ///  console.log(error.response);
    alert("Moderator role required to perform this action");
  }
  if (error.response.status === 404) {
    ///  console.log(error.response);
    alert("Page not found");
    navigate("/");
  //  alert("Moderator role required to perform this action");
  }
  if (error.response.status === 500) {
    ///  console.log(error.response);
    alert("Internal Server Error, try again later");
  //  alert("Moderator role required to perform this action");
  }
}

export async function loginUser(token, authCtx) {
  let ud = {};
  await AxClient.get(`/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    }
  })
    .then(function (response) {
      sessionStorage.setItem('basicAuth', token);
      ud = response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      sessionStorage.setItem('basicAuth', "");
    
      if (error.response.status === 401) {
        //console.log(error.response.status);
        alert("Wrong credentials");
      }
      else
        ErrorHandler(error);
    }).finally(()=>{
      authCtx.setUserCreds(sessionStorage.getItem('basicAuth'));
    });
  return ud;
}

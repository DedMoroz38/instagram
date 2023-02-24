import { useState, useEffect } from 'react';
import axios from 'axios';

type useFetch = {
  url: string,
  method: "post" | "get",
  body?: null | object,
  headers?: null | string,
}

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const useFetch = ({
  url,
  method,
  body = null,
  headers = null,
}: useFetch): {loading: boolean, response: any, error: any} =>  {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios[method](url, 
      { withCredentials: true })    
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);



  return {loading, response, error};
};



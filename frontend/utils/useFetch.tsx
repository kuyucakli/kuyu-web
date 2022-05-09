import { useState, useEffect } from 'react';

const useFetch = (path = "works", options = {}) => {
  const  url = `${process.env.BASE_URL_STRAPI_API}${path}`;
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url, options]);
  return {data}
}
export default useFetch;
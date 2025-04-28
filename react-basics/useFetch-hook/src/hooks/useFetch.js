import { useState, useEffect } from "react";

export function useFetch(url, timeInterval) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  useEffect(() => {
    const interval = setInterval(getData, timeInterval * 1000);

    return function () {
      clearInterval(interval);
    };
  }, []);

  return {
    data,
    loading,
  };
}

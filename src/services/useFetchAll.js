import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const previousUrls = useRef([]); //ref to previous render's urls
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    isMounted.current = true;
    if (areEqual(urls, previousUrls.current)) {
      setLoading(false);
      return;
    }
    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => {
        if (isMounted.current) setData(json);
      })
      .catch((e) => {
        console.error(e);
        if (isMounted.current) setError(e);
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });
    return () => {
      isMounted.current = false;
    };
  }, [urls]); //added urls because re-render is dependant on the list of urls received //bug : infinite loop is list of urls not checked for change first

  return { data, loading, error };
}

function areEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

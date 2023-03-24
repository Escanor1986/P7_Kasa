import { useEffect, useState } from "react";
import { getRentals } from "../apis";

export function useFetchRentals() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const queryParam = new URLSearchParams();
        // on importe fetch depuis ../apis/rentals.js
        const fetchedRentals = await getRentals(queryParam);
        setRentals(fetchedRentals);
      } catch (error) {
        setError(error);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      cancel = true;
    };
  }, []);

  return [[rentals, setRentals], isLoading, error];
}

// import { useEffect, useState } from "react";

// export function useFetchData(url) {
//   const [data, setdata] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState([]);

//   useEffect(() => {
//     let cancel = false;
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(url);
//         if (response.ok && !cancel) {
//           const newData = await response.json();
//           setdata(Array.isArray(newData) ? newData : [newData]);
//         }
//       } catch (error) {
//         setError("Erreur lors du chargement des données :", error.message);
//       } finally {
//         if (!cancel) {
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchData();
//     return () => {
//       cancel = true;
//     };
//   }, [url]);
//   return [[data, setdata], isLoading, error];
// }

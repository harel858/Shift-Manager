import { useEffect, useState, createContext, useContext } from "react";
import UserContext from "./userContext.js";

const CurrentShift = createContext({
  getCurrentShift: () => {},
  createCurrentShift: (
    workPlace,
    start,
    date,
    startSeconds,
    pausedSeconds,
    startAgain
  ) => {},
  updatePaused: (date) => {},
  updateStartAgain: (date) => {},
  deleteShift: (currentShift) => {},
  currentShift: {
    workPlace: String,
    start: String,
    date: String,
    startSeconds: Number,
    pausedSeconds: Number,
    startAgain: Number,
  },
  errorCurrentShift: String,
  loadingCurrentShift: Boolean,
});

export function CurrentShiftContextProvider(props) {
  const [loadingCurrentShift, setLoading] = useState(false);
  const [errorCurrentShift, setError] = useState();
  const [currentShift, setCurrentShift] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getCurrentShiftData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://shift-manager-production.up.railway.app/currentShift",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.ok) {
          const [data] = await res.json();
          setCurrentShift(data);
        } else {
          setCurrentShift(null);
        }
      } catch (err) {
        console.log(err);
        setError(err);
        setCurrentShift(null);
      } finally {
        setLoading(false);
      }
    };
    getCurrentShiftData();
  }, [user]);

  const createCurrentShift = async (
    workPlace,
    start,
    date,
    startSeconds,
    pausedSeconds,
    startAgain
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://shift-manager-production.up.railway.app/currentShift/create",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workPlace,
            start,
            date,
            startSeconds,
            pausedSeconds,
            startAgain,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCurrentShift(data);
      } else {
        console.log(await res.json());
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePaused = async (currentPaused) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://shift-manager-production.up.railway.app/currentShift/update-pause",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPaused: currentPaused,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCurrentShift(data);
      } else {
        console.log(await res.json());
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStartAgain = async (currentStartAgain) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://shift-manager-production.up.railway.app/currentShift/update-startAgain",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStartAgain,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCurrentShift(data);
      } else {
        console.log(await res.json());
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteShift = async (shift) => {
    try {
      const res = await fetch(
        "https://shift-manager-production.up.railway.app/currentShift/delete",
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: shift._id,
          }),
        }
      );

      if (res.ok) {
        setCurrentShift(null);
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    }
  };

  const context = {
    createCurrentShift,
    updatePaused,
    updateStartAgain,
    deleteShift,
    loadingCurrentShift,
    errorCurrentShift,
    currentShift,
  };

  return (
    <CurrentShift.Provider value={context}>
      {props.children}
    </CurrentShift.Provider>
  );
}
export default CurrentShift;

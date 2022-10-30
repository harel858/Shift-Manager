import { useState, useContext, createContext, useEffect } from "react";
import UserContext from "./userContext.js";
const ShiftContext = createContext({
  shifts: [],
  totalShifts: 0,
  error: String,
  addShift: (shift) => {},
  deleteShift: (shiftId) => {},
  updateShift: (
    index,
    _id,
    start,
    end,
    timeSpend,
    totalProfit,
    basicPayment,
    firstOverTime,
    overTime,
    seconds,
    date,
    setEditor
  ) => {},
});

export function ShiftContextProvider(props) {
  const { user, setUser } = useContext(UserContext);
  console.log("render context");
  const [shiftList, setShiftList] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [payment, setPayment] = useState(29.17);
  const [currency, setCurrency] = useState({
    value: "USD",
    label: "$",
  });
  const [overTime, setOvertime] = useState();
  const [currencies] = useState([
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
    {
      value: "INS",
      label: "₪",
    },
  ]);

  useEffect(() => {
    let allShifts = [];

    const getShiftData = async () => {
      try {
        const res = await fetch("http://localhost:5000/shifts", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const shifts = await res.json();
          allShifts.push(...shifts);
        } else {
          const resError = await res.json();
          setLoginError(resError);
          console.log(resError);
        }
      } catch (err) {
        setShiftList(allShifts);
        throw err;
      }
      setShiftList(allShifts);
    };
    getShiftData();
  }, [user, setUser]);

  async function updatePayment(newPayment) {
    try {
      const res = await fetch("http://localhost:5000/user/update-payment", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment: newPayment,
        }),
      });
      if (res.ok) {
        setPayment(newPayment);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateCurrency(newCurrency) {
    try {
      const res = await fetch("http://localhost:5000/user/update-currency", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: newCurrency,
        }),
      });
      if (res.ok) {
        setCurrency(newCurrency);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async function updateOvertime(newOverTime) {
    console.log(newOverTime);
    try {
      const res = await fetch("http://localhost:5000/user/update-overtime", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          overTime: newOverTime,
        }),
      });
      if (res.ok) {
        setOvertime(newOverTime);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function addShiftHandler(shift) {
    try {
      const res = await fetch("http://localhost:5000/shifts/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          workPlace: shift.workPlace,
          start: shift.start,
          end: shift.end,
          date: shift.date,
          timeSpend: shift.timeSpend,
          totalProfit: shift.totalProfit,
          seconds: shift.seconds,
          basicPayment: shift.basicPayment,
          firstOverTime: shift.firstOverTimePay,
          overTime: shift.overTimePay,
        }),
      });

      if (res.ok) {
        const newShift = await res.json();

        setShiftList((prev) => [...prev, newShift]);
      } else {
        const response = await res.json();
        throw response;
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteShiftHandler = async (shift) => {
    try {
      const res = await fetch("http://localhost:5000/shifts/delete", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: shift._id,
        }),
      });

      if (res.ok) {
        setShiftList((prev) => {
          return prev.filter((newListShift) => newListShift._id !== shift._id);
        });
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    }
  };
  const updateShiftHandler = async (
    index,
    _id,
    workPlace,
    start,
    end,
    timeSpend,
    totalProfit,
    basicPayment,
    firstOverTime,
    overTime,
    seconds,
    date,
    setEditor
  ) => {
    try {
      console.log(0);
      let res = await fetch("http://localhost:5000/shifts/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id,
          workPlace,
          start,
          end,
          date,
          timeSpend,
          basicPayment,
          firstOverTime,
          overTime,
          totalProfit,
          seconds,
        }),
      });
      if (res.ok) {
        const response = await res.json();
        let [updatedShift] = response;
        console.log(updatedShift);
        setShiftList((prev) => {
          prev[index] = updatedShift;
          return [...prev];
        });
        setEditor((prev) => !prev);
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    }
  };

  const context = {
    shifts: shiftList,
    totalShifts: shiftList.length,
    addShift: addShiftHandler,
    deleteShift: deleteShiftHandler,
    updateShift: updateShiftHandler,
  };

  return (
    <ShiftContext.Provider value={context}>
      {props.children}
    </ShiftContext.Provider>
  );
}
export default ShiftContext;

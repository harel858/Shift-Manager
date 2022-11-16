import { useState, createContext, useEffect } from "react";

const UserContext = createContext({
  payment: Number,
  setPayment: (payment) => {},
  currency: String,
  currencies: [],
  setCurrency: (value) => {},
  overTime: Boolean,
  setOvertime: (value) => {},
  setLoginError: (value) => {},
  user: {},
  loading: Boolean,
  setUser: () => {},
  updatePayment: (payment) => {},
  updateCurrency: (obj) => {},
  updateOvertime: (value) => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const getUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_API_KEY}/user`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const [userData] = await res.json();
          console.log(userData);
          setUser(userData);
          setCurrency(userData.currency);
          setPayment(userData.payment);
          return setOvertime(userData.overTime);
        } else {
          const resError = await res.json();
          setLoginError(resError);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  async function updatePayment(newPayment) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/user/update-payment`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment: newPayment,
          }),
        }
      );
      if (res.ok) {
        setPayment(newPayment);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateCurrency(newCurrency) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/user/update-currency`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency: newCurrency,
          }),
        }
      );
      if (res.ok) {
        setCurrency(newCurrency);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async function updateOvertime(newOverTime) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/user/update-overtime`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            overTime: newOverTime,
          }),
        }
      );
      if (res.ok) {
        setOvertime(newOverTime);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const context = {
    loginError,
    setLoginError,
    setOvertime,
    payment,
    currency,
    currencies,
    overTime,
    user,
    loading,
    setUser,
    setPayment,
    setCurrency,
    updatePayment,
    updateCurrency,
    updateOvertime,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;

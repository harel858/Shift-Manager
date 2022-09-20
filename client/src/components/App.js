import Layout from "./layout/layout.js";
import { Routes, Route } from "react-router-dom";
import NewShift from "../pages/newShift.js";
import AllShifts from "../pages/allShifts.js";
import Schedule from "../pages/schedule.js";
import Register from "../pages/Register.js";
import Login from "../pages/Login.js";
import ClockLayout from "./layout/clockLayout.js";
import FormLayOut from "./layout/formLayOut.js";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FormLayOut>
              <Register />
            </FormLayOut>
          }
        />
        <Route
          path="/login"
          element={
            <FormLayOut>
              <Login />
            </FormLayOut>
          }
        />
        <Route
          path="/newShift"
          element={
            <ClockLayout>
              <NewShift />
            </ClockLayout>
          }
        />
        <Route
          path="/allShifts"
          element={
            <Layout>
              <AllShifts />
            </Layout>
          }
        />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
}

export default App;

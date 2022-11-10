import { lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LinearColor from "./ui/loading.js";
import FormLayOut from "./layout/formLayOut.js";
import Layout from "./layout/layout.js";
import SettingsLayout from "./layout/settingsLayout.js";
import UserContext from "../context/userContext.js";
const Register = lazy(() => import("../pages/Register.js"));
const Login = lazy(() => import("../pages/Login.js"));
const ClockLayout = lazy(() => import("./layout/clockLayout.js"));
const NewShift = lazy(() => import("../pages/newShift.js"));
const AllShifts = lazy(() => import("../pages/allShifts.js"));
const Settings = lazy(() => import("../pages/settings.js"));

function App() {
  return (
    <>
      <Suspense fallback={<LinearColor />}>
        <Routes>
          <Route
            path="/register"
            element={
              <FormLayOut>
                <Register />
              </FormLayOut>
            }
          />
          <Route
            path="/"
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
          <Route
            path="/settings"
            element={
              <SettingsLayout>
                <Settings />
              </SettingsLayout>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

import Layout from "./layout/layout.js";
import { Routes, Route } from "react-router-dom";
import NewShift from "./pages/newShift.js";
import AllShifts from "./pages/allShifts.js";
import Schedule from "./pages/schedule.js";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/newShift" element={<NewShift />} />
          <Route path="/allShifts" element={<AllShifts />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

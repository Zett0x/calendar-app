import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CalendarScreen } from "../pages/calendar/CalendarScreen";
import { LoginScreen } from "../pages/auth/LoginScreen";
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<CalendarScreen />} />
      </Routes>
    </Router>
  );
};

import { Routes, Route } from "react-router-dom";
import BookingHistories from "./Components/BookingHistories";
import NewBooking from "./Components/NewBooking";
import UserBookingHistory from "./Components/UserBookingHistory";

export const baseurl = "https://travelopia-backend-datq.onrender.com";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewBooking/>} />
        <Route
          path="/user-travel-history/:id"
          element={<UserBookingHistory />}
        />
        <Route
          path="/booking-history"
          element={<BookingHistories />}
        />
        <Route path="/*" element={<>Page Not Found 404</>} />
      </Routes>
    </div>
  );
}

export default App;

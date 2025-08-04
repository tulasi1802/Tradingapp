













// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import Orders from "./components/Orders";
// import Holdings from "./components/Holdings";
// import Positions from "./components/Positions";
// import Bids from "./components/Bids";
// import Funds from "./components/Funds";

// export default function App() {
//   const [loggedInUserId, setLoggedInUserId] = useState(null);

//   const handleLogin = (userId) => {
//     setLoggedInUserId(userId);
//   };

//   const handleLogout = () => {
//     setLoggedInUserId(null);
//   };

//   // Signup handler that saves new user to localStorage
//   const handleSignup = (newUser) => {
//     const usersStr = localStorage.getItem("zerodha-users");
//     const users = usersStr ? JSON.parse(usersStr) : [];
//     // Optional: Check if userId already exists
//     if (users.find(u => u.userId === newUser.userId)) {
//       alert("User ID already exists. Please choose a different one.");
//       return false; // prevent navigation or further steps
//     }
//     users.push(newUser);
//     localStorage.setItem("zerodha-users", JSON.stringify(users));
//     return true; // success
//   };

//   return (
//     <Router>
//       <Routes>
//         {!loggedInUserId ? (
//           <>
//             <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
//             <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </>
//         ) : (
//           <>
//             <Route
//               path="/"
//               element={<Homepage user={{ userId: loggedInUserId }} onLogout={handleLogout} />}
//             />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/holdings" element={<Holdings />} />
//             <Route path="/positions" element={<Positions />} />
//             <Route path="/bids" element={<Bids />} />
//             <Route path="/funds" element={<Funds />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }







import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";  // path to above component
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Bids from "./components/Bids";
import Funds from "./components/Funds";

export default function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
  };

  return (
    <Router>
      <Routes>
        {!loggedInUserId ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route
              path="/*"
              element={
                <Layout user={{ userId: loggedInUserId }} onLogout={handleLogout}>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/holdings" element={<Holdings />} />
                    <Route path="/positions" element={<Positions />} />
                    <Route path="/bids" element={<Bids />} />
                    <Route path="/funds" element={<Funds />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

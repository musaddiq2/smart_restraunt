// // index.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

// // Custom Imports
// import App from "./App.jsx"; // Main App component
// import "./index.css"; // Global styles
// import { AppProvider } from "./context/AppContext.jsx"; // Custom React Context
// import { store } from "./redux/store"; // Redux store

// // Create root element and render the React app
// ReactDOM.createRoot(document.getElementById("root")).render(
//   // React.StrictMode helps identify potential problems in the app
//   <React.StrictMode>
//     {/* Redux Provider: makes the Redux store available to the entire app */}
//     <Provider store={store}>
//       {/* Custom Context Provider: makes custom app context available throughout the app */}
//       <AppProvider>
//         {/* BrowserRouter: enables routing features like Link, Route, useNavigate */}
//         <BrowserRouter>
//           {/* Main Application Component */}
//           <App />
//         </BrowserRouter>
//       </AppProvider>
//     </Provider>
//   </React.StrictMode>
// );





import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./redux/store";
import { AppProvider } from "./context/AppContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </Provider>
);

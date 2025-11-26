import "./assets/main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import router from "./app/router";
import { persistor, store } from "./app/store";
import { AppProvider } from "./context/app";
import { updateDeviceInfo } from "./features/app/appSlice";

import "./app/i18n";
const container = document.getElementById("root");
if (!container) {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
const root = ReactDOM.createRoot(container);
window.api.getDeviceInfo().then((deviceInfo) => {
  store.dispatch(updateDeviceInfo(deviceInfo));
});
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Layout } from "./Components/LayoutArea/Layout/Layout.tsx";
import { Provider } from "react-redux"; // Replace "react-redux" with the correct library if needed
import { store } from "./Redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { interceptor } from "./Utils/Interceptor.ts";

interceptor.create();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

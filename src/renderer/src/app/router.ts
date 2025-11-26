import { HomePage } from '@renderer/pages/home';
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  }
])

export default router

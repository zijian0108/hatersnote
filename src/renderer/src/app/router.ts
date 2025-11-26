import { PageHome } from '@renderer/pages/home';
import { PageLogin } from '@renderer/pages/login';
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: '/',
    Component: PageHome
  },
  {
    path: '/login',
    Component: PageLogin
  }
])

export default router

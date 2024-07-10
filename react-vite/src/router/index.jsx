import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductBrowser from '../components/ProductBrowser';
import ProductForm from '../components/ProductForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path:"/products",
        element:<ProductBrowser/>
      },
      {
        path:"/products/new",
        element:<ProductForm/>
      },
      {
        path:"/products/:productId"
      }
    ],
  },
]);

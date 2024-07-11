import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductBrowser from '../components/ProductBrowser';
import ProductForm from '../components/ProductForm';
import ProductDetail from '../components/ProductDetail';
import HomePage from '../components/HomePage';
import EditProductForm from '../components/EditProduct/EditProductForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
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
        path:"/traditional/products",
        element:<ProductBrowser/>
      },
      {
        path:"/electronic/products",
        element:<ProductBrowser/>
      },
      {
        path:"/products/new",
        element:<ProductForm/>
      },
      {
        path:"/products/:productId",
        element:<ProductDetail/>
      },
      {
        path:"/products/:productId/edit",
        element:<EditProductForm/>
      }
    ],
  },
]);

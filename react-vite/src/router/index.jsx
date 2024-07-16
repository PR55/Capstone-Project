import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductBrowser from '../components/ProductBrowser';
import ProductForm from '../components/ProductForm';
import ProductDetail from '../components/ProductDetail';
import HomePage from '../components/HomePage';
import EditProductForm from '../components/EditProduct/EditProductForm';
import ArticleBrowser from '../components/ArticleBrowser';
import ArticleDetail from '../components/ArticleDetail';
import PostArticle from '../components/PostArticle';
import ManagementPage from '../components/ManagementPage';
import EditArticle from '../components/EditArticle/EditArticle';
import ViewCart from '../components/ViewCart/ViewCart';

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
      },
      {
        path:'/articles',
        element:<ArticleBrowser/>
      },
      {
        path:'/articles/:articleId',
        element:<ArticleDetail/>
      },
      {
        path:'/articles/new',
        element:<PostArticle/>
      },
      {
        path:'/articles/:articleId/edit',
        element:<EditArticle/>
      },
      {
        path:'/manage',
        element:<ManagementPage/>
      },
      {
        path:'/cart',
        element:<ViewCart/>
      }
    ],
  },
]);

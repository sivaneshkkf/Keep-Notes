import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Notes from './pages/Notes.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element : <App/>,
      children : [
        {
          path : "/",
          element: <Home />
        },
        {
          path : "/notes",
          element: <Notes />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)

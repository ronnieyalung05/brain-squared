import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-bold text-3xl">
          React Supabase Auth & Context
        </h1>
      </div>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  </StrictMode>
);

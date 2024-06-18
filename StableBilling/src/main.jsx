import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Register from './Pages/Register.jsx'
import SignIn from './Pages/SigIn.jsx'
import Intro from './Pages/Intro.jsx'
import SignUp from './Pages/SignUp.jsx'
import Landing from './Pages/landing.jsx'
import Expense from './Pages/SubPages-Landing/Expense.jsx'
import Tex from './Pages/tex.jsx'

import Dashboard from './Pages/SubPages-Landing/Dashboard.jsx'
import Inventory from './Pages/SubPages-Landing/Inventory.jsx'
import Sales from './Pages/SubPages-Landing/Sales.jsx'
import Purchase from './Pages/SubPages-Landing/Purchase.jsx'
import QuickBilling from './Pages/SubPages-Landing/QuickBilling.jsx'
import Parties from './Pages/SubPages-Landing/Parties.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { store, persistor } from './app/store.js'
import { Provider } from 'react-redux'
import Feedback from './Pages/SubPages-Landing/feedback.jsx'
import Profile from './Pages/SubPages-Landing/profile.jsx'
import Pricing from './Pages/SubPages-Landing/Pricing.jsx'
import Documentation from './Pages/SubPages-Landing/documentation.jsx'
import Bill from './Components/bill.component.jsx'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "/", element: <Intro /> },

      { path: "/SignIn", element: <SignIn /> },

      { path: "/SignUp", element: <SignUp /> },

      { path: "/Register", element: <Register /> },

      { path: "/test", element: <Tex /> },

      {
        path: "/Landing"
        , element: <Landing />

        , children: [

          { path: "/Landing", element: <Dashboard /> },

          { path: "/Landing/Expense", element: <Expense /> },

          { path: "/Landing/Sales", element: <Sales /> },

          { path: "/Landing/Purchase", element: <Purchase /> },

          { path: "/Landing/Parties", element: <Parties /> },

          { path: "/Landing/QuickBilling", element: <QuickBilling /> },

          { path: "/Landing/QuickBilling/:id", element: <Bill /> },

          { path: "/Landing/Inventory", element: <Inventory /> },

          { path: "/Landing/feedback", element: <Feedback /> },

          { path: "/Landing/Profile", element: <Profile /> },

          { path: "/Landing/Pricing", element: <Pricing /> },

          { path: "/Landing/documentation", element: <Documentation /> },

          { path: "/Landing/expense", element: <Expense /> }
        ]

      }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>


    <PersistGate persistor={persistor}>

      <React.StrictMode>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </React.StrictMode>
    </PersistGate>

  </Provider>

)

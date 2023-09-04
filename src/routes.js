import React, { Suspense, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { actions } from 'slices/app.slice'
import { path } from 'utils/const'
import Fallback from 'components/Fallback'
import Spinner from 'components/Spinner'
import { OfferContextProvider } from 'context/offerContext'

/* const Auth = React.lazy(() => import('./pages/auth')) */
const Dashboard = React.lazy(() => import('./pages/dashboard'))
const Templates = React.lazy(() => import('./pages/templates'))
const Packs = React.lazy(() => import('./pages/pack'))
const CustomPack = React.lazy(() => import('./pages/custompack'))
const Form = React.lazy(() => import('./pages/form'))

function Router() {
  const dispatch = useDispatch()
  /* const { checked, loggedIn } = useSelector((state) => state.app) */
  const { checked } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(actions.authenticate())
  }, [])

  if (!checked) {
    return (
      <div className="app-loader-container">
        <Spinner size="4rem" color="white" isLoading />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <OfferContextProvider>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path={path.dashboard}>
              <Dashboard />
            </Route>
            <Route path={path.template}>
              <Templates />
            </Route>
            <Route path={path.packs}>
              <Packs />
            </Route>
            <Route path={path.custompacks}>
              <CustomPack />
            </Route>
            <Route path={path.form}>
              <Form />
            </Route>
            {/*  <Redirect to={path.dashboard} /> */}
          </Switch>
        </Suspense>
      </OfferContextProvider>
    </BrowserRouter>
  )
}

export default Router

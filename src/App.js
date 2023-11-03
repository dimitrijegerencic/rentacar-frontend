import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';
import DefaultLayout from "./components/layouts/defaultLayout/DefaultLayout";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";
import PageNotFound from "./pages/notFound/PageNotFound";
import ContextWrapper from "./context/wrapper/ContextWrapper";
import "./App.css"
import AdminPanel from "./pages/adminPanel/AdminPanel";
import AboutUsPage from "./pages/aboutUs/AboutUsPage";
import store from '../src/store/store';
import { Provider } from 'react-redux';
import MakeReservation from "./pages/makeReservation/MakeReservation";
import ReservationsPage from "./pages/reservations/ReservationsPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";

const router = createBrowserRouter(
    createRoutesFromElements (
        <>
            <Route path={'login'} element={<LoginPage/>} />
            <Route path={'sign-up'} element={<SignUpPage/>} />
            <Route path={'/'}  element={<ContextWrapper><DefaultLayout/></ContextWrapper>} errorElement={<PageNotFound/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'/reservations'} element={<ReservationsPage/>}/>
                <Route path={'/vehicles'} element={<VehiclesPage/>}/>
                <Route path={'/make-reservation/:id'} element={<MakeReservation/>}/>
                <Route path={'/about'} element={<AboutUsPage/>}/>
                <Route path={'/admin-panel'} element={<AdminPanel/>}/>
            </Route>
        </>
    )
)

function App() {
  return (
      <Provider store={store}>
          <div className={'App'}>
              <RouterProvider router={router}/>
          </div>
      </Provider>
  );
}

export default App;

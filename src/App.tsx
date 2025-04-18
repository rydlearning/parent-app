import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from "./utils/routes";
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/configureStore';


const router = createBrowserRouter(routes);

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
        <ToastContainer position='top-center' />
      </Provider>
  );
}

export default App;

import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect } from "react";
import { UserContext } from './context/UserContext';
import AppRoutes from './routers/AppRoutes';
import { useSelector } from 'react-redux';




function App() {

  const dataUserRedux = useSelector(state => state.user.account);
  console.log(">>>redux ",dataUserRedux)

  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])

  return (
    <>
      <div className='app-container'>

        <Header />
        <Container>
          <AppRoutes />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;

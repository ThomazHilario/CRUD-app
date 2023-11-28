import ContextProvider from './Context'
import { BrowserRouter } from 'react-router-dom'
import RoutePage from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            theme="light"
          />
          <RoutePage/>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App

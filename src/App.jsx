import ContextProvider from './Context'
import RoutePage from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <>
      <ContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          theme="light"
        />
        <RoutePage/>
      </ContextProvider>
    </>
  )
}

export default App

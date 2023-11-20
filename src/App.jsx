import RoutePage from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="light"
      />
      <RoutePage/>
    </>
  )
}

export default App

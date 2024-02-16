import ContextProvider from './Context'
import { BrowserRouter } from 'react-router-dom'
import RoutePage from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <>
      <Theme>    
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
      </Theme>
    </>
  )
}

export default App

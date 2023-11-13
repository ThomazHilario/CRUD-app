import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from '../Componentes/Home'
import Register from '../Componentes/Register'
import Error from '../Componentes/Error'
import Admin from '../Componentes/Admin'
import VerifyLogin from '../Componentes/VerifyLogin'

export default function RoutePage(){
    return(
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/admin/:id' element={<VerifyLogin> <Admin/> </VerifyLogin>}/>

                    {/* Pagina default */}
                    <Route path='*' element={<Error/>}/>
                </Routes>
        </BrowserRouter>
    )
}
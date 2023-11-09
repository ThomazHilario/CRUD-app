import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from '../Componentes/Home'

export default function RoutePage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}
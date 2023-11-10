import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from '../Componentes/Home'
import Register from '../Componentes/Register'
import Error from '../Componentes/Error'

export default function RoutePage(){
    // Style da main
    const mainCss = {
        backgroundColor:'#3682B3',
        height:'100vh',


        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }


    return(
        <BrowserRouter>
            <main style={mainCss}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>

                    {/* Pagina default */}
                    <Route path='*' element={<Error/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    )
}
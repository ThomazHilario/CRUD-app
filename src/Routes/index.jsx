import {useContext, useEffect} from 'react'
import {Context} from '../Context'
import { Routes, Route,} from 'react-router-dom'

// Componentes

import Home from '../Pages/Home'
import Register from '../Componentes/Register'
import Error from '../Componentes/Error'
import Admin from '../Pages/Admin'
import VerifyLogin from '../Componentes/VerifyLogin'
import Config from '../Componentes/Config'

// ------


export default function RoutePage(){

    // state - id
    const {setId} = useContext(Context)

    // ao renderizar o componente verificar se ja efetuou login
    useEffect(() => {
        // Função que guarda o id na state id
        function loadId(){
            if(localStorage.getItem('user') !== null){
                setId(JSON.parse(localStorage.getItem('user')).uid)
            }
        }

        // Executando loadId
        loadId()

    },[setId])

    return(
            <div id='container_admin'>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/admin/:idUser' element={<VerifyLogin> <Admin/> </VerifyLogin>}/>
                    <Route path='/config/:idUser' element={<VerifyLogin> <Config/> </VerifyLogin>}/>

                    {/* Pagina default */}
                    <Route path='*' element={<Error/>}/>
                </Routes>

            </div>
    )
}
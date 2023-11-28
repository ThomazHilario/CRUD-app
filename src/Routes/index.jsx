import {useContext} from 'react'
import {Context} from '../Context'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { auth } from '../Services/firebaseConnection'
import {signOut} from 'firebase/auth'
import Home from '../Componentes/Home'
import Register from '../Componentes/Register'
import Error from '../Componentes/Error'
import Admin from '../Componentes/Admin'
import VerifyLogin from '../Componentes/VerifyLogin'
import Config from '../Componentes/Config'


export default function RoutePage(){

    // state - id
    const {id} = useContext(Context)

    // state - campos forms
    const {setNome} = useContext(Context)
    const {setIdade} = useContext(Context)
    const {setEmail} = useContext(Context)
    const {setTelefone} = useContext(Context)

    
    // openModal - incluir
    function openModal(){
        /* modal cadastro */
        let modal = document.getElementById('modal_cadastro')

        if(modal.style.display === 'grid'){
            modal.style.display = 'none'
            document.getElementById('openModal').textContent = 'Incluir usuario'
        } else{
            modal.style.display = 'grid'
            document.getElementById('openModal').textContent = 'Fechar'

            setNome('')
            setIdade('')
            setEmail('')
            setTelefone('')
        }
    }

    // Logout
    async function logOutUser(){
        try {

            // Retornando a rota inicial
            <Navigate to='/' replace={true} />

            // Efetuando LogOut
            await signOut(auth)

            // Removendo dados da localStorage
            localStorage.removeItem('user')

        } catch (error) {
            console.log(error)
        }    
    }

    return(
            <div id='container_admin'>

                {/* Header */}
                <header className='bg-slate-800' id='header_flexivel'>
                    <button id='openModal' onClick={openModal}>Incluir usuario</button>
                    
                    <nav id='configuracoes'>
                        <Link id='configButton'  className='rounded-sm' to={`/config/${id}`}>Configurações</Link>
                        <button id='logoutUser' onClick={logOutUser}>Sair</button>
                    </nav>
                </header>


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
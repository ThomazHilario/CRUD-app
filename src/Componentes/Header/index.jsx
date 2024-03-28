import './header.css'
import {Link, Navigate} from 'react-router-dom'
import { auth } from '../../Services/firebaseConnection'
import { signOut } from 'firebase/auth'
import {useContext} from 'react'
import { Context } from '../../Context'
import { TiThMenu } from "react-icons/ti";
import defaultImg from '../../assets/icons/userDefault.png'

export default function Header(){

    const {id} = useContext(Context)
    
    // state - campos forms
    const {setNome} = useContext(Context)
    const {setIdade} = useContext(Context)
    const {setEmail} = useContext(Context)
    const {setTelefone} = useContext(Context)
    const {avatarUrl} = useContext(Context)

    // lightMode - context
    const{ lightMode } = useContext(Context)

    // Alterar o display do menu
    function openMenu(){
        const menu = document.getElementById('menu')

        if(menu.style.display === 'flex'){
            menu.style.display = 'none'
        } else{
            menu.style.display = 'flex'
        }
    }

    // openModal - incluir
    function openModal(){
        /* modal cadastro */
        let modal = document.getElementById('modal_cadastro')

        if(window.innerWidth > 420){
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
        } else{
            if(modal.style.display === 'flex'){
                modal.style.display = 'none'
                document.getElementById('openModal').textContent = 'Incluir usuario'
            } else{
                modal.style.display = 'flex'
                document.getElementById('openModal').textContent = 'Fechar'
    
                setNome('')
                setIdade('')
                setEmail('')
                setTelefone('')
            }
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

            // Removendo dados do themeMode
            localStorage.removeItem('themeMode')

        } catch (error) {
            console.log(error)
        }    
    }

    return(
        <header className={lightMode && 'lightModeHeader'} id='header_flexivel'>
            {/* menu Hamburguer */}
            <span id='menuHamburguer' onClick={openMenu}><TiThMenu size={'2em'} color='white'/></span>

            {/* Menu */}
            <menu id='menu'>
                <div id='imgPerfil'>
                    <input type='file' />

                    <img id='userImg' src={avatarUrl !== null ? avatarUrl : defaultImg} />

                    <button id='openModal' onClick={openModal}>Incluir usuario</button>
                </div>
                
                
                <nav id='configuracoes'>
                    <Link id='configButton'  className='rounded-sm' to={`/config/${id}`}>Configurações</Link>
                    <button id='logoutUser' onClick={logOutUser}>Sair</button>
                </nav>
            </menu>
        </header>
    )
}
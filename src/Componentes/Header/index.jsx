import './header.css'
import {Link, Navigate} from 'react-router-dom'
import { auth } from '../../Services/firebaseConnection'
import { signOut } from 'firebase/auth'
import {useContext} from 'react'
import { Context } from '../../Context'
import { TiThMenu } from "react-icons/ti";
import defaultImg from '../../assets/icons/userDefault.png'

// radix
import * as Dialog from '@radix-ui/react-dialog'

export default function Header(){

    const {id} = useContext(Context)
    
    // state - campos forms
    const { isAddPerson, setIsAddPerson } = useContext(Context)
    const {setNome} = useContext(Context)
    const {setIdade} = useContext(Context)
    const {setEmail} = useContext(Context)
    const {setTelefone} = useContext(Context)
    const {avatarUrl} = useContext(Context)

    // lightMode - context
    const{ lightMode } = useContext(Context)

    // openModal - incluir
    function openModal(e){
        if(isAddPerson){
            setIsAddPerson(false)

            setNome('')
            setIdade('')
            setEmail('')
            setTelefone('')

        } else{
            setIsAddPerson(true)
            e.target.textContent = 'Fechar'
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
        <header className={lightMode ? 'lightModeHeader' : undefined} id='header_flexivel'>

            <Dialog.Root>
                <Dialog.Trigger id='menu-bt-mobile'>
                    <TiThMenu size={30}/>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Content id='content-menu-mobile'>

                        <img id='userImg' src={avatarUrl !== null ? avatarUrl : defaultImg} />

                        <Dialog.Close className='openModal' onClick={openModal}>Incluir Usuario</Dialog.Close>

                        <Dialog.Close className='configButtonMobile'><Link to={`/config/${id}`}>Configurações</Link></Dialog.Close>

                        <Dialog.Close className='logoutUser' onClick={logOutUser}>Sair</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Menu */}
            <menu id='menu'>
                <div id='imgPerfil'>
                    <input type='file' />

                    <img id='userImg' src={avatarUrl !== null ? avatarUrl : defaultImg} />

                    <button className='openModal' onClick={openModal}>{isAddPerson ? 'Fechar' : 'Incluir usuario'}</button>
                </div>
                
                
                <nav id='configuracoes'>
                    <Link className='configButton' to={`/config/${id}`}>Configurações</Link>
                    <button className='logoutUser' onClick={logOutUser}>Sair</button>
                </nav>
            </menu>
        </header>
    )
}
import './admin.css'
import {useParams} from 'react-router-dom'
import {auth} from '../../Services/firebaseConnection'
import {signOut} from 'firebase/auth'
import { useState } from 'react'

export default function Admin(){
    // Id do usuario
    const {id} = useParams

    // state lista usuarios
    const [lista,setLista] = useState('')

    // state - campos forms
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const [telefone,setTelefone] = useState('')

    // Logout
    async function logOutUser(){
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <main>
            <header>
                <button id='addUser'>Incluir usuario</button>
                <button id='logoutUser' onClick={logOutUser}>Sair</button>
            </header>

            <div id='container_table'>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Acao</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                    </tbody>
                    
                </table>
            </div>
        </main>
    )
}
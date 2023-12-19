import './config.css'
import left from '../../assets/icons/left.png'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {auth, database} from '../../Services/firebaseConnection'
import {doc, deleteDoc} from 'firebase/firestore'
import {deleteUser} from 'firebase/auth'
import Header from '../Header'
export default function Config(){
    // id do usuario
    const {idUser} = useParams()

    // buscando informacoes do usuario
    useEffect(() => {

        let data = localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user')) : null

        setUser(data)
        
    },[])

    // state - user
    const [user, setUser] = useState({})

    // Deletar a conta - handleAccount
    async function handleAccount(e){
        try {
            // Cancelando envio do formulario
            e.preventDefault()

            // Deletando usuario
            deleteUser(auth.currentUser)

            // Deletando o banco de dados do usuario
            await deleteDoc(doc(database,'clientes',user.uid))

            // mensagem de sucesso
            alert('Conta deletada')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main id='main_config' className='bg-slate-900 flex'>
            
            <Header/>

            <div id='container_config'>

                <nav id='config_navigation'>
                    <Link to={`/admin/${idUser}`}><img src={left} alt='vetor de esquerda' id='imgVetor' /></Link>
                </nav>

                {/* Title config */}
                <h2 className='titleConfig'>Detalhes da conta</h2>

                <div id='container_delete'>
                    <form onSubmit={handleAccount}>
                        <div className='campos_form_config'>
                            <label>Id:</label>
                            <input type='text' defaultValue={user.uid} disabled/>
                        </div>


                        <div className='campos_form_config'>
                            <label>Email:</label>
                            <input type='email' defaultValue={user.email} disabled/>
                        </div>

                        <button type='submit'>Delete my account</button>
                    </form>
                </div>
            </div>
        </main>
    )
}
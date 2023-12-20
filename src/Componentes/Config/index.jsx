import './config.css'
import left from '../../assets/icons/left.png'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {auth, database} from '../../Services/firebaseConnection'
import {doc, deleteDoc} from 'firebase/firestore'
import {deleteUser} from 'firebase/auth'
import Header from '../Header'
import PropTypes from 'prop-types'


export default function Config(){
    // id do usuario
    const {idUser} = useParams()

    // buscando informacoes do usuario
    useEffect(() => {
        // Pegando informações na localStorage
        let data = localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user')) : null

        // Armazenando valor na staate user
        setUser(data)
        
    },[])

    // state - user
    const [user, setUser] = useState({})

    return (
        <main id='main_config' className='bg-slate-900 flex'>
            
            {/* Header component */}
            <Header/>

            <div id='container_config'>

                <nav id='config_navigation'>
                    <Link to={`/admin/${idUser}`}><img src={left} alt='vetor de esquerda' id='imgVetor' /></Link>
                </nav>

                {/* Title config */}
                <h2 className='titleConfig'>Detalhes da conta</h2>

                {/* Formulario de detalhes da conta */}
                <FormDetails uid={user.uid} email={user.email}/>

            </div>
        </main>
    )
}

// Component FormDetails
function FormDetails({uid,email}){

      // Deletar a conta - handleAccount
      async function handleAccount(e){
        try {
            // Cancelando envio do formulario
            e.preventDefault()

            // Deletando usuario
            deleteUser(auth.currentUser)

            // Deletando o banco de dados do usuario
            await deleteDoc(doc(database,'clientes',uid))

            // mensagem de sucesso
            alert('Conta deletada')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div id='container_delete'>
            
            {/* Formulario com detalhes da conta */}
            <form onSubmit={handleAccount}>

                <div className='campos_form_config'>
                    <label>Id:</label>
                    <input type='text' defaultValue={uid} disabled/>
                </div>


                <div className='campos_form_config'>
                    <label>Email:</label>
                    <input type='email' defaultValue={email} disabled/>
                </div>

                {/* button para excluir a conta */}
                <button type='submit'>Delete my account</button>
            </form>
        </div>
    )
}

// propTypes FormDetails
FormDetails.propTypes = {
    uid:PropTypes.node,
    email:PropTypes.node
}
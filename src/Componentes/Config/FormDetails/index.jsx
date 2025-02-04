// Firebase
import { auth, database } from '../../../Services/firebaseConnection'
import { doc, deleteDoc } from 'firebase/firestore'
import { deleteUser } from 'firebase/auth'

// Context 
import { useContext } from 'react'
import { Context } from "../../../Context"

// Css
import './form-details.css'

export function FormDetails({uid,email}){

    // Context
    const { lightMode } = useContext(Context)

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
        <section id='container_delete'>
            
            {/* Formulario com detalhes da conta */}
            <form onSubmit={handleAccount}>

                <div className='campos_form_config'>
                    <label className={lightMode ? 'camposConfigLight' : undefined}>Id:</label>
                    <input type='text' defaultValue={uid} disabled/>
                </div>


                <div className='campos_form_config'>
                    <label className={lightMode ? 'camposConfigLight' : undefined}>Email:</label>
                    <input type='email' defaultValue={email} disabled/>
                </div>

                {/* button para excluir a conta */}
                <button type='submit'>Delete my account</button>
            </form>
        </section>
    )
}
// import Dialog
import * as Dialog from '@radix-ui/react-dialog'

// imports react and context
import { useContext } from 'react'
import { Context } from '../../Context'

// import css
import './board.css'

// import Firebase
import { database } from '../../Services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'

export default function BoardEdit({idx, nomeCliente, idadeCliente, emailCliente, telefoneCliente, lista, setLista, idUser}){

    // states - context
    const {nome, setNome, idade, setIdade} = useContext(Context)
    const {telefone, setTelefone, email, setEmail} = useContext(Context)

    // Adicionando valores nas states.
    function addValuesInStates(){
        setNome(nomeCliente)
        setIdade(idadeCliente)
        setEmail(emailCliente)
        setTelefone(telefoneCliente)
    }

    // edit person
    async function editPerson(index){
        try {

            // Realizandoo modificacaoo no objeto especifico
            lista[index].nome = nome
            lista[index].idade = idade
            lista[index].email = email
            lista[index].telefone = telefone

            // Salvando na lista
            setLista(lista)

            // Referencia ao banco de dados
            const docRef = doc(database, 'clientes', idUser)

            // Atualizado no banco de dados
            await updateDoc(docRef,{
                clientes:[...lista]
            })

            // Limpado states
            setNome('')
            setIdade('')
            setEmail('')
            setTelefone('')

        } catch (e) {
            console.log(e)
        }

    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='btn-edit boardTrigger' id='editModal' onClick={addValuesInStates}>Editar</Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='boardOverlay'/>

                <Dialog.Content className='boardContent'>

                    <form>
                        <div className='boardContentFormDiv'>
                            <label>Nome:</label>
                            <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>

                        <div className='boardContentFormDiv'>
                            <label>Idade:</label>
                            <input type='text'value={idade} onChange={(e) => setIdade(e.target.value)}/>
                        </div>

                        <div className='boardContentFormDiv'>
                            <label>Email:</label>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='boardContentFormDiv'>
                            <label>Telefone:</label>
                            <input type='text' value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                        </div>

                        <Dialog.Close className='boardClose' onClick={() => editPerson(idx)}>Editar</Dialog.Close>
                    </form>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}
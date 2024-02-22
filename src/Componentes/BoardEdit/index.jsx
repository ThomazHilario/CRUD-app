// import Dialog
import * as Dialog from '@radix-ui/react-dialog'

// imports react and context
import { useContext } from 'react'
import { Context } from '../../Context'

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
            <Dialog.Trigger className='btn-edit w-[75px] bg-green-500' id='editModal' onClick={addValuesInStates}>Editar</Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay/>

                <Dialog.Content className='absolute left-1/2 top-[15rem] -translate-x-[7.10rem] -translate-y-1/2'>
                    <form className='bg-zinc-800 grid grid-cols-2 gap-y-4 gap-x-3 py-3 px-3 rounded-md'>
                        <div className='flex flex-col gap-3'>
                            <label>Nome:</label>
                            <input type='text' className='w-[200px] h-5 rounded-sm bg-blue-900/50 border-2 border-black text-white pl-1 py-[0.6rem]' value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Idade:</label>
                            <input type='text' className='w-[200px] h-5 rounded-sm bg-blue-900/50 border-2 border-black text-white pl-1 py-[0.6rem]' value={idade} onChange={(e) => setIdade(e.target.value)}/>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Email:</label>
                            <input type='email' className='w-[200px] h-5 rounded-sm bg-blue-900/50 border-2 border-black text-white pl-1 py-[0.6rem]' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Telefone:</label>
                            <input type='text' className='w-[200px] h-5 rounded-sm bg-blue-900/50 border-2 border-black text-white pl-1 py-[0.6rem]' value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                        </div>

                        <Dialog.Close className='flex justify-center items-center bg-green-500 w-20 h-8 font-bold text-white' onClick={() => editPerson(idx)}>Editar</Dialog.Close>
                    </form>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}
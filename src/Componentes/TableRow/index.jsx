import * as Dialog from '@radix-ui/react-dialog'

// Icon
import { FaAddressCard } from "react-icons/fa";

// imports Firebase
import {doc, updateDoc} from 'firebase/firestore'
import { database } from '../../Services/firebaseConnection';

// React e context
import { useContext } from 'react'
import { Context } from '../../Context';

// Componente para exibir os tr
export default function TableRow({ idx, CreatedDate, nomeCliente, idadeCliente, emailCliente, telefoneCliente,deleteUser, lista, setLista, idUser}){

    // Context
    const {nome, setNome, idade, setIdade} = useContext(Context)
    const {telefone, setTelefone, email, setEmail} = useContext(Context)

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
        <tr className='linha'>
            <td data-table="Nome:">{nomeCliente}</td>
            <td data-table="Idade:">{idadeCliente}</td>
            <td data-table="Email:">{emailCliente}</td>
            <td data-table="Telefone:">{telefoneCliente}</td>
            <td className='flex justify-start items-center gap-2 md:justify-center'>
                <Dialog.Root>
                    <Dialog.Trigger className=' w-[40px] h-[25px] bg-slate-600 flex justify-center items-center'><FaAddressCard size={20}/></Dialog.Trigger>

                    <Dialog.Portal>

                        <Dialog.Overlay className='fixed inset-0 bg-black/50 transition'/>

                        <Dialog.Content className='bg-slate-700 rounded-md w-[90vw] h-[35vh] absolute -translate-y-1/2 -translate-x-[55%] top-[35%] left-[55%] sm:w-[90vw] lg:w-[40vw]'>
                            <Dialog.Close className='bg-slate-900/50 flex justify-center items-center w-10 h-10 absolute right-0 top-0'>x</Dialog.Close>

                            <div className='p-7 mt-2 text-white flex flex-col gap-2'>
                                <h2 className='text-2xl mb-2'>Informações:</h2>
                                <p><strong>Data de registro</strong> : {CreatedDate}</p>
                                <p><strong>Nome</strong>: {nomeCliente}</p>
                                <p><strong>Idade</strong>: {idadeCliente} anos</p>
                                <p><strong>Email</strong>: {emailCliente}</p>
                                <p><strong>Telefone</strong>: {telefoneCliente}</p>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                
                <Dialog.Root>
                    <Dialog.Trigger className='btn-edit w-[75px] bg-green-500' id='editModal'>Editar</Dialog.Trigger>

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
                <button className='btn-delete w-[75px]' onClick={() => deleteUser(idx)}>Delete</button>
            </td>
        </tr>
    )
}

/*
<button className='btn-edit w-[75px]' id='editModal' onClick={() => openModalEdicao(idx)}>Editar</button>
*/
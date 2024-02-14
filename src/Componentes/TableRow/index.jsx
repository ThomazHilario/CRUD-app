import * as Dialog from '@radix-ui/react-dialog'

import { FaAddressCard } from "react-icons/fa";

// Componente para exibir os tr
export default function TableRow({ idx, nome, idade, email, telefone, openModalEdicao, deleteUser}){
    return(
        <tr className='linha'>
            <td data-table="Nome:">{nome}</td>
            <td data-table="Idade:">{idade}</td>
            <td data-table="Email:">{email}</td>
            <td data-table="Telefone:">{telefone}</td>
            <td className='flex justify-start items-center gap-2 md:justify-center'>
                <Dialog.Root>
                    <Dialog.Trigger className=' w-[40px] h-[25px] bg-slate-600 flex justify-center items-center'><FaAddressCard size={20}/></Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Content className='bg-slate-700 rounded-md w-[90vw] h-[35vh] absolute -translate-y-1/2 -translate-x-[55%] top-[35%] left-[55%] sm:w-[90vw] lg:w-[40vw]'>
                            <Dialog.Close className='bg-slate-900/50 flex justify-center items-center w-10 h-10 absolute right-0 top-0'>x</Dialog.Close>

                            <div className='p-7 mt-2 text-white flex flex-col gap-2'>
                                <h2 className='text-2xl mb-2'>Informações:</h2>
                                <p>Nome: {nome}</p>
                                <p>Idade: {idade} anos</p>
                                <p>Email: {email}</p>
                                <p>Telefone: {telefone}</p>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                <button className='btn-edit w-[75px]' id='editModal' onClick={() => openModalEdicao(idx)}>Editar</button>
                <button className='btn-delete w-[75px]' onClick={() => deleteUser(idx)}>Delete</button>
            </td>
        </tr>
    )
}
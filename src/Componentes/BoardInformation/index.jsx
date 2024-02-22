import * as Dialog from '@radix-ui/react-dialog'

// Icon
import { FaAddressCard } from "react-icons/fa";

export default function BoardInformation({CreatedDate, nomeCliente, idadeCliente, emailCliente, telefoneCliente}){
    return(
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
    )
}
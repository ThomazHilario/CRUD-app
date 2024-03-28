import * as Dialog from '@radix-ui/react-dialog'

// Icon
import { FaAddressCard, } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

//css
import './board.css'

export default function BoardInformation({CreatedDate, nomeCliente, idadeCliente, emailCliente, telefoneCliente}){
    return(
        <Dialog.Root>
            <Dialog.Trigger className='trigger'><FaAddressCard size={20}/></Dialog.Trigger>

            <Dialog.Portal>

                <Dialog.Overlay className='overlay'/>

                <Dialog.Content className='content'>
                    <Dialog.Close className='close'><IoMdClose color='white'/></Dialog.Close>

                    <div>
                        <h2>Informações:</h2>
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
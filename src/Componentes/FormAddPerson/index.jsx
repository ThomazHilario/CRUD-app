import { database } from '../../Services/firebaseConnection'
import {doc, updateDoc} from 'firebase/firestore'

// React hook form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Css
import './form-add-person.css'

// Schema
const schema = z.object({
    nome:z.string().min(1, 'Preencha o campo corretamente'),
    idade:z.string().min(1, 'Preencha o campo corretamente'),
    email:z.string().regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Este email não é válido!'),
    telefone:z.string().min(11, 'Número de telefone invalido').max(11)
}).required({
    email:true,
    idade:true,
    nome:true,
    telefone:true
})

// react
import { useContext } from 'react'

// context
import { Context } from '../../Context'

export function FormAddPerson({ lista, setLista,id }){

    // context
    const { setIsAddPerson } = useContext(Context)

    const { register, handleSubmit, formState:{errors} } = useForm({resolver:zodResolver(schema)})

    async function addPerson(data){
        try {

                // Alterando contexto
                setIsAddPerson(false)
                
                // Estrutura do chamado
                const objectStructure = {
                    createdDate:new Date().toLocaleDateString(),
                    nome:data.nome, 
                    idade:data.idade,
                    email:data.email,
                    telefone:`(${data.telefone.substring(0,2)}) ${data.telefone.substring(2,7)}-${data.telefone.substring(7,11)}`
                }

                // Setando a lista nova
                setLista([...lista, objectStructure])

                // Adicionando lista no banco de dados especifico
                await updateDoc(doc(database,'clientes',id),{
                    clientes: [...lista, objectStructure]
                })
                
        } catch (error) {
            console.log(error)
        }
    }

    const existErrorInInputField = (errorInput) => errorInput ? 'field__style__form__add__person field_error_validation' : 'field__style__form__add__person'

    return(
        <form className='modal' id='modal_cadastro' onSubmit={handleSubmit(addPerson)}>

            <div className='campo_nome'>
                <label>Nome:</label>
                <input type='text' className={existErrorInInputField(errors.nome)} {...register('nome')}/>
            </div>

            <div className='campo_idade'>
                <label>Idade:</label>
                <input type='text' className={existErrorInInputField(errors.idade)} {...register('idade')}/>
            </div>

            <div className='campo_telefone'>
                <label>Telefone:</label>
                <input type='tel' className={existErrorInInputField(errors.telefone)} {...register('telefone')}/>
            </div>

            <div className='campo_email'>
                <label>Email:</label>
                <input type='email' className={existErrorInInputField(errors.email)} {...register('email')}/>
            </div>

            <div>
                <button type='submit' id='btn-incluir'>Incluir</button>
            </div>
        </form>
    )
}
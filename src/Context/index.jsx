import {createContext, useState} from 'react'

// Criar um contexto
export const Context = createContext({})

export default function ContextProvider(children){

    // States - form
    const [nome,setNome] = useState('')
    const [idade,setIdade] = useState('')
    const [email,setEmail] = useState('')
    const [telefone,setTelefone] = useState('')

    // index
    const [index,setindex] = useState(null)

    return(
        <Context.Provider value={{nome, setNome, idade, setIdade, email, setEmail, telefone, setTelefone, index, setindex}}>
            {children}
        </Context.Provider>
    )

}
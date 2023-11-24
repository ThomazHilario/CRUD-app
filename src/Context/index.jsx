import {createContext, useState} from 'react'

// Criar um contexto
export const Context = createContext({})

export default function ContextProvider({children}){

    // id
    const [id,setId] = useState('')

    // States - form
    const [nome,setNome] = useState('')
    const [idade,setIdade] = useState('')
    const [email,setEmail] = useState('')
    const [telefone,setTelefone] = useState('')

    // index
    const [index,setindex] = useState(null)

    // state logado
    const [logado,setLogado] = useState(null)

    return(
        <Context.Provider value={{nome, setNome, idade, setIdade, email, setEmail, telefone, setTelefone, index, setindex, id, setId, logado, setLogado}}>
            {children}
        </Context.Provider>
    )

}
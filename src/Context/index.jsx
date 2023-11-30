import {createContext, useState} from 'react'

// Criar um contexto
export const Context = createContext({})

export default function ContextProvider({children}){

    // id
    const [id,setId] = useState('')

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
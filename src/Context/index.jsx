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
    const [avatarUrl, setAvatarUrl] = useState(null)

    // state logado
    const [logado,setLogado] = useState(null)

    // lightMode
    const [lightMode, setLightMode] = useState(false)

    return(
        <Context.Provider value={{nome, setNome, idade, setIdade, email, setEmail, telefone, setTelefone, id, setId, logado, setLogado, avatarUrl, setAvatarUrl, lightMode, setLightMode}}>
            {children}
        </Context.Provider>
    )

}

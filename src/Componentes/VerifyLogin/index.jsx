import { useEffect, useState } from 'react'
import { Navigate} from 'react-router-dom'
import { auth } from '../../Services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

export default function verifyLogin({children}){
    // state - logado
    const [logado,setLogado] = useState(null)

    useEffect(() => {
        async function login(){
            try {
                await onAuthStateChanged(auth,(user) => {
                    if(user){
                        setLogado(true)
                    } else{
                        setLogado(false)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        // Executando a função login
        login()
    },[])

    // Condição para retornar a rota inicial da pagina
    if(logado === false){
       return <Navigate to='/' replace={true} />
    }else{
        // Retornando o componente Admin
        return children
    } 
    
}
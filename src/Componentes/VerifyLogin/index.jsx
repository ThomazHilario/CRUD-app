import { useEffect, useContext } from 'react'
import { Context } from '../../Context'
import { Navigate} from 'react-router-dom'
import { auth } from '../../Services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

export default function VerifyLogin({children}){
    // state - logado
    const {logado,setLogado} = useContext(Context)

    // Verificando se o usuario ja fez o login antes
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

import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {auth} from '../../Services/firebaseConnection'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import './home.css'

function Home(){

    // Navigate
    const navigate = useNavigate()

    // useEffect para tirar o header e ver se o usuario ja efetuou login

    useEffect(() => {

        // Configurando header para a página
        document.getElementById('header_flexivel').style.display = 'none'
        document.getElementById('container_admin').style.gridTemplateColumns = 'none'

        // Verificando se o usuario ja efetuou o login
        async function loadAuth(){
            try {
                await onAuthStateChanged(auth,(user) => {
                    if(user){
                        navigate(`/admin/${user.uid}`)
                    } else{
                        setCarregado(true)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }

        loadAuth()
    },[navigate])

    // state - Carregado
    const [carregado, setCarregado] = useState(false)

    // States - input
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    // Logando usuario
    async function singInUser(e){
        try {
            // Cancelando envio do formulario
            e.preventDefault()   

            // Logando usuario
            const login = await signInWithEmailAndPassword(auth,email,password)

            // Mensagem de loading
            const id = toast.loading("Carregando")

            // navegando ate a pagina admin do usuario
            navigate(`/admin/${login.user.uid}`)


            // mensagem de sucesso
            toast.update(id,{render:'Seja Bem-vindo!', autoClose:1000, type:'success', isLoading:false})

            
        } catch (error) {
            
            // Condições de error no login
            switch (error.code) {
                case 'auth/invalid-login-credentials':
                    toast.error('Email ou senha invalidos')
                    break;
                case 'auth/invalid-email':
                    toast.error('Email invalido')
                    break
                case 'auth/missing-password':
                    toast.error('Preencha o campo de senha')   
                    break 
                default:
                    break;
            }
        }
    }
    
    // Renderizaçãao condicional
    if(carregado === false){
        return <main className='mainHome'><h1>Carregando</h1></main>
    }else{
        return(
            <main className='mainHome'>
                <form className='formStyle'>
                    {/* title form */}
                    <legend>Login</legend>
    
                    {/* container email */}
                    <div className='container_input'>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
    
                    {/* container Password */}
                    <div className='container_input'>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
    
                    {/* buttons */}
                    <button className='loginButton' onClick={singInUser}>Login</button>
                    
                    <p>Não tem uma conta ? <Link to="/register" id='linkCadastro'>Cadastre-se</Link></p>
                </form>
            </main>
        )
    }
}


export default Home
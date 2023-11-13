import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {auth} from '../../Services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import './home.css'

function Home(){
    // Navigate
    const navigate = useNavigate()

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

            // mensagem de sucesso
            alert('usuario logado')

            // navegando ate a pagina admin do usuario
            navigate(`/admin/${login.user.uid}`)

        } catch (error) {
            
            // Condições de error no login
            switch (error.code) {
                case 'auth/invalid-login-credentials':
                    alert('Email ou senha invalidos')
                    break;
                case 'auth/invalid-email':
                    alert('Email invalido')
                    break
                case 'auth/missing-password':
                    alert('Preencha o campo de senha')   
                    break 
                default:
                    break;
            }
        }
    }
    
    return(
        <main id='mainHome'>
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
                
                <p>Não tem uma conta ? <Link to="/register">Cadastre-se</Link></p>
            </form>
        </main>
    )
}


export default Home
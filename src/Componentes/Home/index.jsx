import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useForm } from 'react-hook-form'
import {auth} from '../../Services/firebaseConnection'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import './home.css'

function Home(){
    // Instanciando o hook form
    const { register, handleSubmit } = useForm()


    // Navigate
    const navigate = useNavigate()

    // useEffect para ver se o usuario ja efetuou login

    useEffect(() => {

        // Verificando se o usuario ja efetuou o login
        async function loadAuth(){
            try {
                // verificando se o usuario ja efetuou o login
                onAuthStateChanged(auth,(user) => {
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

    // Logando usuario
    async function singInUser(data){
        try { 
            // Logando usuario
            const login = await signInWithEmailAndPassword(auth,data.email,data.password)

            // Caso tenha user
            if(login.user){
                
                // Setando novamente o carregado para false
                setCarregado(false)
            }

            // Mensagem de loading
            const id = toast.loading("Carregando")

            // navegando ate a pagina admin do usuario
            navigate(`/admin/${login.user.uid}`)

            // Salvando informacoes do usuario na localStorage
            localStorage.setItem('user',JSON.stringify(login.user))

            // Salvando o themeMode inicial ao entrar no sistema
            localStorage.setItem('themeMode',JSON.stringify(false))

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
                <form className='formStyle' onSubmit={handleSubmit(singInUser)}>
                    {/* title form */}
                    <legend>Login</legend>
    
                    {/* container email */}
                    <div className='container_input'>
                        <label>Email:</label>
                        <input type="email" {...register('email', {required:true} )} id='email'/>
                    </div>
    
                    {/* container Password */}
                    <div className='container_input'>
                        <label>Password:</label>
                        <input type="password" {...register('password', {required:true} )} id='password'/>
                    </div>
    
                    {/* buttons */}
                    <button className='loginButton'>Login</button>
                    
                    <p>Não tem uma conta ? <Link to="/register" id='linkCadastro'>Cadastre-se</Link></p>
                </form>
            </main>
        )
    }
}


export default Home
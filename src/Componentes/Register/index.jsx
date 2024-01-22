import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {auth} from '../../Services/firebaseConnection'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import './register.css'

export default function Register(){
    // Importando o register eo handleSubmit do useForm
    const {register, handleSubmit} = useForm()

    // navigate
    const navigate = useNavigate()

    useEffect(() => {
        // Funcao que verifica se o usuario ja fez login
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

        // chamando a função loadAuth
        loadAuth()
    },[navigate])

    const [carregado,setCarregado] = useState(false)

    // Registrando usuario
    async function registrarUsuario(data){
        try {
            // Criando usuario
            const cadastro = await createUserWithEmailAndPassword(auth,data.email,data.password)

            // mensagem de sucesso
            toast.success('Usuario criado')

            // Salvando informações do usuário na localStorage
            localStorage.setItem('user',JSON.stringify(cadastro.user))

            // navegando ate a pagina
            navigate(`/admin/${cadastro.user.uid}`)

        } catch (error) {
            // Condições caso haja error de registro
            switch (error.code) {
                case 'auth/missing-password':
                    alert('Preencha o campo de senha!')
                    break;

                case 'auth/weak-password':
                    alert('A sua senha deve conter 6 caracteres')
                    break

                case 'auth/missing-email':
                    alert('Preencha o campo de email')
                    break 

                case 'auth/invalid-email':
                    alert('Email Invalido')
                    break
                
                case 'auth/email-already-in-use':
                    alert('Este email ja esta em uso')
                    break
                default:
                    break
            }
            
        }
    }

    if(carregado === false){
        return <main className='mainRegister'><h1>Carregando</h1></main>
    } else{
        return(
            <main className='mainRegister'>
                <form className='formStyle' onSubmit={handleSubmit(registrarUsuario)}>
                    {/* title form */}
                    <legend>Cadastro</legend>
    
                    {/* container email */}
                    <div className='container_input'>
                        <label>Email:</label>
                        <input type="email" {...register('email', { required: true })} id='email'/>
                    </div>
    
                    {/* container Password */}
                    <div className='container_input'>
                        <label>Password:</label>
                        <input type="password" {...register('password', { required: true })} id='password'/>
                    </div>
    
                    {/* buttons */}
                    <button className='registerButton'>Registrar</button>
                    
                    <p>Possui uma conta ? <Link to="/" id='linkLogin'>Conectar agora</Link></p>
                </form>
            </main>
        )
    }
}
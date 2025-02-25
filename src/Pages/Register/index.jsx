import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { auth, database } from '../../Services/firebaseConnection'
import { setDoc, doc } from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { myResolver } from '../../Services/schema-login-and-register-user'
import './register.css'

export default function Register(){
    // Importando o register eo handleSubmit do useForm
    const {register, handleSubmit} = useForm({resolver:myResolver})

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
                        setCarregado(false)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }

        // chamando a função loadAuth
        loadAuth()
    },[navigate])

    const [carregado,setCarregado] = useState(true)

    // Registrando informacoes do usuario
    async function registrandoInfos(id){
        await setDoc(doc(database,'clientes',id),{
            avatarUrl:null,
            clientes:[]
        })
    }

    // Registrando usuario
    async function registrarUsuario(data){
        try {
            // Criando usuario
            const cadastro = await createUserWithEmailAndPassword(auth,data.email,data.password)

            // mensagem de sucesso
            toast.success('Usuario criado')

            // Salvando informações do usuário na localStorage
            localStorage.setItem('user',JSON.stringify(cadastro.user))

            // Salvando o themeMode inicial ao entrar no sistema
            localStorage.setItem('themeMode',JSON.stringify(false))

            // Registrando informacoes no banco
            registrandoInfos(cadastro.user.uid)

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

    if(carregado){
        return <section className='sectionRegister'><h1>Carregando</h1></section>
    }
     
    return(
        <section className='sectionRegister'>
            <form className='formStyle' onSubmit={handleSubmit(registrarUsuario)}>
                {/* title form */}
                <legend>Cadastro</legend>

                {/* container email */}
                <div className='container_input'>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name='email' {...register('email')} id='email'/>
                </div>

                {/* container Password */}
                <div className='container_input'>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name='senha' {...register('password')} id='password'/>
                </div>

                {/* buttons */}
                <button className='registerButton'>Registrar</button>
                
                <p>Possui uma conta ? <Link to="/" id='linkLogin'>Conectar agora</Link></p>
            </form>
        </section>
    )
}
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './register.css'

export default function Register(){

    // States - input
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    return(
        <form className='formStyle'>
            {/* title form */}
            <legend>Cadastro</legend>

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
            <button className='registerButton'>Registrar</button>
            <p>Possui uma conta ? <Link to="/">Conectar agora</Link></p>
        </form>
    )
}
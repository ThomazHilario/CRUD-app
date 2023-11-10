import {useState} from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function Home(){

    // States - input
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    return(
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
            <button className='loginButton'>Login</button>
            <p>Não tem uma conta ? <Link to="/register">Cadastre-se</Link></p>
        </form>
    )
}


export default Home
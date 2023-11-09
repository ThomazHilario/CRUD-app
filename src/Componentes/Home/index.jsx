import {useState} from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function Home(){
    return(
        <form className='formStyle'>
            {/* title form */}
            <legend>Cadastro</legend>

            {/* container email */}
            <div className='container_input'>
                <label>Email:</label>
                <input type="email"/>
            </div>

            {/* container Password */}
            <div className='container_input'>
                <label>Password:</label>
                <input type="password"/>
            </div>

            {/* buttons */}
            <button className='loginButton'>Login</button>
            <p>Não tem uma conta ? <Link>Cadastre-se</Link></p>
        </form>
    )
}


export default Home
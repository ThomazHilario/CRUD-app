import { database } from '../../Services/firebaseConnection'
import {doc, updateDoc} from 'firebase/firestore'

export function FormAddPerson({nome, setNome, idade, setIdade, email, setEmail, telefone, setTelefone, lista, setLista,id}){

    async function addPerson(e){
        try {

            // Cancelando formulario
            e.preventDefault()
            
            // Mudando o display do Modal
            document.getElementById('modal_cadastro').style.display = 'none'

            // Mudando o valor do button
            document.getElementById('openModal').textContent = 'Incluir usuario'

           if(nome !== '' && idade !== '' && email !== '' && telefone !== ''){
                // Setando a lista nova
                setLista([...lista,{
                    createdDate:new Date().toLocaleDateString(),
                    nome:nome, 
                    idade:idade,
                    email:email,
                    telefone:`(${telefone.substring(0,2)}) ${telefone.substring(2,7)}-${telefone.substring(7,11)}`
                }])

                // Adicionando lista no banco de dados especifico
                await updateDoc(doc(database,'clientes',id),{
                    clientes: [...lista,{
                        createdDate:new Date().toLocaleDateString(),
                        nome:nome, 
                        idade:idade,
                        email:email,
                        telefone:`(${telefone.substring(0,2)}) ${telefone.substring(2,7)}-${telefone.substring(7,11)}`
                    }]
                })
                
                // Resetando os valores das states
                setNome('')
                setIdade('')
                setEmail('')
                setTelefone('')

           }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form className='modal' id='modal_cadastro'>

            <div className='campo_nome'>
                <label>Nome:</label>
                <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
            </div>

            <div className='campo_idade'>
                <label>Idade:</label>
                <input type='text' value={idade} onChange={(e) => setIdade(e.target.value)}/>
            </div>

            <div className='campo_telefone'>
                <label>Telefone:</label>
                <input type='tel' value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>

            <div className='campo_email'>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <button id='btn-incluir' onClick={addPerson}>Incluir</button>
            </div>
        </form>
    )
}
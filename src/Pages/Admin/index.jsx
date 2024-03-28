import './admin.css'
import {useParams} from 'react-router-dom'
import { database} from '../../Services/firebaseConnection'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import { useState,useEffect, useContext } from 'react'

// Context
import {Context} from '../../Context'

// Imports components
import Header from '../../Componentes/Header'
import { FormAddPerson } from '../../Componentes/FormAddPerson'
import { SelectionFilter } from '../../Componentes/SelectionFilter/inde'
import TableRow from '../../Componentes/TableRow'

export default function Admin(){
    // Id do usuario
    const {idUser} = useParams()

    // State global - id
    const {id, setId, setAvatarUrl} = useContext(Context)

    // state lista usuarios
    const [lista,setLista] = useState([])

    // state - seach
    const [seach, setSeach] = useState('')

    // state - selectValue
    const [selectValue, setSelectValue] = useState('Recentes')

    // state - filterList
    const filterList = seach !== '' ? lista.filter(item => item.nome.toLowerCase().includes(seach.toLowerCase())) : lista

    // pegando usuarios da lista
    useEffect(() => {

        // Setando id na state de id
        setId(idUser)

        //Função loadLista
        async function loadLista(){

            try{
                // Pegando a referencia do documento
                const docRef = doc(database,'clientes',idUser)

                // Pegando o documento
                const docSnap = await getDoc(docRef)

                // Condição caso tenha clientes
                if(docSnap.data().clientes){
                    // Salvando os usuarios na state clientes
                    setLista(docSnap.data().clientes)

                    // Salvando informações da conta na state conta
                    setAvatarUrl(docSnap.data().avatarUrl)

                    // Alterando o padding do container table
                    document.getElementById('container_table').style.padding = '10px'
                }

                
                
            }catch(e){
                console.log(e)
            }
        }

        // chamando funcao loadLista
        loadLista()
        
    },[setId, idUser, id, setAvatarUrl])

    // state - campos forms
    const {nome,setNome} = useContext(Context)
    const {idade,setIdade} = useContext(Context)
    const {email,setEmail} = useContext(Context)
    const {telefone,setTelefone} = useContext(Context)

    // lightMode
    const { lightMode } = useContext(Context)
 
    // deleteUser
    async function deleteUser(index){
        try {
            // Tirando usuario da lista
            lista.splice(index,1)

            // Setando nova lista na state lista
            setLista([...lista])

            // Pegando a referencia do banco de dados
            const docRef = doc(database,'clientes',id)

            // Fazendo a atualização da propriedade clientes
            await updateDoc(docRef,{
                clientes:lista
            })

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <main className={lightMode ? 'main_light' : 'main_admin'}>

            {/* header component */}
            <Header/>

            <div id='container_table'>

                {/* Modal de cadastro */}
                <FormAddPerson nome={nome} setNome={setNome} idade={idade} setIdade={setIdade} email={email} setEmail={setEmail} telefone={telefone} setTelefone={setTelefone} lista={lista} setLista={setLista} id={id} />

                <form id='formFilter'>

                    {/* input */}
                    <input type='text' className={lightMode ? 'colorSeachInput' : undefined} placeholder='Busque por um cliente cadastrado...' autoFocus value={seach} onChange={(e) => setSeach(e.target.value)}/>

                    {/* select */}
                    <SelectionFilter filterList={filterList} selectValue={selectValue} setSelectValue={setSelectValue}/>
                </form>

                <table className={lightMode ?'table_light' : undefined}>
                    <thead>
                        {lista.length > 0 ? <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ação</th>   
                        </tr> : <tr><th className='chamado'>Nenhum chamado</th></tr>}
                    </thead>

                    <tbody>
                        
                        {filterList.length > 0 && filterList.map((item,idx) => <TableRow
                        idUser={id}
                        key={idx}
                        idx={idx}
                        CreatedDate={item.createdDate} 
                        nomeCliente={item.nome} 
                        idadeCliente={item.idade} 
                        emailCliente={item.email} 
                        telefoneCliente={item.telefone}
                        deleteUser={deleteUser}
                        lista={lista}
                        setLista={setLista}
                        />)}

                    </tbody>
                    
                </table>
            </div>
        </main>
    )
}

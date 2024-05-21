// Components
import BoardInformation from '../BoardInformation';
import BoardEdit from '../BoardEdit';

// import css
import './tableRow.css'

// Componente para exibir os tr
export default function TableRow({ idx, CreatedDate, nomeCliente, idadeCliente, emailCliente, telefoneCliente, deleteUser, lista, setLista, idUser}){

    return(
        <tr className='linha'>
            <td data-table="Nome:">{nomeCliente}</td>
            <td data-table="Idade:">{idadeCliente}</td>
            <td data-table="Email:">{emailCliente}</td>
            <td data-table="Telefone:">{telefoneCliente}</td>
            <td className='tableDataActions'>

                <BoardInformation 
                CreatedDate={CreatedDate} 
                nomeCliente={nomeCliente} 
                idadeCliente={idadeCliente} 
                emailCliente={emailCliente} 
                telefoneCliente={telefoneCliente}
                />
                
                <BoardEdit idx={idx}
                nomeCliente={nomeCliente}
                idadeCliente={idadeCliente}
                emailCliente={emailCliente}
                telefoneCliente={telefoneCliente}
                lista={lista}
                setLista={setLista}
                idUser={idUser}
                />

                <button className='btn-delete' onClick={() => deleteUser(idx)}>Delete</button>
            </td>
        </tr>
    )
}
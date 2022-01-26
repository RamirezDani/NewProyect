// import React, { useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import NavbarComponent from "../shared/components/NavbarComponent";
import { useMutation } from '@apollo/client';
import { ELIMINA_UNDOC } from '../../BdMongoConf/graphql-operations';
import { ListaTodo} from '../../BdMongoConf/configBD';


export const ListUsers = () => {

    
    const { loading, data } = ListaTodo();
    const history = useHistory();
    // console.log(data);
    // console.log(data.listaUsuariosBDS);
    // const { id } = useParams()

    // useEffect(() => {
    //     ListaTodo()
    // }, [])

    // console.log(dataBd);

   
   

    const [delOneUser] =  useMutation(ELIMINA_UNDOC)
    const delOneUserGen = async (id,e) => {
        e.preventDefault();
        await delOneUser({
            variables: {
                _id:id
            }
        });
        history.push('/ModifyUsers')
    }

   
     return (

        <>
            <NavbarComponent />
            <div className="container mt-3 ">
                <div>{loading ? <span>Loading...</span> :
                    <div>
                        
                        <table className="table table-striped table-bordered 
                                           align-middle border-dark">

                            <thead className="table-dark">
                                <tr className="text-center">
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">ID Usuario</th>
                                    <th scope="col">Editar/Eliminar</th>

                                </tr>
                            </thead>

                            <tbody>

                                {
                                    data.listaUsuariosBDS.map((prod, index) => (

                                        <tr key={prod._id} className="text-center">
                                            {/* <th scope="row" >{index + 1}</th> */}
                                            <th className="col-md-1" scope="row" >{index + 1}</th>
                                            <td className="col-md-4">{prod.nombre}</td>
                                            <td className="col-md-4">{prod.tipo}</td>
                                            <td className="col-md-4">{prod.estado}</td>
                                            <td className="col-md-4">{prod._id}</td>
                                            
                                            <td >
                                                <div className="btn-group" role="group" aria-label="Borrar-Modificar">

                                                    <Link type="button" className="btn btn-outline-dark border-dark"
                                                        to={`/UpGenUsers/${prod._id}`}>
                                                        <i className="bi bi-brush"></i>
                                                    </Link>

                                                    <button className="btn btn-danger border-dark"
                                                        onClick={(e)=> delOneUserGen(prod._id,e)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>


                                                </div>
                                            </td>

                                        </tr>
                                    ))

                                }
                            </tbody>



                        </table>


                    </div>
                }
                </div>
            </div>
        </>
    )
}

export default ListUsers;

import React from 'react'
import NavbarComponent from "../shared/components/NavbarComponent";
import { useMutation } from '@apollo/client';
import { UPDT_ESTA_USUR } from '../../BdMongoConf/graphql-operations';
import { ListaTodo } from '../../BdMongoConf/configBD';
import { useHistory} from 'react-router-dom'

export const UpEstaUsers = () => {

    //CARGA LA BD
    const { loading, data } = ListaTodo();
    

   //SOBRESCRIBE LA BD
    const [modEstUser] = useMutation(UPDT_ESTA_USUR)
    const modOneEstGen = async (id, e) => {
           
                
        await modEstUser({
            variables: {
                _id: id,
                newEstado: e

            }
        });
        
    }

    const history = useHistory()
    const getObj = JSON.parse(sessionStorage.getItem("user"));
    const rolUsuario = getObj.tipo;
    if(rolUsuario!=="Administrador"){
        history.push('/' )
    }

    return (

        <>
            <NavbarComponent />
            <div className="container mt-3 ">
                <div>{loading ? <span>Loading...</span> :
                    <div>
                        <h4>Usuarios</h4>
                        <hr />
                    <form>
                        <table className="table table-striped table-bordered 
                                           align-middle border-dark">

                            <thead className="table-dark">
                                <tr className="text-center">
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Estado</th>

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
                                            <td className="col-md-4">
                                                <select value={prod.estado} onChange={(e) => modOneEstGen(prod._id, e.target.value)} 
                                                className="form-select text-secondary border-dark" >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="No Autorizado">No Autorizado</option>
                                                    <option value="Autorizado">Autorizado</option>
                                                </select>
                                            </td>

                                        </tr>
                                    ))

                                }
                            </tbody>



                        </table>


                    </form>
                    </div>
                }
                </div>
            </div>
        </>
    )
}

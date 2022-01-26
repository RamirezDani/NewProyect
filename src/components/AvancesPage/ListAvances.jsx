
import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import NavbarComponent from "../shared/components/NavbarComponent";
import {
    ListaInscEstudiante, ListaProy, AvancesUser,
    ListaProyectosLider
} from '../../BdMongoConf/configBD';

// window.location.reload();
export const ListAvances = () => {

    const getObj = JSON.parse(sessionStorage.getItem("user"));
    // const idUsuario = getObj._id;
    const rolUsuario = getObj.tipo;


    const [idProy, setIdProy] = useState('')
    const [tempSelectProy, setTempSelectProy] = useState('')
    const [listaInsc, setListaInsc] = useState([{}]);
    // const [listaAvanc, setListaAvanc] = useState([{}]);
    const [swt1, setSwt1] = useState(0)


    const { id } = useParams();


    //TRAE LAS INSCRIPCIONES DEL USUARIO
    const { ListInsEstu, load4 } = ListaInscEstudiante(id);

    // console.log(ListInsEstu.inscripcions[0].estadoInscrip);
    //TRAE TODOS LOS PROYECTOS
    const { proyecs } = ListaProy();
    // console.log(ListInsEstu);

    //PROYECTOS DEL LIDER
    const { proyecsLider } = ListaProyectosLider(id)
    //  setIdProy(proyecsLider.proyectos)
    // console.log(proyecsLider.proyectos[0]._id);

    //LISTA AVANCES POR PROYECTO    
    const { avanUser, load6 } = AvancesUser(idProy);
    // console.log(idProy);
    // console.log(avanUser);


    const history = useHistory()

    if (rolUsuario !== "Estudiante" && rolUsuario !== "Lider") {
        history.push('/')
    }
    // console.log(ListInsEstu.inscripcions.length);
    useEffect(() => {
        var listaNueva = [];
        let cont2 = 0;
        if (ListInsEstu && proyecsLider) {
            // setIdProy("61e616058faec52dd6959b77")
            // setIdProy(proyecsLider.proyectos[0]._id);
            // console.log(proyecsLider.proyectos);
            //SI NO HAY INSCRIPCIONES NO MUESTRA LA INTERFAZ
            if (ListInsEstu.inscripcions.length === 0 && rolUsuario === "Estudiante") {
                setSwt1(1)
                // console.log("1");
            }

            if (proyecs && ListInsEstu.inscripcions.length > 0 && rolUsuario === "Estudiante") {


                // setIdProy(ListInsEstu.inscripcions[0].idProyecto)
                for (let proy of ListInsEstu.inscripcions) {

                    //SI NINGUNA INSCRIPCIÓN ESTA ACEPTADA NO MUESTRA LA INTERFAZ
                    if (proy.estadoInscrip === "Pendiente") {
                        cont2++;
                        if (cont2 === ListInsEstu.inscripcions.length) {
                            setSwt1(1)
                            console.log("2");
                        }
                    }

                    for (let cont1 = 0; cont1 < proyecs.proyectos.length; cont1++) {
                        if (proy.idProyecto === proyecs.proyectos[cont1]._id && proy.estadoInscrip === "Aceptada") {
                            listaNueva.push({
                                "nombre": proyecs.proyectos[cont1].nombre,
                                "_id": proy.idProyecto,
                                "estado": proy.estadoInscrip
                            })
                            setListaInsc(listaNueva)
                            // console.log(listaInsc[0]._id);
                        }
                    }
                }
                // setIdProy(listaInsc[0]._id)
                // console.log(ListInsEstu.inscripcions[0].idProyecto);
                setIdProy(ListInsEstu.inscripcions[0].idProyecto)
            } else if (proyecsLider.proyectos.length > 0 && rolUsuario === "Lider") {
                let cont3 = 0;

                for (let proysLider of proyecsLider.proyectos) {

                    if (proysLider.estado === "Inactivo") {
                        cont3++;
                        if (proyecsLider.proyectos.length === cont3) {
                            setSwt1(1);
                        }
                    } else {
                        listaNueva.push({
                            "nombre": proysLider.nombre,
                            "_id": proysLider._id,
                            "estado": proysLider.estado
                        })
                        setListaInsc(listaNueva)

                    }


                }
                
                setIdProy(proyecsLider.proyectos[0]._id)

            }
        }



    }, [proyecs, ListInsEstu, rolUsuario, proyecsLider])




    //CAMBIA ESTADOS CUANDO ELIGE EL PROYECTO
    const muestraInfo = (e) => {
        const { value } = e.target;
        // console.log(value.split("/")[1]);
        // console.log(value.split("/")[0]);
        if (value.split("/")[1] === "Activo" || value.split("/")[1] === "Aceptada") {
            setIdProy(value.split("/")[0]);
            setTempSelectProy(value.split("/")[0] + "/" + value.split("/")[1])
            // console.log(value.split("/")[1]);
            // console.log(value.split("/")[0]);
        }
    }

    // console.log(listaInsc);
    return (

        <>
            <NavbarComponent />

            {
                load6 ? <span>Loading6...</span> :

                    <div className="container mt-3 ">
                        {swt1 === 0 ?

                            <div>
                                <h4 >Proyectos</h4>
                                <span>
                                    {load4 ? <span>Loading4...</span> :
                                        <select value={tempSelectProy} onChange={muestraInfo} className="form-select text-secondary border-dark" >
                                            {
                                                listaInsc.map((prod, index) => (
                                                    <option key={index} value={prod._id + "/" + prod.estado}> {prod.nombre}</option>
                                                )
                                                )
                                            }
                                        </select>}
                                </span>
                                <hr />

                                <div>
                                    <h4 >Avances</h4> {avanUser.avances.length === 0 ?
                                        <h5 className="text-center mt-3">AUN NO HAY AVANCES</h5>
                                        :

                                        <table className="table table-striped table-bordered 
                                           align-middle border-dark">

                                            <thead className="table-dark">
                                                <tr className="text-center">
                                                    <th scope="col">ID Avance</th>
                                                    <th scope="col">Fecha</th>
                                                    <th scope="col">Descripcion</th>
                                                    <th scope="col">Observacion</th>
                                                    <th scope="col">
                                                        {rolUsuario === "Estudiante" ? "Editar" : "Agregar"}

                                                    </th>


                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    avanUser.avances.map((prod) => (

                                                        <tr key={prod._id} className="text-center">
                                                            <th className="col" scope="row" >{prod._id}</th>
                                                            <td className="col">{prod.fechaAvan}</td>
                                                            <td className="col">{prod.descripcion}</td>
                                                            <td className="col">{prod.observacion}</td>
                                                            <td >{rolUsuario === "Estudiante" ?
                                                                <Link type="button" className="btn btn-success border-dark"
                                                                    to={`/UpGenInsc/${prod._id}-${idProy}`}>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </Link>
                                                                :
                                                                <Link type="button" className="btn btn-success border-dark"
                                                                    to={`/AgregaObservacion/${prod._id}-${idProy}`}>

                                                                    <i className="bi bi-file-earmark-post"></i>
                                                                </Link>
                                                            }
                                                            </td>

                                                        </tr>
                                                    ))

                                                }
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>

                            :
                            <h5 className="text-center mt-3">NO HAY PROYECTOS ACTIVOS</h5>
                        }

                    </div>
            }

        </>
    )
}

export default ListAvances;

import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavbarComponent from '../shared/components/NavbarComponent'
import { INSERTA_AVANCE, UPDT_PROY_FASE } from '../../BdMongoConf/graphql-operations'
import { useMutation } from '@apollo/client'
import { ListaInscEstudiante, ListaProy, AvancesUser } from '../../BdMongoConf/configBD';


export const RegiAvances = () => {



    const [nombreProy, setNombreProy] = useState('')
    const [idProy, setIdProy] = useState('')
    const [nombreTuto, setNombreTuto] = useState('')
    const [fechaAvan, setFechaAvan] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [aportes, setAportes] = useState('')
    const [listaInsc, setListaInsc] = useState([{}]);
    const [swt1, setSwt1] = useState(0);
    let id2 = "";
    let idUserPass = "";

    const { id } = useParams();
    // console.log(id.includes("-"));
    if (id.includes("-")) {
        id2 = id.split("-")[0]
        idUserPass = id.split("-")[1]
    } else {
        id2 = id
    }

    const history = useHistory()
    const getObj = JSON.parse(sessionStorage.getItem("user"));
    const rolUsuario = getObj.tipo;
    if (rolUsuario !== "Estudiante") {
        history.push('/')
    }

    // console.log(id2);
    // console.log(idUserPass);
    //TRAE LAS INSCRIPCIONES DEL USUARIO
    //61be5c00649f5fc55f43e863
    const { ListInsEstu, load4 } = ListaInscEstudiante(id2);
    // console.log(ListInsEstu);
    const { avanUser } = AvancesUser(idProy);
    const [upFaseProyecs] = useMutation(UPDT_PROY_FASE)



    //TRAE TODOS LOS PROYECTOS
    const { proyecs } = ListaProy();



    const getFechaAct = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            // console.log(`${day}-0${month}-${year}`)
            return (`${year}-0${month}-${day}`)
        } else {
            // console.log(`${day}-${month}-${year}`)
            return (`${year}-${month}-${day}`)
        }
    }

    useEffect(() => {
        var listaNueva = [];
        let cont2 = 0;


        if (proyecs && ListInsEstu) {
            // console.log(ListInsEstu.inscripcions);
            if (ListInsEstu.inscripcions.length <= 0) {
                setSwt1(1)
                
            }

                for (let proy of ListInsEstu.inscripcions) {

                    if(proy.estadoInscrip==="Pendiente"){
                        cont2++;
                        if(cont2===ListInsEstu.inscripcions.length){
                            setSwt1(1)
                        }
                    }
                    
                    // console.log(proyecs.proyectos.length);
                    for (let cont1 = 0; cont1 < proyecs.proyectos.length; cont1++) {

                        if (proy.idProyecto === proyecs.proyectos[cont1]._id && proy.estadoInscrip === "Aceptada") {
                            listaNueva.push({
                                "nombre": proyecs.proyectos[cont1].nombre,
                                "id": proy.idProyecto,
                                "nomLid": proyecs.proyectos[cont1].nombreLider
                            })
                            setListaInsc(listaNueva)
                        }
                    }

                    //CARGA LOS PRIMEROS DATOS DE REGISTRO QUE ENCENTRA EN LA BD DE REGISTRO
                    //DEL UDSUARIO
                    
                    if(proy.estadoInscrip === "Aceptada"){
                        if (id.includes("-")) {
                            
    
                            if (idUserPass === listaNueva[cont2].id) {
    
                                setNombreProy(listaNueva[cont2].nombre)
                                setIdProy(listaNueva[cont2].id)
                                setNombreTuto(listaNueva[cont2].nomLid)
                                setFechaAvan(getFechaAct())
                            }
    
                            cont2++;
    
                        } else {
    
    
                            setNombreProy(listaNueva[0].nombre)
                            setIdProy(listaNueva[0].id)
                            setNombreTuto(listaNueva[0].nomLid)
                            setFechaAvan(getFechaAct())
                        }
                        setSwt1(0)
                    }                    
                }            

        }else{
            setSwt1(1)
        }
    }, [proyecs, ListInsEstu, id, idUserPass])


    // CREA UN NUEVO DOCUMENTO
    const [createAvance] = useMutation(INSERTA_AVANCE);
    const createAvanceNew = async (e) => {
        e.preventDefault();

        if (avanUser) {
            // console.log(avanUser.avances.length);
            if (avanUser.avances.length === 0) {

                await upFaseProyecs({
                    variables: {
                        _id: idProy,
                        newFase: "Desarrollo"
                    }
                })
            }
        }


        await createAvance({
            variables: {
                newIdProy: idProy,
                newFechaAvan: new Date(),
                newDescripcion: aportes,
                newObservacion: ""
            }
        });
        history.push('/ListAvances/' + id2)
        window.location.reload();
    };

    //CAMBIA ESTADOS CUANDO ELIGE EL PROYECTO
    const muestraInfo = (e) => {

        const { value } = e.target;
        const tempNom = value.split("/")[1];
        const tempIdProy = value.split("/")[0];
        const tempNomLi = value.split("/")[2];

        setNombreProy(tempNom)
        setIdProy(tempIdProy)
        setNombreTuto(tempNomLi)
    }


    return (

        <>
            <NavbarComponent />
            {swt1 === 0 ?
                <div className="container">
                    <hr />
                    <span>
                        {load4 ? <span>Loading4...</span> :
                            <select value={idProy + "/" + nombreProy + "/" + nombreTuto} onChange={muestraInfo} className="form-select text-secondary border-dark" >

                                {
                                    listaInsc.map((prod, index) => (
                                        <option key={index} value={prod.id + "/" + prod.nombre + "/" + prod.nomLid}> {prod.nombre}</option>
                                    )
                                    )

                                }

                            </select>}
                    </span>


                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <hr />
                                <div className="card border-dark">
                                    <div className="card-header text-white text-center bg-info border-dark">
                                        <h3>Registro de Avance</h3>
                                    </div>


                                    <div className="card-body text-primary">

                                        <div className="container row text-center">

                                            <h6 className="col card-title ">Nombre del Proyecto</h6>
                                            <h6 className="col card-title ">ID del Proyecto</h6>
                                            <h6 className="col card-title ">Nombre del Tutor</h6>
                                            <h6 className="col card-title ">Fecha de Avance</h6>

                                        </div>

                                        <div className="container row justify-content-around ">

                                            {/* <h6 className="card-title ">Nombre del Proyecto</h6> */}
                                            <input className="col form-control border-white text-center"
                                                type="text"
                                                placeholder="Nombre del Proyecto"
                                                value={nombreProy}
                                                readOnly
                                            // onChange={(event) => setNombre(event.target.value)}
                                            ></input>

                                            {/* <h6 className="card-title pt-2">ID Proyecto</h6> */}
                                            <input className="col mr-3 form-control border-white text-center"
                                                type="text"
                                                placeholder="ID del Proyecto"
                                                value={idProy}
                                                readOnly
                                            ></input>

                                            {/* <h6 className="card-title pt-2">Nombre del Tutor</h6> */}
                                            <input className="col form-control border-white text-center"
                                                type="text"
                                                placeholder="Nombre del Tutor"
                                                value={nombreTuto}
                                                readOnly
                                            ></input>

                                            {/* <h6 className="card-title pt-2">Fecha de Avance</h6> */}
                                            <input className="col form-control border-white text-center"
                                                type="text"
                                                placeholder="Fecha de Avance"
                                                value={fechaAvan}
                                                readOnly
                                            ></input>


                                        </div>
                                    </div>


                                </div>

                            </form>
                        </div>
                    </div>
                    <hr />

                    {/* //SECCION PARA REGISTRAR AVACES Y OBSERVACIONES */}
                    <div className="row">
                        <div className="col-lg-12 ">
                            <form>
                                <div className="card border-dark">



                                    <div className="card-body text-primary">

                                        <h6 className="card-title ">Aportes:</h6>
                                        <textarea className="form-control border-dark "
                                            rows="8"
                                            type="text"
                                            placeholder="Aportes del Estudiante"
                                            value={aportes}
                                            onChange={(event) => setAportes(event.target.value)}
                                        ></textarea>

                                        <h6 className="card-title pt-2">Observaciones:</h6>
                                        <textarea className="form-control border-dark"
                                            rows="3"
                                            type="text"
                                            placeholder="Observaciones del Tutor"
                                            value={observaciones}
                                            onChange={(event) => setObservaciones(event.target.value)}
                                            readOnly
                                        ></textarea>
                                    </div>

                                    <div className="d-flex justify-content-between">

                                        <div className="card-body">
                                            <Link type="button" className="btn btn-secondary border-dark"
                                                to={"/ListAvances/" + id2}>Atras</Link>
                                        </div>

                                        <div className="card-body text-end">
                                            <button type="submit"
                                                className="btn btn-info border-dark text-white"
                                                onClick={createAvanceNew}>
                                                Guardar
                                            </button>

                                        </div>


                                    </div>

                                </div>

                            </form>
                            <hr />
                        </div>

                    </div>
                </div>
                :
                <h5 className="text-center mt-3">AUN NO TIENE PROYECTOS APROBADOS</h5>}
        </>
    )
}







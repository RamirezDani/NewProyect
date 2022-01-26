import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavbarComponent from '../shared/components/NavbarComponent'
import { INSR_PROJECT } from '../../BdMongoConf/graphql-operations'
import { useMutation } from '@apollo/client'
import { ListaUsersLider } from '../../BdMongoConf/configBD';

export const RegiProjects = () => {



    const { nomLid } = useParams()
    // console.log(nomLid);
    const history = useHistory()
    const [nombre, setNombre] = useState('');
    const [presuesto, setPresuesto] = useState('');
    const [objGenerales, setObjGenerales] = useState('');
    const [objEspecificos, setObjEspecificos] = useState('');
    const [laFecha, setLaFecha] = useState('');
    const [laFechaFinal, setLaFechaFinal] = useState('');
    const [nomLider, setNomLider] = useState('');
    const [idLider, setIdLider] = useState('');

    const getObj = JSON.parse(sessionStorage.getItem("user"));
    const idUsuario = getObj._id;
    const rolUsuario = getObj.tipo;
    if (rolUsuario !== "Lider") {
        console.log(rolUsuario);
        history.push('/')
    }

    const { listaLideres, load8 } = ListaUsersLider();



    useEffect(() => {

        let date = new Date()
        const getFechaAct = () => {

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

        setLaFecha(getFechaAct())

        if (listaLideres && rolUsuario === "Administrador") {

            setNomLider(listaLideres.listaUsuariosBDS[0].nombre);
            setIdLider(listaLideres.listaUsuariosBDS[0]._id);

        } else if (rolUsuario === "Lider") {

            // console.log("LIDERSI");
            setNomLider(nomLid);
            setIdLider(idUsuario)
        }
    }, [listaLideres, nomLid, idUsuario, rolUsuario])

    const saveIdLider = () => {
        for (let usuario of listaLideres.listaUsuariosBDS) {
            if (nomLider === usuario.nombre) {
                setIdLider(usuario._id)
            }
        }
    }



    // CREA UN NUEVO DOCUMENTO
    const [createProy] = useMutation(INSR_PROJECT);
    const createProyecto = async (e) => {
        e.preventDefault();


        await createProy({
            variables: {
                newNombre: nombre,
                newNombreLider: nomLider,
                newObjGen: objGenerales,
                newObjEsp:objEspecificos,
                newPresupuesto:presuesto,                
                newFechaIni: new Date(laFecha),
                newFechaFinal:  new Date(laFechaFinal),
                newIdLider: idLider,
                newEstado: "Inactivo",
                newFase: "null"
            }
        });
        history.push('/ListProjects/' + idUsuario)
        window.location.reload();
    };



    return (

        <>
            <NavbarComponent />
            <div className="container">
                <div className="row">
                    <div>{load8 ? <span>Loading8...</span> :
                        <div >
                            {/* VISTA-ADMINISTRADOR */}
                            {rolUsuario === "Administrador" ?
                                <form>
                                    <div className="d-flex justify-content-center mt-5">
                                        <div className="card border-dark">
                                            <div className="card-header text-white bg-info border-dark">
                                                <h3>Nuevo Proyecto</h3>
                                            </div>


                                            <div className="card-body text-primary">
                                                <h6 className="card-title ">Nombre del Proyecto</h6>
                                                <input className="form-control border-dark"
                                                    type="text"
                                                    placeholder="Nombre"
                                                    value={nombre}
                                                    onChange={(event) => setNombre(event.target.value)}
                                                ></input>

                                                <h6 className="card-title mt-3">Fecha de Inscripción</h6>
                                                <input className="form-control border-dark"
                                                    type="date"
                                                    value={laFecha}
                                                    onChange={(e) => setLaFecha(e.target.value)}
                                                ></input>

                                                <h6 className="card-title mt-3">Nombre del Líder</h6>
                                                <select onClick={saveIdLider} onChange={(event) => setNomLider(event.target.value)} className="form-select text-secondary border-dark" >

                                                    {listaLideres.listaUsuariosBDS.map((proy, index) => (
                                                        <option key={index} value={proy.nombre}>{proy.nombre}</option>
                                                    ))
                                                    }
                                                </select>


                                            </div>

                                            <div className="d-flex justify-content-between">

                                                <div className="card-body">
                                                    <Link type="button" className="btn btn-secondary border-dark"
                                                        to={"/ListProjects/" + idUsuario} >Atras</Link>
                                                </div>

                                                <div className="card-body text-end">
                                                    <button type="submit"
                                                        className="btn btn-info border-dark text-white"
                                                        onClick={createProyecto}>
                                                        Guardar
                                                    </button>

                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </form>
                                :
                                //VISTA- LIDER
                                <form>
                                    <br />
                                    <div className="col-lg-12 ">
                                        <div className="card border-dark">
                                            <div className="card-header text-white bg-info border-dark">
                                                <h3>Nuevo Proyecto</h3>
                                            </div>


                                            <div className="card-body text-primary">
                                                <h6 className="card-title ">Nombre del Proyecto</h6>
                                                <input className="form-control border-dark"
                                                    type="text"
                                                    placeholder="Nombre"
                                                    value={nombre}
                                                    onChange={(event) => setNombre(event.target.value)}
                                                ></input>

                                                <h6 className="card-title mt-3">Presupuesto</h6>
                                                <input className="form-control border-dark"
                                                    type="text"
                                                    placeholder="Presupuesto"
                                                    value={presuesto}
                                                    onChange={(event) => setPresuesto(event.target.value)}
                                                ></input>

                                                <h6 className="card-title mt-3">Fecha de Inicio</h6>
                                                <input className="form-control border-dark"
                                                    type="date"
                                                    value={laFecha}
                                                    onChange={(e) => setLaFecha(e.target.value)}
                                                ></input>

                                                <h6 className="card-title mt-3">Fecha de Terminación</h6>
                                                <input className="form-control border-dark"
                                                    type="date"
                                                    value={laFechaFinal}
                                                    onChange={(e) => setLaFechaFinal(e.target.value)}
                                                ></input>

                                                <h6 className="card-title mt-2 ">Objetivos Generales</h6>
                                                <textarea className="form-control border-dark "
                                                    rows="3"
                                                    type="text"
                                                    placeholder="Objetivos Generales"
                                                    value={objGenerales}
                                                onChange={(event) => setObjGenerales(event.target.value)}
                                                ></textarea>

                                                <h6 className="card-title mt-2 ">Objetivos Especificos</h6>
                                                <textarea className="form-control border-dark "
                                                    rows="6"
                                                    type="text"
                                                    placeholder="Objetivos Especificos"
                                                    value={objEspecificos}
                                                onChange={(event) => setObjEspecificos(event.target.value)}
                                                ></textarea>



                                            </div>

                                            <div className="d-flex justify-content-between">

                                                <div className="card-body">
                                                    <Link type="button" className="btn btn-secondary border-dark"
                                                        to={"/ListProjects/" + idUsuario} >Atras</Link>
                                                </div>

                                                <div className="card-body text-end">
                                                    <button type="submit"
                                                        className="btn btn-info border-dark text-white"
                                                        onClick={createProyecto}>
                                                        Guardar
                                                    </button>

                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </form>

                            }
                        </div>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}







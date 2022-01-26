import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ListaUno } from "../../../BdMongoConf/configBD"

function NavbarComponent() {


    const [nombreUsuario, setNombreUsuario] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('')
    const [idUsuario, setIdUsuario] = useState('')

    const getObj = JSON.parse(sessionStorage.getItem("user"));
    
    const { data } = ListaUno(getObj._id)

    useEffect(() => {

        if (data) {

            setNombreUsuario(data.listaUsuariosBD.nombre)
            setTipoUsuario(data.listaUsuariosBD.tipo)
            setIdUsuario(data.listaUsuariosBD._id)
        }

    }, [data])




    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <img src="https://m.media-amazon.com/images/I/318YZE-sfyL._AC_SY355_.jpg" alt="" width="50" height="44" className="d-inline-block align-text-top" /> */}
                    <img src="https://www.pikpng.com/pngl/m/26-261403_happy-family-icon-png-png-download-family-icon.png" alt="" width="50" height="44" className="d-inline-block align-text-top" />
                    
                    
                    <h2>Academy</h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {/* ESTUDIANTE */}
                        {tipoUsuario === "Estudiante" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                               
                                {/* PROYECTOS */}
                                <li>
                                    <Link to={'/ListProjects/' + idUsuario} className="nav-link">Proyectos</Link>
                                    
                                </li>

                                {/* AVANCES */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/">Avances</a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to={'/RegiAvances/' + idUsuario} className="nav-link">Registrar</Link>
                                        </li>
                                        <li>
                                            <Link to={'/ListAvances/' + idUsuario} className="nav-link">Listar</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            :
                            ""
                        }

                        {/* LIDER */}
                        {tipoUsuario === "Lider" ?

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {/* PROYECTOS */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false">Proyectos</a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to={'/RegiProjects/create/' + nombreUsuario} className="nav-link">Registrar</Link>
                                            <Link to={'/ListProjects/' + idUsuario} className="nav-link">Proyectos</Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* AVANCES */}

                                <li>
                                    <Link to={'/ListAvances/'+ idUsuario} className="nav-link">Avances</Link>
                                </li>

                            </ul>

                            :
                            ""
                        }

                        {/* ADMINISTRADOR */}
                        {tipoUsuario === "Administrador" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {/* PROYECTOS */}
                               
                                        <li>
                                            <Link to={'/ListProjects/' + idUsuario} className="nav-link">Proyectos</Link>
                                        </li>
                                   
                                {/* USUARIOS */}
                                
                                        <li>
                                            <Link to='/UpEstaUsers' className="nav-link">Usuarios</Link>
                                        </li>                               
                           

                            </ul>

                            :
                            ""
                        }

                        <br />

                    </div>

                    <span>{tipoUsuario}</span>&nbsp;
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <i className="bi bi-person-circle mt-2"></i>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false">{nombreUsuario}</a>
                            <ul className="dropdown-menu">
                                <li className="nav-item dropdown">
                                    <Link to={'/UpGenUsers/' + idUsuario} className="nav-link">Perfil</Link>
                                    <Link to="/" className="nav-link">Salir</Link>
                                </li>

                            </ul>
                        </li>

                    </ul>


                </div>


            </nav>
        </Fragment>
    )
}
export default NavbarComponent;
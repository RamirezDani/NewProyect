
import React, { useState, Fragment } from "react";
import { Link, useHistory } from 'react-router-dom';
import { ListaTodo } from '../../BdMongoConf/configBD'



function LoginPage() {

    const history = useHistory()
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { data } = ListaTodo()
    const [errorCorreo,setErrorCorreo] = useState('');
    const [errorContrasena,setErrorContrasena] = useState('');
    
    
    const validaInUser = (e)=>{
        e.preventDefault();
                
        if (data) {
            
            for (let usuarios of data.listaUsuariosBDS) {
                
                if (correo === usuarios.correo && password=== usuarios.contrasena) {
                    
                    sessionStorage.setItem("user",JSON.stringify(usuarios));
                    history.push('/HomePage/'+usuarios.tipo)
                    
                }else{
                    setErrorCorreo("Datos Incorrectos")
                    setErrorContrasena("Datos Incorrectos")
                }
            }
        }
    }


    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <br />
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_960_720.jpg" className="d-block w-100" alt="..." height="600" />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://cdn.pixabay.com/photo/2018/03/21/07/16/learning-3245793_960_720.jpg" className="d-block w-100" alt="..." height="600" width="500" />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://cdn.pixabay.com/photo/2021/12/02/16/46/graduation-6840941_960_720.png" className="d-block w-100" alt="..." height="600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <br /><br /><br />
                        <div className="container">
                            <br /><br /><br />
                            <h1>
                                Bienveni@ a Academy
                            </h1>
                            <br /><br />


                            <form onSubmit={validaInUser}>
                            <div className="form-floating mb-3">
                                {/* <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" /> */}
                                <input className={"form-control border-dark " + (errorCorreo?"is-invalid":'')}
                                    
                                    type="text"
                                    placeholder="correo"
                                    value={correo}
                                    onChange={(event) => setCorreo(event.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">Correo electrónico</label>
                                <div className="invalid-feedback mb-2">
                                    {errorCorreo}
                                </div>
                            </div>
                            <div className="form-floating">
                                {/* <input type="password" className="form-control" id="floatingPassword" placeholder="Password" /> */}
                                <input className={"form-control border-dark " + (errorContrasena?"is-invalid":'')}
                                    type="password"
                                    placeholder="contaseña"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                ></input>
                                <label htmlFor="floatingPassword">Contraseña</label>
                                <div className="invalid-feedback mb-2">
                                    {errorContrasena}
                                </div>
                            </div>
                            <div className="row">

                                <div className="d-flex justify-content-between mt-3">
                                    <Link type="button" className="btn btn-primary border-dark"
                                        to={`/RegiUsers/create`}>
                                        Registrase
                                    </Link>

                                    <button type="submit" className="btn btn-info border-dark text-white"
                                        >
                                        Entrar
                                    </button>
                                </div>


                            </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default LoginPage;
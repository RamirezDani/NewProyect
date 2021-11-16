
import React, { Fragment, useEffect } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { consultaDb, guardarDb } from "../config/firebase";





function LoginPage() {
    // let history = useHistory();
    const history = useHistory();
    var loginp;

    useEffect(() => {

        if (loginp && loginp.token) { history.replace("/productos"); }
    }, [loginp]);

    async function baseDatos(producto) {
        await guardarDb('lista-usuarios', producto);
        //const listatempo = await consultaDb('lista-usuarios');
        //console.log("consulta base de datos: ")
        //console.log(listatempo)

    }

    function responseGoogle(response) {
        //alert("hola")

        if (response.accessToken)
            if (response.nt.Yt) {
                console.log("login")
                loginp = response;
                console.log(response.nt.Yt)//correo
                console.log(response.nt.Se)//nombre
                const producto = {
                    "email": response.nt.Yt,
                    
                    "estado": "Pendiente",
                    "rol": "Sin Rol"
                }


                baseDatos(producto);

                history.replace("/productos")

            }




    }

    return (
        <Fragment>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <br />
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="https://images-platform.99static.com/tk7ByD7lDWii-iY2_AduA6fhiP8=/28x0:994x966/500x500/top/smart/99designs-contests-attachments/114/114334/attachment_114334373" class="d-block w-100" alt="..." height="600" />
                                </div>
                                <div class="carousel-item">
                                    <img src="https://d1uz88p17r663j.cloudfront.net/resized/e93198eb4a0adaa337a2f734e92a7c20_pollo_708_600.jpeg" class="d-block w-100" alt="..." height="600" width="500" />
                                </div>
                                <div class="carousel-item">
                                    <img src="https://www.cervalle.com/wp-content/uploads/2020/12/punta-de-anca-familiar.jpg" class="d-block w-100" alt="..." height="600" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <br /><br /><br />
                        <div className="container">
                            <br /><br /><br />
                            <h1>
                                Bienveni@ a FatCat
                            </h1>
                            <br /><br />
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Correo electrónico</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Contraseña</label>
                            </div>
                            <div className="row">

                                <div className="col">
                                    <br />
                                    <GoogleLogin
                                        clientId="341831177944-nd2lj723bpfua0q0gm38d3jckhgl3a5k.apps.googleusercontent.com"
                                        buttonText="LoginG"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        redirectUri='http://localhost:3000/HomePage'
                                    />
                                    <br />
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default LoginPage;
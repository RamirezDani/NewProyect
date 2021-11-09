import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

function LoginPage() {

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
                                    <Link to="/RegisterPage" >Registrate aquí</Link>
                                </div>
                                <div className="col">
                                    <br />
                                    <Link to="/HomePage"><button type="button" className="btn btn-primary">Inciar sesión</button></Link>
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
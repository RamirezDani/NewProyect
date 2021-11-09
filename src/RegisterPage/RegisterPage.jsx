import React, { Fragment } from "react";

function RegisterPage() {

    return (
        <div className="container">
        <div class="row g-3">
            <br />
            <h1>Formulario de registro</h1>
            <div class="col">
                <input type="text" class="form-control" placeholder="Nombres" aria-label="First name" />
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Apellidos" aria-label="Last name" />
            </div>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="ejemplo@gmail.com"/>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Celular</label>
                    <input type="text" class="form-control" id="inputPassword4"/>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputAddress" placeholder="Contraseña"/>
                </div>
                <div class="col-12">
                    <label for="inputAddress2" class="form-label">Confirm password</label>
                    <input type="password" class="form-control" id="inputAddress2" placeholder="Contraseña"/>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary" >Registrarse</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default RegisterPage;
import React, { Fragment } from "react";
import {Link} from 'react-router-dom';

function NavbarComponent() {
    
    return (
        <Fragment>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <img src="https://m.media-amazon.com/images/I/318YZE-sfyL._AC_SY355_.jpg" alt="" width="50" height="44" class="d-inline-block align-text-top" />
            
                    <h2>FatCat</h2>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                           
                            {/* PRODUCTOS */}
                            <li class="nav-item">
                                <Link to= '/productos' class="nav-link">Productos</Link>
                            </li>

                            {/* USUARIOS */}
                            <li class="nav-item">
                                <Link to= '/usuarios' class="nav-link">Usuarios</Link>
                            </li>
                            
                            

                            {/* Ventas */}
                            <li class="nav-item">
                                <Link to = '/Ventas' class="nav-link">Ventas</Link>
                            </li>
                                    

                            
                        </ul>
                        <br /><br />
                        
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}
export default NavbarComponent;
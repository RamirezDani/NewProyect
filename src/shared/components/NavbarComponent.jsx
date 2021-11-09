import React, { Fragment } from "react";
import {Link} from 'react-router-dom';

function NavbarComponent() {

    return (
        <Fragment>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <img src="https://m.media-amazon.com/images/I/318YZE-sfyL._AC_SY355_.jpg" alt="" width="50" height="44" class="d-inline-block align-text-top" />
            
                    <Link to ='/' class="navbar-brand">FatCat</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to = '/HomePage'class="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to= '/' class="nav-link">Algo</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Otros
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to = '/'class="dropdown-item">Alguna cosa</Link></li>
                                    <li><Link to ='/' class="dropdown-item">Alguna otra cosa</Link></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><Link class="dropdown-item">Una cosa más</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <br /><br />
                        <form class="d-flex">
                            <br />
                            <input class="form-control me-2" type="search" placeholder="Escribe algo" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}
export default NavbarComponent;
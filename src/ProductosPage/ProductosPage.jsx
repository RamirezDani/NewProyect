import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

function ProductosPage() {

    return (
        <div className="container">
            <h1>Productos</h1>
            <br /><br />

            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Nombre del producto_______________________________________Identificación del producto___________________________________________________________________Valor
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>Esta es una descripción del producto.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            <br />
                            <img src="https://www.gourmet.cl/wp-content/uploads/2012/11/rollo-de-pollo-y-nueces.jpg" alt="" width="500" height="300"/>
                        </div>
                    </div>
                </div>
                <br />
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Nombre del producto_______________________________________Identificación del producto___________________________________________________________________Valor
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>Esta es una descripción del producto.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            <br />
                            <img src="https://elgourmet.s3.amazonaws.com/recetas/cover/b5bb8e9e458e8e2ed3288bee1fe404f8_3_3_photo.png" alt="" width="500" height="300"/>
                        </div>
                    </div>
                </div>
                <br />
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Nombre del producto_______________________________________Identificación del producto___________________________________________________________________Valor
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>Esta es una descripción del producto.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            <br />
                            <img src="https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2010/04/1349_brochetapollochampinonpimientoverde_1270822574.jpg" alt="" width="500" height="300"/>
                        </div>
                    </div>
                </div>
                <br /><br />
                <Link to="/RegistroProducto"><button type="button" class="btn btn-success">Registrar producto</button></Link>
                <br /><br />
            </div>
        </div>

    )
}

export default ProductosPage;
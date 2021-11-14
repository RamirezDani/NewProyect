import React, { useEffect, useState } from 'react'
import { consultaDb, eliminarDocDataBase} from '../config/firebase';
import { Link } from 'react-router-dom'



export const Productos = () => {


    const [listaProductos, setListaProductos] = useState([])
    const [producBuscado, setProducBuscado] = useState('')
    const [swt1, setSwt1] = useState(false)

    const cargarProductos = async () => {

        const listaTemporal = await consultaDb('lista-productos')
        // console.log(listaTemporal);
        setListaProductos(listaTemporal)
        setSwt1(false)
    }



    useEffect(() => {
        // console.log('Usando useEffect PRODUCTOS');
        // setListaProductos(respuesta)
        cargarProductos()
    }, [])

    const handleEliminar = async (e) => {
        // e.preventDefault()
        const arregloTemporal = listaProductos.filter((elemento) => {
            return elemento.id !== e
        })
        setListaProductos(arregloTemporal)

        await eliminarDocDataBase('lista-productos', e)


    }

    const handleBuscar = async (e) => {
        // console.log("producBuscado: ",producBuscado);

        if (e.key === 'Enter' && producBuscado !== '') {

            const arregloTemporal = listaProductos.filter((elemento) => {

                return (elemento.descripcion) === producBuscado || (elemento.idProd) === producBuscado
            })
            setListaProductos(arregloTemporal)
            setSwt1(true)
            // console.log("arreg: ", arregloTemporal);

        }

    }

    const handleBuscarBtn = async (e) => {
        // console.log("producBuscado: ")

        if (producBuscado !== '') {

            const arregloTemporal = listaProductos.filter((elemento) => {

                return (elemento.descripcion) === producBuscado || (elemento.idProd) === producBuscado
            })
            setListaProductos(arregloTemporal)
            setSwt1(true)
            // console.log("arreg: ", arregloTemporal);            
        }

    }

    
   
    return (


        <div className="container mt-3 ">


            <div className="d-flex bd-highlight mb-3 ">

                {/* <div className="me-auto p-2 bd-highligh">
                    <h1>Productos</h1>
                </div> */}

                <div className="me-auto p-2 bd-highligh">
                    <Link className="btn btn-primary  border-dark"
                        to="/lista-productos/create"
                    >Nuevo Producto</Link>
                </div>

                <div className="p-2 bd-highlight ">

                    <input className="form-control border-dark "
                        id="bot-busqueda"
                        placeholder="Buscar producto"
                        value={producBuscado}
                        onChange={(event) => setProducBuscado(event.target.value)}
                        onKeyPress={handleBuscar}

                    ></input>


                </div>

                
                <div className="p-2 bd-highlight">
                    <button className="btn btn-info text-white border-dark"

                        onClick={swt1 === false ? handleBuscarBtn : cargarProductos}

                    >{swt1 === false ? 'Buscar' : 'Atras'}</button>
                </div>



            </div>
            <hr />


            <table className="table table-striped table-bordered 
            align-middle border-dark">

                <thead className="table-dark">
                    <tr className="text-center">
                        {/* <th scope="col">#</th> */}
                        <th scope="col">ID</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Valor Unitario</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Editar/Eliminar</th>

                    </tr>
                </thead>

                <tbody>

                    {
                        listaProductos.map((prod, index) => (

                            <tr key={prod.id} className="text-center">
                                {/* <th scope="row" >{index + 1}</th> */}
                                <td >{prod.idProd}</td>
                                <td >{prod.descripcion}</td>                                
                                <td>{prod.precioUnitario}</td>
                                <td>{prod.estado}</td>
                                <td >
                                    <div className="btn-group" role="group" aria-label="Borrar-Modificar">

                                        <Link type="button" className="btn btn-outline-dark border-dark"
                                            to={`/lista-productos/${prod.id}`}>
                                            <i className="bi bi-brush"></i>
                                        </Link>

                                        <button className="btn btn-danger border-dark"
                                            onClick={() => handleEliminar(prod.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>


                                    </div>
                                </td>

                            </tr>
                        ))

                    }
                </tbody>



            </table>

            
        </div>

    )
}

export default Productos

import React, { useState, useEffect } from 'react'
import { guardarDb, consultaUnElementoDb, actualizarDocDataBase, consultaDb } from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const CreaVenta = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [documento, setDocumento] = useState('')
    const [precioUnitario, setPrecioUnitario] = useState('')
    const [laFecha, setLaFecha] = useState('')

    const history = useHistory()

    const { id } = useParams()

    // const [idProd, setIdProd] = useState('')

    // console.log('id: ', id);


    const handleNewVenta = async (e) => {


        e.preventDefault()
        const estado = document.getElementById("mySelect").value;
        // console.log((await consultaDb('lista-productos')).length)
        let idventa = (await consultaDb('lista-ventas')).length + 1
        idventa = idventa.toString();

        const venta = {
            nombre,
            descripcion,
            documento,
            precioUnitario,
            estado,
            laFecha,
            idventa
        }
        console.log(laFecha)

        await guardarDb('lista-ventas', venta)
        history.push('/Ventas')
    }

    // modificar producto
    const consultarVenta = async (idVenta) => {

        const ventaTemp = await consultaUnElementoDb('lista-ventas', idVenta)
        // console.log(productoTemp);
        setNombre(ventaTemp.nombre)
        setDescripcion(ventaTemp.descripcion)
        setDocumento(ventaTemp.documento)
        setPrecioUnitario(ventaTemp.precioUnitario)
        document.getElementById("mySelect").value = ventaTemp.estado




    }

    useEffect(() => {
        if (id !== 'create') {

            consultarVenta(id)
        }

        setDescripcion('')
        setPrecioUnitario('')


    }, [id])


    const handleActualizarVenta = async (e) => {
        e.preventDefault()
        var estado = document.getElementById("mySelect").value;

        const venta = {
            nombre,
            documento,
            descripcion,
            precioUnitario,
            estado,
            laFecha
        }


        await actualizarDocDataBase('lista-ventas', id, venta)
        history.push('/Ventas')


    }

    const handleImprimir = async (e) => {
        const verListaProductos = await consultaDb('lista-productos')
        console.log(verListaProductos)
    }

    const consultarProducto = async (idProducto) => {

        const productoTemp = await consultaUnElementoDb('lista-productos', idProducto)
        // console.log(productoTemp);
        setNombre(productoTemp.nombre)
        setDescripcion(productoTemp.descripcion)
        setDocumento(productoTemp.documento)
        setPrecioUnitario(productoTemp.precioUnitario)
        document.getElementById("mySelect").value = productoTemp.estado

        console.log(productoTemp)

    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <div className="card border-dark">
                        <div className="card-header text-white bg-info border-dark">
                            <h3>{id === 'create' ? 'Nueva venta' : 'Modificar venta'}</h3>
                        </div>

                        <div className="card-body text-primary">

                            <h6 className="card-title ">Nombre completo</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="Pepito Pérez"
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                            ></input>
                            <br />
                            <h6 className="card-title ">Descripción</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="Descripción del producto"
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                            ></input>

                            <br />
                            <h6 className="card-title ">Documento</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="1213135132"
                                value={documento}
                                onChange={(event) => setDocumento(event.target.value)}
                            ></input>


                            <h6 className="card-title mt-3">Valor de venta</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="ej: 5000"
                                value={precioUnitario}
                                onChange={(e) => setPrecioUnitario(e.target.value)}
                            ></input>

                            <h6 className="card-title mt-3">Estado</h6>

                            <select id="mySelect" className="form-select text-secondary border-dark" >
                                <option value="En proceso">En Proceso</option>
                                <option value="Cancelada">Cancelada</option>
                                <option value="Entregada">Entregada</option>
                            </select>


                            <h6 className="card-title mt-3">Fecha</h6>
                            <input className="form-control border-dark"
                                type="datetime-local"
                                value={laFecha}
                                onChange={(e) => setLaFecha(e.target.value)}
                            ></input>

                        </div>

                        <div className="d-flex justify-content-between">

                            <div className="card-body">
                                <Link type="button" className="btn btn-secondary border-dark"
                                    to="/Ventas" >Atras</Link>
                            </div>

                            <div className="card-body text-end">
                                <button type="button" className="btn btn-info border-dark text-white"
                                    onClick={id === 'create' ? handleNewVenta : handleActualizarVenta}

                                >
                                    {id === 'create' ? 'Guardar' : 'Modificar'}
                                </button>

                            </div>


                        </div>

                    </div>
                </div>

                <div className="col">
                    <div className="card border-dark">
                        <div className="card-header text-white bg-info border-dark">
                            <h3>Productos</h3>
                        </div>

                        <div className="card-body text-primary">

                            <h6 className="card-title mt-3">Lista de productos</h6>

                            <button className="btn btn-danger border-dark"
                                onClick={() => handleImprimir()}
                            //onClick={() => consultarProducto(descripcion.idProducto)}
                            >

                                ok
                            </button>

                            <select id="mySelect" className="form-select text-secondary border-dark" >

                                <option value="1}">

                                </option>


                            </select>
                            <br />

                        </div>

                    </div>
<br />
                    <div className="row">
                        <table className="table table-bordered border-dark">

                            <thead className="table-primary">
                                <tr className="text-center">
                                    <th className="col-2">Cantidad</th>
                                    <th className="col-6">Producto</th>
                                    <th className="col-4">Precio</th>



                                </tr>
                            </thead>
                            {/*
                <tbody>

                    {
                        listaVentas.map((venta, index) => (

                            <tr key={venta.id} className="text-center">
                                <th scope="row" >{index + 1}</th>
                                <th>{venta.nombre}</th>
                                <td>{venta.descripcion}</td>
                                <th>{venta.documento}</th>
                                <td>{venta.precioUnitario}</td>
                                <td>{venta.estado}</td>
                                <td>{venta.laFecha}</td>
                                <td >
                                    <div className="btn-group" role="group" aria-label="Borrar-Modificar">

                                        <Link type="button" className="btn btn-outline-dark border-dark"
                                            to={`/lista-ventas/${venta.id}`}>
                                            <i className="bi bi-brush"></i>
                                        </Link>

                                        <button className="btn btn-danger border-dark"
                                            onClick={() => handleEliminar(venta.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>

                                        <button className="btn btn-danger border-dark"
                                            onClick={() => handleImprimir(venta.id)}>
                                            ok
                                        </button>


                                    </div>
                                </td>

                            </tr>
                        ))

                    }
                </tbody>
                */}


                        </table>
                    </div>
                </div>

            </div>
            <br /><br />
        </div>

    )
}






import React, { useState, useEffect } from 'react'
import { guardarDb, consultaUnElementoDb, actualizarDocDataBase, consultaDb } from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const CreaVenta = () => {

    const [nombre, setNombre] = useState('')
    const [documento, setDocumento]  = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precioUnitario, setPrecioUnitario] = useState('')
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
            documento,
            descripcion,
            precioUnitario,
            estado,
            idventa
        }


        await guardarDb('lista-ventas', venta)
        history.push('/Ventas')
    }

    // modificar producto
    const consultarVenta = async (idVenta) => {

        const ventaTemp = await consultaUnElementoDb('lista-ventas', idVenta)
        // console.log(productoTemp);
        setDescripcion(ventaTemp.descripcion)
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
            estado
        }


        await actualizarDocDataBase('lista-ventas', id, venta)
        history.push('/Ventas')


    }




    return (
        <div>
        <div className="d-flex justify-content-center mt-5">
            <div className="card border-dark w-25">
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
                    <h6 className="card-title ">Documento</h6>
                    <input className="form-control border-dark"
                        type="text"
                        placeholder="12345678910"
                        value={documento}
                        onChange={(event) => setDocumento(event.target.value)}
                    ></input>
                    
                    <br />
                    <h6 className="card-title ">Descripcion</h6>
                    <input className="form-control border-dark"
                        type="text"
                        placeholder="Descripcion"
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
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
                        /*placeholder="ej: 5000"*/
                        /*value={precioUnitario}*/
                        /*onChange={(e) => setPrecioUnitario(e.target.value)}*/
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
        <br /><br />
        </div>

    )
}






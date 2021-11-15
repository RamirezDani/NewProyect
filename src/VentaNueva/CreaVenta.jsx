import React, { useState, useEffect } from 'react'
import { guardarDb, consultaUnElementoDb, actualizarDocDataBase, consultaDb } from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { fireEvent, prettyDOM } from '@testing-library/dom'

export const CreaVenta = () => {

    const [nombre, setNombre] = useState('')
    const [vendedor, setVendedor] = useState('')
    const [documento, setDocumento] = useState('')
    const [precioTotal, setPrecioTotal] = useState('')
    const [laFecha, setLaFecha] = useState('')
    const [cantidadProducto, setCantidadProducto] = useState('')
    const [listaVentas, setlistaVentas] = useState([])
    const [listaProductosTemp, setlistaProductosTemp] = useState([])
    const [contador1, setContador1] = useState(0)
    const [tempProCantTotalState, setTempProCantTotalState] = useState(0)
    
    let tempProCantTotal = 0
    let tempProTotal = 0

    const history = useHistory()

    const { id } = useParams()


    const handleNewVenta = async (e) => {


        e.preventDefault()
        const estado = document.getElementById("mySelect").value;
        // console.log((await consultaDb('lista-productos')).length)
        let idventa = (await consultaDb('lista-ventas')).length + 1
        idventa = idventa.toString();
        const cantidad = tempProCantTotal
        const precioTotal = tempProTotal

        const venta = {
            nombre,
            vendedor,
            documento,
            precioTotal,
            cantidad,
            estado,
            laFecha,
            idventa
        }
        console.log(laFecha)

        await guardarDb('lista-ventas', venta)
        history.push('/Ventas')
    }

    // definiendo producto y cantidad de la BD
    const handleImprimirSelect = async () => {

        const verListaProductos = await consultaDb('lista-productos')
        setlistaVentas(verListaProductos)
    }

    // modificar producto
    const consultarVenta = async (idVenta) => {

        const ventaTemp = await consultaUnElementoDb('lista-ventas', idVenta)
        // console.log(productoTemp);
        setNombre(ventaTemp.nombre)
        setVendedor(ventaTemp.vendedor)
        setDocumento(ventaTemp.documento)
        setPrecioTotal(ventaTemp.precioTotal)
        setLaFecha(ventaTemp.laFecha)
        document.getElementById("mySelect").value = ventaTemp.estado


    }



    useEffect(() => {
        if (id !== 'create') {


            consultarVenta(id)
        }

        handleImprimirSelect()
        setVendedor('')
        setPrecioTotal('')


    }, [id])


    const handleActualizarVenta = async (e) => {
        e.preventDefault()
        var estado = document.getElementById("mySelect").value;

        const venta = {
            nombre,
            documento,
            vendedor,
            precioTotal,
            estado,
            laFecha
        }


        await actualizarDocDataBase('lista-ventas', id, venta)
        history.push('/Ventas')


    }


    // Funcion del boton que guarda e imprime en tabla
    const handleNewProducto = (e) => {
        const productTemp = document.getElementById("mySelect-productos").value
       
        
        const arregloTemporal = listaVentas.filter((elemento) => {
            return elemento.descripcion === productTemp
        })
        const valorProductoUni = arregloTemporal[0].precioUnitario;
        const valorProductoTotal = valorProductoUni * cantidadProducto;
        
        const objProductTem = {
            cantObj: cantidadProducto,
            prodObj: productTemp,
            percObjUni: valorProductoUni,
            percObjTotal: valorProductoTotal
        }

        listaProductosTemp[contador1] = objProductTem
        setContador1(contador1 + 1)
       
        for (let a of listaProductosTemp){
            tempProCantTotal = tempProCantTotal+parseInt(a.cantObj)
            tempProTotal = tempProTotal + parseInt(a.percObjTotal)
        }

        console.log("tempProCantTotal: "+ tempProCantTotal);
        console.log("tempProTotal: "+ tempProTotal);
        
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
                            <h6 className="card-title ">Encargado de la venta</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="Encargado de la venta"
                                value={vendedor}
                                onChange={(event) => setVendedor(event.target.value)}
                            ></input>

                            <br />
                            <h6 className="card-title ">Documento</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="1213135132"
                                value={documento}
                                onChange={(event) => setDocumento(event.target.value)}
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

                            <div className="d-flex justify-content-between">
                                <div >
                                    <h6 className="card-title mt-3">Total Productos:</h6>
                                    <text>{tempProCantTotal}</text>
                                </div>
                                <div >
                                    <h6 className="card-title mt-3">Total Venta:</h6>
                                    <text>
                                        
                                    </text>
                                </div>
                            </div>
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

                <div className="col mt-3">
                    <div className="card border-dark">
                        <div className="card-header text-white bg-info border-dark">
                            <h3>Productos</h3>
                        </div>

                        <div className="card-body text-primary">

                            {/* SELECT DE PRODUCTOS */}

                            <h6 className="card-title mt-3">Lista de productos</h6>
                            <select id="mySelect-productos"
                                className="form-select text-secondary border-dark">
                                <option selected>Seleccione Producto</option>
                                {
                                    listaVentas.map((venta, index) => (

                                        <option key={venta.id}
                                            value={venta.descripcion}
                                        >
                                            {venta.descripcion}
                                        </option>
                                        // console.log(venta)
                                    ))
                                }

                            </select>
                            <br />

                            <h6 className="card-title ">Cantidad</h6>
                            <input className="form-control border-dark"
                                type="text"
                                placeholder="Ej: 4"
                                value={cantidadProducto}
                                onChange={(event) => setCantidadProducto(event.target.value)}
                            ></input>

                            <br />

                            <button type="button" className="btn btn-info border-dark text-white pull-right"
                                onClick={() => handleNewProducto()}
                            >Aceptar
                            </button>



                        </div>

                    </div>

                    <br />




                    <table className="table table-striped table-bordered 
                            align-middle border-dark">

                        <thead className="bg-info text-white">

                            <tr className="text-center">

                                <th className="col-2">Cantidad</th>
                                <th className="col-4">Producto</th>
                                <th className="col-2">Precio</th>
                                <th className="col-4">Precio Total</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                listaProductosTemp.map((pro, index) => (

                                    <tr key={index} className="text-center">

                                        <td>{pro.cantObj}</td>
                                        <td>{pro.prodObj}</td>
                                        <td>{pro.percObjUni}</td>
                                        <td>{pro.percObjTotal}</td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>



                </div>

            </div>
            <br /><br />
        </div>

    )
}






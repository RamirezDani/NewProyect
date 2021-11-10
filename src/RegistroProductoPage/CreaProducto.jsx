import React, { useState, useEffect } from 'react'
import { guardarDb, consultaUnElementoDb, actualizarDocDataBase, consultaDb } from '../config/firebase'
import { useHistory, useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

export const CreaProducto = () => {

    
    const [descripcion, setDescripcion] = useState('')
    const [precioUnitario, setPrecioUnitario] = useState('')
    const history = useHistory()
    const { id } = useParams()
    // const [idProd, setIdProd] = useState('')

    // console.log('id: ', id);

    
    const handleNewProducto = async (e) => {            


        e.preventDefault()
        const estado = document.getElementById("mySelect").value;      
        // console.log((await consultaDb('lista-productos')).length)
        let idProd =  (await consultaDb('lista-productos')).length + 1
        idProd = idProd.toString();
        
        const producto = {
            descripcion,
            precioUnitario,
            estado,
            idProd
        }
       
        
        await guardarDb('lista-productos', producto)
        history.push('/productos')
    }

    // modificar producto
    const consultarProducto = async (idProducto) => {
        
        const productoTemp = await consultaUnElementoDb('lista-productos', idProducto)
        // console.log(productoTemp);
        setDescripcion(productoTemp.descripcion)
        setPrecioUnitario(productoTemp.precioUnitario)
        document.getElementById("mySelect").value = productoTemp.estado
        
        
    }

    useEffect(() => {
        if (id !== 'create') {
             
          consultarProducto(id)
        }
    
        setDescripcion('')
        setPrecioUnitario('')
    
    
      }, [id])


      const handleActualizarProducto = async (e) => {
        e.preventDefault()
        var estado = document.getElementById("mySelect").value;

        const producto = {
          descripcion,
          precioUnitario,
          estado
        }
        
    
        await actualizarDocDataBase('lista-productos', id, producto)
        history.push('/productos')
    
    
      }
    
      
      

    return (

        <div className="d-flex justify-content-center mt-5">
            <div className="card border-dark w-25">
                <div className="card-header text-white bg-info border-dark">
                    <h3>{id === 'create' ? 'Nuevo Producto' : 'Modificar Producto'}</h3>
                </div>

                <div className="card-body text-primary">
                    <h6 className="card-title ">Descripcion</h6>
                    <input className="form-control border-dark"
                        type="text"
                        placeholder="Descripcion"
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                    ></input>

                    <h6 className="card-title mt-3">Valor Unitario</h6>
                    <input className="form-control border-dark"
                        type="text"
                        placeholder="Valor Unitario"
                        value={precioUnitario}
                        onChange={(e) => setPrecioUnitario(e.target.value)}
                    ></input>

                    <h6 className="card-title mt-3">Estado</h6>                 

                    <select id="mySelect" className="form-select text-secondary border-dark" >
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>                        
                    </select>


                </div>
                
                <div className="d-flex justify-content-between">
                
                <div className="card-body">
                    <Link type="button" className="btn btn-secondary border-dark"
                    to="/productos" >Atras</Link>                      
                </div>

                <div className="card-body text-end">
                    <button type="button" className="btn btn-info border-dark text-white"
                        onClick={id === 'create' ? handleNewProducto : handleActualizarProducto}

                    >
                        {id === 'create' ? 'Guardar' : 'Modificar'}
                    </button>
                    
                </div>

                
                </div>
            </div>
        </div>


    )
}







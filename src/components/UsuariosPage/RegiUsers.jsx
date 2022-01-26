import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { INSERTA_DOC } from '../../BdMongoConf/graphql-operations'
import { useMutation } from '@apollo/client'
// import { ListaTodo } from '../../BdMongoConf/configBD';


export const RegiUsers = () => {


    const [nombre, setNombre] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [tipo, setTipo] = useState('Estudiante')
    const [errorNombre, setErrorNombre] = useState('');
    const [errorIdentificacion, setErrorIdentificacion] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorContrasena, setErrorContrasena] = useState('');

    // const [estado, setEstado] = useState('Pendiente')
    const history = useHistory()
    // const { data } = ListaTodo();



    // CREA UN NUEVO DOCUMENTO
    const [createUserInst] = useMutation(INSERTA_DOC);
    const createUser = async (e) => {
        e.preventDefault();
        let swt1=0;

        //VALIDACIONES DE INGRESO PARA TIPOS DE DATOS VALIDOS
        if (!nombre.trim()) {
            console.error("Ingrese Nombre")
            setErrorNombre("Ingrese Nombre")
            swt1=1;

        }

        if (!correo.trim()) {
            console.error("Ingrese Correo")
            setErrorCorreo("Ingrese Correo")
            swt1=1;
        }

        if (!identificacion.trim()) {
            console.error("Ingrese identificacion")
            setErrorIdentificacion("Ingrese identificacion")
            swt1=1;
        }

        if (!contrasena.trim()) {
            console.error("Ingrese contraseña")
            setErrorContrasena("Ingrese contraseña")
            swt1=1;
        }

        //TIPO DE DATO NUMERO
        for (let letra of identificacion) {
            if (letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57) { // is a number.
                setErrorIdentificacion("")
            } else {
                setErrorIdentificacion("Ingrese solo numeros")
                swt1=1;
                return
            }
        }

        //TIPO DE DATO STRING
        for (let letra2 of nombre) {
            if ((letra2.charCodeAt(0) >= 65 && letra2.charCodeAt(0) <= 90) || (letra2.charCodeAt(0) >= 97
                && letra2.charCodeAt(0) <= 122)) { // is a number.
                setErrorNombre("")
            } else {
                setErrorNombre("Ingrese solo letras")
                swt1=1;
                return
            }
        }

        // TIPO DE DATO STRING, NUMER Y -*_
        for (let letra3 of contrasena) {

            if ((letra3.charCodeAt(0) >= 65 && letra3.charCodeAt(0) <= 90) || (letra3.charCodeAt(0) >= 97
                && letra3.charCodeAt(0) <= 122) || (letra3.charCodeAt(0) >= 48 && letra3.charCodeAt(0) <= 57) ||
                letra3.charCodeAt(0) === 42 || letra3.charCodeAt(0) === 45 || letra3.charCodeAt(0) === 95) { // is a number.
                setErrorContrasena("")
            } else {
                setErrorContrasena("Ingrese solo letras, numeros y caracteres validos *-_")
                swt1=1;
                return
            }
        }

        //VALIDA EL FORMATO DEL CORREO 
        if ((correo.includes("@") !== true) || (correo.includes(".com") !== true)) {
            setErrorCorreo("Ingrese un correo valido")
            swt1=1;
        } else {
            setErrorCorreo("")
        }

        if(swt1===0){
            //CREA EL DOCUMENTO EN LA BD    
        await createUserInst({
            variables: {
                newNombre: nombre,
                newIdentificacion: identificacion,
                newCorreo: correo,
                newContrasena: contrasena,
                newTipo: tipo,
                newEstado: "Pendiente"
            }
        });
        swt1=0;
        history.push('/')

        }
        
    };





    return (

        <>

            <form onSubmit={createUser}>
                <div className="d-flex justify-content-center mt-3">
                    <div className="card border-dark">
                        <div className="card-header text-white bg-info border-dark">
                            <h3>Nuevo Usuario</h3>
                        </div>


                        <div className="card-body text-primary">
                            <h6 className="card-title ">Nombre Completo</h6>
                            <input className={"form-control border-dark " + (errorNombre ? "is-invalid" : '')}

                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                            ></input>
                            <div className="invalid-feedback mb-2">
                                {errorNombre}
                            </div>

                            <h6 className="card-title mt-3">Identificación</h6>
                            <input className={"form-control border-dark " + (errorIdentificacion ? "is-invalid" : '')}

                                type="text"
                                placeholder="Identificación"
                                value={identificacion}
                                onChange={(event) => setIdentificacion(event.target.value)}

                            ></input>
                            <div className="invalid-feedback mb-2">
                                {errorIdentificacion}
                            </div>

                            <h6 className="card-title mt-3">Correo</h6>
                            <input className={"form-control border-dark " + (errorCorreo ? "is-invalid" : '')}
                                type="text"
                                placeholder="Correo"
                                value={correo}
                                onChange={(event) => setCorreo(event.target.value)}
                            ></input>
                            <div className="invalid-feedback mb-2">
                                {errorCorreo}
                            </div>

                            <h6 className="card-title mt-3">Contraseña</h6>
                            <input className={"form-control border-dark " + (errorContrasena ? "is-invalid" : '')}

                                type="text"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(event) => setContrasena(event.target.value)}
                            ></input>
                            <div className="invalid-feedback mb-2">
                                {errorContrasena}
                            </div>

                            <h6 className="card-title mt-3">Tipo</h6>
                            <select value={tipo} onChange={(event) => setTipo(event.target.value)} className="form-select text-secondary border-dark" >
                                <option value="Estudiante">Estudiante</option>
                                <option value="Lider">Lider</option>
                                <option value="Administrador">Administrador</option>
                            </select>

                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="card-body">
                                <Link type="button" className="btn btn-secondary border-dark"
                                    to="/" >Atras</Link>
                            </div>

                            <div className="card-body text-end">
                                <button type="submit"
                                    className="btn btn-info border-dark text-white">
                                    Guardar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}







import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  TRAEPROYECTOS, TRAEUSUARIOS, UNDOC, UNPROY, ELIMINA_UNDOC, TRAEUSERTIPO,
  TRAEINSCRIPCIONES, TRAENUMPROYECTOS, INSCRI_PROYEC, TRAE_INSCRIP_ESTUDIANTE,
  INSCS_USER,AVANC_USER,PROYECS_ID_LIDER,AVANC_LIDER
} from './graphql-operations';
import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


// 1.CONFIGURACION BASE DE DATOS

// const { MongoClient } = require("mongodb");

export const APP_ID = "proyectofinal-dgvnb";
// const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`


// // Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);
// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    // console.log("aca");
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
    // console.log("alla");
  }
  return app.currentUser.accessToken
}

// // Configure the ApolloClient to connect to your app's GraphQL endpoint
export const client = new ApolloClient({

  link: new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache()

});


export function ListaTodo() {

  const { loading, error, data } = useQuery(TRAEUSUARIOS);
  return { loading, error, data };

}

export function ListaProyectos(tipo) {

  const { loading, error, data } = useQuery(TRAEPROYECTOS, {
    variables: { tipo: tipo }
  })
  return { loading, error, data };
}

export function ListaProyectosLider(id) {
  
  const { loading, data } = useQuery(PROYECS_ID_LIDER, {
    variables: { idLider: id }
  })
  
  const proyecsLider = data
  const load9 = loading
  return { proyecsLider, load9 }  
}

export function ListaProy() {

  const { loading, data } = useQuery(TRAEPROYECTOS)
  const proyecs = data
  const load5 = loading
  return { proyecs, load5 }

}


export function ListaUno(id) {

  const { data, loading } = useQuery(UNDOC, {
    variables: { _id: id },
    enabled: !!id
  })
  return { data, loading }
}

export function AvancesUser(idProyes) {

  const { data, loading } = useQuery(INSCS_USER, {
    variables: { idProy: idProyes },
    enabled: !!idProyes
  })
  const avanUser = data
  const load6 = loading
  return { avanUser, load6 }
}

export function UnAvancesUser(idAv) {
  
  const { data, loading } = useQuery(AVANC_USER, {
    variables: { _id: idAv },
    enabled: !!idAv
  })
  
  const unAvanUser = data
  const load7 = loading
  return { unAvanUser, load7 }
}

export function AvancesLider(idP) {
  
  const { data, loading } = useQuery(AVANC_LIDER, {
    variables: { idProy: idP },
    enabled: !!idP
  })
  
  const avanUser = data
  const load10 = loading
  return { avanUser, load10 }
}

export function ListaUsersLider() {

  const { data, loading } = useQuery(TRAEUSERTIPO, {
    variables: { tipo: "Lider" }
  })
  const listaLideres = data
  const load8 = loading
  return { listaLideres, load8 }
}

export function ListaUnProy(id) {

  const { data, loading } = useQuery(UNPROY, {
    variables: { _id: id },
    enabled: !!id
  })
  const unProys = data
  const load6 = loading
  return { unProys, load6 }
}

export function NumProys(nombre) {

  const { data, loading } = useQuery(TRAENUMPROYECTOS, {
    variables: { nombreLider: nombre },
    enabled: !!nombre
  })
  const temporal = data
  const load2 = loading
  return { temporal, load2 }
}

export function InscriProys(idProy) {

  const { data, loading } = useQuery(INSCRI_PROYEC, {
    variables: { idProyecto: idProy },
    enabled: !!idProy
  })
  const InsPorProy = data
  const load3 = loading
  return { InsPorProy, load3 }
}

export function ListaInscripci() {

  const { loading, error, data } = useQuery(TRAEINSCRIPCIONES)
  return { loading, error, data };
}

export function ListaInscEstudiante(idEstu) {

  const { loading, data } = useQuery(TRAE_INSCRIP_ESTUDIANTE, {
    variables: { idEstudiante: idEstu },
    enabled: !!idEstu
  })

  const ListInsEstu = data
  const load4 = loading
  return { ListInsEstu, load4 }
}

//AGREGA UN DOCUMENTO
export function AgregaUno({ nombre, edad }) {
  // console.log(newNombre);
  const [updateDoc] = useMutation(gql`
      mutation updateDoc($nombre: String!, $tipo: Int!, $estado: Int!) {
        insertOnePerson(data:{nombre:$nombre, tipo:$tipo, estado:$estado } ) {
        _id
        edad
        nombre
    }
      }
    `
  )
  return (

    <button
      onClick={() =>
        updateDoc({
          variables: {
            nombre: nombre,
            edad: edad,
          },
        })
      }
    >

      AGREGAR
    </button>


  )
}

//MODIFICA UN DOCUMENTO
export function ModificaUno({ id, newNombre }) {
  // console.log(newNombre);
  const [updateDoc] = useMutation(gql`
    mutation updateDoc($_id: ObjectId!, $newNombre: String!) {
    updateOnePerson(query: {_id:$_id}, set: {nombre:$newNombre}) {
      _id
      edad
      nombre
  }
    }
  `
  )
  return (
    <button
      onClick={() =>
        updateDoc({
          variables: {
            _id: id,
            newNombre: newNombre,
          },
        })
      }
    >

      OK
    </button>
  )
}

//ELIMINA UN DOCUMENTO
// export function EliminaUno({id}){
//     // console.log(newNombre);
//     const [updateDoc] = useMutation(gql`
//       mutation updateDoc($_id: ObjectId!) {
//         deleteOnePerson(query: {_id:$_id}) {
//         _id
//         edad
//         nombre
//     }
//       }
//     `    
//     )

//     return(
//       <button
//               onClick={() =>
//                 updateDoc({
//                   variables: {
//                     _id: id,

//                   },
//                 })
//               }
//             >

//               Eliminar 
//             </button>
//     )
//   }

export function EliminaUno({ id }) {

  const [updateDoc] = useMutation(ELIMINA_UNDOC, {
    variales: { _id: id },
    enabled: !!id
  })
  return (updateDoc)
}

//ELIMINA TODOS LOS DOCUMENTOS
export function EliminaTodo() {
  // console.log(newNombre);
  const [updateDoc] = useMutation(gql`
      mutation updateDoc {
        deleteManyPeople(query:{}) {
            deletedCount
        }
      }
    `
  )

  return (
    <button
      onClick={() =>
        updateDoc()
      }
    >

      Eliminar Todo
    </button>
  )
}
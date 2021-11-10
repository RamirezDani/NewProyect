import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
//metodos de interaccion con BD
// addDoc: guarda documento
// collection:guartda dentro de una coleccion
import {addDoc, collection,getDocs,query,getDoc,doc,updateDoc,deleteDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC3h9mRq9stJ3Q61-UYbhXa66y-2tU26u8",
    authDomain: "lista-tareas-dbc26.firebaseapp.com",
    projectId: "lista-tareas-dbc26",
    storageBucket: "lista-tareas-dbc26.appspot.com",
    messagingSenderId: "946927868760",
    appId: "1:946927868760:web:8f28dce7e9cfcfdfae232d",
    measurementId: "G-8SGQ9TSWLW"
  };

//   Inicializa firebase
initializeApp(firebaseConfig);
// base de datos
const database = getFirestore();
// autenticacion
const auth = getAuth();

export let usuario;

//guardar base de datos
export const guardarDb = async (nombreCollec,data) =>{
    try {
        const respuesta = await addDoc(collection(database,nombreCollec),data)
        // console.log(respuesta);
        // console.log(collection(database,nombreCollec));
        return respuesta;

    }catch(e){
        throw new Error(e);
    }
}

//getAll
export const consultaDb = async (nombreCollec) =>{
    
    try{
        const respuesta = await getDocs(query(collection(database,nombreCollec)))
        // console.log(respuesta);
        const coleccionDatos = respuesta.docs.map((documento)=>{
            // console.log(documento);
            //accede a la informacion de la BD
            // console.log((documento).data());
            const docTemp = {
                id: documento.id,
                ...documento.data()
            }
            return docTemp
            // console.log(docTemp);
        })
    return coleccionDatos;

    }catch(e){
        throw new Error(e);    
    }
}

//consulta un elemento-getElementBiId
export const consultaUnElementoDb = async (nombreCollec, id) =>{
    
    try{
        const respuesta = await getDoc(doc(database,nombreCollec,id))
        // console.log(respuesta);
                  
            const docTemp = {
                id: respuesta.id,
                ...respuesta.data()
            }
    
    return docTemp;

    }catch(e){
        throw new Error(e);    
    }
}

//Actualizacion de un documento o registro
export const actualizarDocDataBase = async (nombreCollec, id,data) =>{    
    try{
        
        const respuesta = await updateDoc(doc(database,nombreCollec,id),data)
        console.log(respuesta);    
    

    }catch(e){
        throw new Error(e);    
    }
}

//Eliminacion de un registro
export const eliminarDocDataBase = async (nombreCollec, id) =>{    
    try{
        
        const respuesta = await deleteDoc(doc(database,nombreCollec,id))
        console.log(respuesta);    
    

    }catch(e){
        throw new Error(e);    
    }
}


//Crear un usuario
export const crearUsuario = async (email, password) =>{    
    try{
        
        const credencialesUsuario = await createUserWithEmailAndPassword(auth,email,password)
        console.log(credencialesUsuario);
        console.log(credencialesUsuario.user);
        console.log(credencialesUsuario.user.uid);  

        //Guarda los datos del usuario en una nueva lista en BD 
        const user = {
            id:credencialesUsuario.user.uid,
            email:credencialesUsuario.user.email
        }
        guardarDb('listaUsuarios',user)  
        return user

    }catch(e){
        throw new Error(e);    
    }
}


//login usuarios
export const loginUsuario = async (email, password) =>{    
    try{
        
        const credencialesUsuario = await signInWithEmailAndPassword(auth,email,password)
        // console.log(credencialesUsuario);
        // console.log(credencialesUsuario.user);
        // console.log(credencialesUsuario.user.uid); 
        const user = {
            id:credencialesUsuario.user.uid,
            email:credencialesUsuario.user.email
        }

        usuario=user;   
        return user

    }catch(e){
        throw new Error(e);    
    }
}

//logOut usuarios
export const logOutUsuario = async () =>{    
    try{
        
        const respuesta = await signOut(auth)
        console.log(respuesta);    
        

    }catch(e){
        throw new Error(e);    
    }
}


//datos usuarios
export const datosUsuario = async () =>{    
    try{
        
        const user = auth.currentUser
        // console.log(user);    
        
        if (user){
            console.log(user);
            return user
        }else{
            console.log('datos usuario', user);
            return undefined
        }

    }catch(e){
        throw new Error(e);    
    }
}


//escucha cambios-usuario activo
onAuthStateChanged(auth, (user)=>{

    if(user){
        usuario = user
        console.log('Usuario activo')
    }else{
        console.log('El usuario ya no esta activo')
        usuario = undefined
    }
})
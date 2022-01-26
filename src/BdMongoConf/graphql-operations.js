import gql from "graphql-tag";

export const TRAEUSUARIOS = gql`
query GetPeople{
  listaUsuariosBDS {
    _id
		estado
		nombre
		tipo
    identificacion
    contrasena   
    correo
  }
}
    `;

export const TRAEUSERTIPO = gql`
  query GetUserLider($tipo:String!){
    listaUsuariosBDS(query:{tipo:$tipo}) {
    _id
		estado
		nombre
		tipo
  }
}
`;

export const TRAENUMPROYECTOS = gql`
  query GetNumProy($nombreLider:String!){
  proyectos(query:{nombreLider:$nombreLider}){
    _id   
		nombre   
  }
}
`;

export const PROYECS_ID_LIDER = gql`
  query GetProyLider($idLider:String!){
  proyectos(query:{idLider:$idLider}){
    _id   
		nombre
    estado
    fase
    fechaIni  
  }
}
`;

export const INSCS_USER = gql`
  query avances($idProy: String!){
  avances(query:{idProy:$idProy}) {
    _id
		descripcion
		fechaAvan
		observacion
  }
}
`;

export const AVANC_USER = gql`
query unAvance($_id: ObjectId!){
  avances(query:{_id:$_id}) {
    _id
		descripcion
		idProy
    observacion
  }
}
`;

//TRAE LOS AVANCES ASOCIADOS A UN PROYECTO
export const AVANC_LIDER = gql`
query liderAvances($_idProy: String!){
  avances(query:{idProy:$_idProy}) {
    _id
		descripcion
		idProy
    observacion
  }
}
`;

//TRAE UN DOC DE LA COLLECTION LISTAUSUARIOSBD
export const UNDOC = gql`
  query UnDoc($_id: ObjectId!){
    listaUsuariosBD(query:{_id:$_id}) {
    _id
		estado
		nombre
		tipo
  }
}
`;

export const TRAEPROYECTOS = gql`
query GetProjects{
  proyectos {
    _id   
		nombre
    fechaIni
    nombreLider
    estado
    fase
  }
}
`;

export const TRAEINSCRIPCIONES = gql`
query GetProjects{
  inscripcions {
    _id
    idProyecto
    idEstudiante
    estadoInscrip
    fechaEgr
    fechaIng
    
  }
}
`;

export const TRAE_INSCRIP_ESTUDIANTE = gql`
query GetInsEstudiante($idEstudiante:String!){
  inscripcions(query:{idEstudiante:$idEstudiante}){
    _id   
		estadoInscrip
   idProyecto
  }
}
`;

export const INSCRI_PROYEC = gql`
query GetListInsc($idProyecto:String!){
  inscripcions(query:{idProyecto:$idProyecto}){
    _id
    idProyecto
    idEstudiante
    estadoInscrip
    fechaEgr
    fechaIng
  }
}
`;

export const UNPROY = gql`
  query UnProy($_id: ObjectId!){
    proyecto(query:{_id:$_id}) {
      _id
		nombre		
    fechaIni
    nombreLider
    estado
    fase
  }
}
`;


export const INSERTA_DOC = gql`
mutation updateDoc($newNombre: String!,$newIdentificacion:String!,$newCorreo:String!,
  $newContrasena:String!, $newTipo: String!, $newEstado: String!) {
  insertOneListaUsuariosBD(data:{nombre:$newNombre,identificacion:$newIdentificacion,
    correo:$newCorreo,contrasena:$newContrasena, tipo:$newTipo, estado:$newEstado } ) {
    _id
		estado
		nombre
		tipo    
    }
}
`;

export const INSERTA_AVANCE = gql`
mutation setOneAvance($newIdProy:String!,$newFechaAvan:DateTime!,$newDescripcion:String!,$newObservacion:String!){
  insertOneAvance(data:{idProy:$newIdProy,fechaAvan:$newFechaAvan,descripcion:$newDescripcion,observacion:$newObservacion}){
    _id
  }
}
`;

export const INSERTA_INSCR = gql`
mutation setInscripcion($newIdEstu:String!,$newIdProy:String!,$newFechaIng:DateTime!,
	 $newFechaEgr:DateTime!,$newEstadoInsc:String!){
     insertOneInscripcion(data:{idProyecto:$newIdProy,idEstudiante:$newIdEstu,
      estadoInscrip:$newEstadoInsc,fechaIng:$newFechaIng,fechaEgr:$newFechaEgr}){
      _id
    }   
  }
`;


export const INSR_PROJECT = gql`
mutation updateDoc($newNombre: String!, 
$newNombreLider: String!,
$newObjGen: String!,
$newObjEsp: String!,
$newPresupuesto: String!,
$newFechaIni: DateTime!,
$newFechaFinal: DateTime!,
$newIdLider:String!,
$newEstado:String!,
$newFase:String!) {
  
  insertOneProyecto(data:{nombre:$newNombre, 
    nombreLider:$newNombreLider, 
    objGen:$newObjGen,
    objEsp:$newObjEsp,
    presupuesto:$newPresupuesto,
    fechaIni:$newFechaIni,
    fechaFinal:$newFechaFinal,
    idLider:$newIdLider,
    estado:$newEstado,
    fase:$newFase} ) {
    
    _id
		nombre
		nombreLider
    fechaIni
    }
}
`;


export const UPDT_AVANC_USUR = gql`
  mutation upUnAvance($_id: ObjectId!,$newAporte:String!){
    updateOneAvance(query:{_id:$_id},set:{descripcion:$newAporte}){
      _id
  }
}
  `;

export const UPDT_OBSERVACION = gql`
mutation observacion($_id: ObjectId!,$newObservacion:String!){
  updateOneAvance(query:{_id:$_id},set:{observacion:$newObservacion}){
    _id
  }
}
  `;

export const UPDT_ESTA_USUR = gql`
    mutation updateDoc($_id: ObjectId!, $newEstado: String!) {
      updateOneListaUsuariosBD(query: {_id:$_id}, set: {estado:$newEstado}) {
        _id
        estado
		    nombre
		    tipo
        }
    }
  `;


export const UPDT_ESTA_INSC = gql`
mutation modEstadoInsc($_id: ObjectId!, $newEstado: String!,$newFechaIni: DateTime!) {
  updateOneInscripcion(query: {_id:$_id}, set: {estadoInscrip:$newEstado,fechaIng:$newFechaIni}) {
    _id
    estadoInscrip
    }
}
`;

export const UPDT_INFO_USUR = gql`
    mutation updateDoc($_id: ObjectId!,$newNombre: String!, $newTipo: String!, $newEstado: String!) {
      updateOneListaUsuariosBD(query: {_id:$_id}, set: {nombre:$newNombre,tipo:$newTipo,estado:$newEstado,}) {
        _id
        estado
		    nombre
		    tipo
        }
    }
  `;

export const UPDT_INFO_PROY = gql`
mutation updateDoc($_id: ObjectId!,$newNombre: String!,$newNombreLider: String!, $newFechaIni: DateTime!,
$newEstado:String!,$newFase:String!) {
  updateOneProyecto(query: {_id:$_id}, set: {nombre:$newNombre, nombreLider:$newNombreLider, fechaIni:$newFechaIni,
  estado:$newEstado,fase:$newFase}) {
    _id
    nombre
    nombreLider
    fechaIni
    
    }
}
`;

export const UPDT_PROY_ESTADO = gql`
mutation upEstadoProyecs($_id: ObjectId,$newEstado:String!){
  updateOneProyecto(query:{_id:$_id},set:{estado:$newEstado}){
    _id
  }
}
`;

export const UPDT_PROY_FASE = gql`
mutation upFaseProyecs($_id: ObjectId,$newFase:String!){
  updateOneProyecto(query:{_id:$_id},set:{fase:$newFase}){
    _id
  }
}
`;

export const UPDT_PROY_FASE_ESTADO = gql`
mutation upFaseEstadoProyecs($_id: ObjectId,$newFase:String!,,$newEstado:String!){
  updateOneProyecto(query:{_id:$_id},set:{fase:$newFase,estado:$newEstado}){
    _id
  }
}
`;

export const UPDT_PROY_ADMIN = gql`
mutation upGenAdmin($_id: ObjectId,$newFase:String!,$newEstado:String!,$newFechaIng:DateTime!){
  updateOneProyecto(query:{_id:$_id},set:{fase:$newFase,estado:$newEstado,fechaIni:$newFechaIng}){
    _id
  }
}
`;

export const UPDT_INFO_PROY_LIDER = gql`
mutation updateDoc($_id: ObjectId!,$newNombre: String!,$newFechaIni: DateTime!) {
  updateOneProyecto(query: {_id:$_id}, set: {nombre:$newNombre,fechaIni:$newFechaIni,}) {
    _id
        
    }
}
`;

export const DEL_INSC_PROY = gql`
mutation delInscProy($newIdProy:String!) {
    deleteManyInscripcions(query: {idProyecto:$newIdProy}) {
    deletedCount
    }
  }
`;


export const ELIMINA_UNDOC = gql`
  mutation updateDoc($_id: ObjectId!) {
    deleteOneListaUsuariosBD(query: {_id:$_id}) {
    _id
    estado
		nombre
		tipo
}
  }
`;

export const ELIMINA_DOCS = gql`
      mutation updateDoc {
        deleteManyPeople(query:{}) {
            deletedCount
        }
      }
    ` ;



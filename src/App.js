import LoginPage from './components/LoginPage/LoginPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/Home/HomePage';
import { RegiUsers } from './components/UsuariosPage/RegiUsers';
import { client } from './BdMongoConf/configBD';
import { ApolloProvider} from "@apollo/client";
import ListUsers from './components/UsuariosPage/ListUsers';
import { UpGenUsers } from './components/UsuariosPage/UpGenUsers';
import { UpEstaUsers } from './components/UsuariosPage/UpEstaUsers';
import {RegiProjects} from './components/ProyectosPage/RegiProjects';
import {ListProjects} from './components/ProyectosPage/ListProjects';
import { UpGenProjects } from './components/ProyectosPage/UpGenProjects';
import { Inscripciones } from './components/Inscripciones/Inscripciones';
import ListAvances from './components/AvancesPage/ListAvances';
import {RegiAvances} from './components/AvancesPage/RegiAvances';
import { UpGenInsc } from './components/AvancesPage/UpGenInsc';
import { AgregaObservacion } from './components/AvancesPage/AgregaObservacion';
import { UpGenProjLider } from './components/ProyectosPage/UpGenProjLider';
import { PrivateRoute } from './components/config/PrivateRoute';

function App() {

  return (

    // RUTAS
<ApolloProvider client={client}>
    <Router>
      {/* Llama a la barra de navegacion desde su carpeta*/}
      
      <Switch>
        <Route path="/" exact>
            <LoginPage />
        </Route>
        <Route path="/RegisterPage" exact>
            <RegisterPage />
        </Route>
        
        <Route exact path="/HomePage/:user" component={HomePage}/>           
        
    {/* USUARIOS */}
        <Route exact path="/UpEstaUsers" component={UpEstaUsers}/>  
        <Route exact path="/UpGenUsers/:id" component={UpGenUsers}/>  
        <Route exact path="/RegiUsers/create" component={RegiUsers}/>  
        <Route exact path="/ModifyUsers" component={ListUsers}/>  

        {/* Seccion Proyectos */}
        <Route exact path="/RegiProjects/create/:nomLid" component={RegiProjects}/>
        <PrivateRoute exact path="/ListProjects/:id" component={ListProjects}/>
        <Route exact path="/UpGenProjects/:id" component={UpGenProjects}/>  
        <Route exact path="/UpGenProjLider/:id" component={UpGenProjLider}/>  
                    
        
        {/* Seccion Inscripciones */}
        <Route exact path="/Inscripciones" component={Inscripciones}/>
        
        {/* AVANCES */}
        <Route exact path="/RegiAvances/:id" component={RegiAvances}/>
        <Route exact path="/ListAvances/:id" component={ListAvances}/> 
        <Route exact path="/UpGenInsc/:id" component={UpGenInsc}/> 
        <Route exact path="/AgregaObservacion/:id" component={AgregaObservacion}/> 
        
        


      </Switch>
    </Router>
    
    </ApolloProvider>
  );
}

export default App;

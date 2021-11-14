import LoginPage from './LoginPage/LoginPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import RegisterPage from './RegisterPage/RegisterPage';
import NavbarComponent from './shared/components/NavbarComponent';
import HomePage from './Home/HomePage';
import {Productos} from './ProductosPage/Productos';
import {CreaProducto} from './RegistroProductoPage/CreaProducto';

function App() {
  return (

    // RUTAS

    <Router>
      {/* Llama a la barra de navegacion desde su carpeta*/}
      <NavbarComponent />
      <Switch>
        <Route path="/" exact>
            <LoginPage />
        </Route>
        <Route path="/RegisterPage" exact>
            <RegisterPage />
        </Route>
        <Route path="/HomePage" exact>
            <HomePage />
        </Route>
        {/* Seccion Productos */}
        
        <Route exact path="/productos" component={Productos}/>            
        <Route exact path="/lista-productos/:id" component={CreaProducto}/>
            
      </Switch>
    </Router>
  );
}

export default App;

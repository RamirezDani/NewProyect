import LoginPage from './LoginPage/LoginPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import RegisterPage from './RegisterPage/RegisterPage';
import NavbarComponent from './shared/components/NavbarComponent';
import HomePage from './Home/HomePage';
import ProductosPage from './ProductosPage/ProductosPage';
import RegistroProductoPage from './RegistroProductoPage/RegistroProductoPage';

function App() {
  return (
    <Router>
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
        <Route path="/ProductosPage" exact>
            <ProductosPage />
        </Route>
        <Route path="/RegistroProducto" exact>
            <RegistroProductoPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

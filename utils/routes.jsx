import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/account/login/index ";
import Profile from "../pages/account/profile";
import RecoverPassword from "../pages/account/recoverPassword";
import Sala from "../pages/admin/crud/sala";
import Mesas from "../pages/admin/crud/mesa";
import Dashboard from "../pages/admin/dashboard";
import Unidade from "../pages/admin/crud/unidades";


const Routes = (
    <Router>
      <Switch>
  
        <Route path='/' exact component={Login} />
        <Route path='/recuperar-senha' exact component={RecoverPassword} />
        <Route path='/admin/dashboard' exact component={Dashboard} />
        <Route path='/admin/sala' exact component={Sala}/>
        <Route path='/admin/unidades' exact component={Unidade}/>
        <Route path='/admin/mesa' exact component={Mesas}/>
        <Route path='/admin/perfil' exact component={Profile}/>
        
      </Switch>
    </Router>
  )
  
  export default Routes;

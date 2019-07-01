import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "./firebase";

import Policiaco from "./components/Policiaco";
import PaginaPrincipal from "./components/Principal";
import Tecnologia from "./components/Tecnologia";
import Deportes from "./components/Deportes";
import Login from "./components/Login";
import Admin from "./components/Administrar";
import Noticia from "./components/Noticia";
class Decidir extends Component{
  constructor(props) {
    super(props);
    this.CloseSession = this.CloseSession.bind(this);
    this.state={
      Usuario: this.props.Usr,
      Contra: this.props.Pss,
      Estado: this.props.Logged,
    }
    console.log(this.props.Logged,this.props.Pss,this.props.Usr);
  }
  CloseSession(){
    var upd=firebase.collection("Administrador").doc("jQZRfj15It5LedJgRuVU");
    upd.update({Logged:0}).then(res=> {
      console.log("Cerrar Sesion successfull");
      this.props.history.push('/');

    }).catch(function(err){
      console.log("Cerrar Sesion", err);
    });

  }

  render(){
  
    if(this.props.Logged===1){
      return(
        <div>
          <li className="navbar-nav mr-auto">
          <label >{this.state.Usuario}  {this.props.Estado}</label>
          </li>            
          <a className="btn btn-primary" href="/Admin" role="button">Administrar</a>    
          <a className="btn btn-primary" onClick={this.CloseSession} role="button">Cerrar Sesión</a>
        </div>
      );  
    }else{
      return(
        <div>
          <li className="navbar-nav mr-auto">
          </li>            
          <a className="btn btn-primary" href="/Login" role="button">Login</a>    
        </div>
      );
  
    }
    
  }
 }

class App extends Component {

  constructor(props) {
    super(props);
   this.state = {
     Usuario:'',
     Logged:'',
     Contrasenia:'',
    };
    this.actualizar();
  }

  actualizar(){

    var doc = firebase.collection('Administrador').doc('jQZRfj15It5LedJgRuVU');

    var observer = doc.onSnapshot(docSnapshot => {
      var n=docSnapshot.data().Nombre;
      var l=docSnapshot.data().Logged;
      var c=docSnapshot.data().Contrasenia;
      this.setState({
        Usuario:n,
        Logged:l,
        Contrasenia:c
      });
    console.log("observer: " ,docSnapshot.data());

    }, err => {
    console.log('Encountered error: ${err}');
    });


  }
  componentDidMount() {                  
    firebase.collection('Administrador').doc("jQZRfj15It5LedJgRuVU").get()
    .then((snapshot) => {
        var id=snapshot.id;
        var obj=snapshot.data();
        if(obj.Logged=="1"){
          this.setState({ 
            Usuario:obj.Nombre,
            Logged:obj.Logged,
            Contrasenia:obj.Contrasenia,
          });
            
        }else{
          this.setState({ 
            Usuario:"",
            Logged:"",
            Contrasenia:''
        });
    
        }         })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    }



  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">           
            <Link to="/" className="navbar-brand">Inicio </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/Deportes" className="nav-link">Deportes</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Policiaco" className="nav-link">Local</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Tecnologia" className="nav-link">Tecnología</Link>
                </li>
              </ul>
            </div>
            <Decidir Logged={this.state.Logged} Usr={this.state.Usuario} Pss={this.state.Contrasenia}/>   
          </nav>
          <br/>
          <Route path="/" exact component={PaginaPrincipal} />
          <Route path="/Deportes" component={Deportes} />
          <Route path="/Tecnologia" component={Tecnologia} />
          <Route path="/Policiaco" component={Policiaco} />
          <Route path="/Login" component={Login} />
          <Route path="/Admin" component={Admin} />
          <Route path="/Noticia/:id" component={Noticia} />
        </div>
      </Router>
    );
  }
}

export default App;
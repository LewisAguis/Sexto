import React, { Component } from 'react';
import firebase from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAlert } from 'react-alert'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsuario = this.onChangeUsuario.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
     Usuario:'',
     Pass:'',
    };
  }

  componentDidMount() {
    this.setState({ 
        Usuario:'',
        Pass:''    
    });
                    
    }

  onChangeUsuario(e) {
    this.setState({
      Usuario: e.target.value
    });
  }
  onChangePass(e) {
    this.setState({
      Pass: e.target.value
    }) ; 
  }

  login(id,obj){
    var usr=this.state.Usuario;
    var cont=this.state.Pass;

    if(usr==obj.Nombre && cont==obj.Contrasenia){
        console.log("Bienvenido");

        obj.Logged=1;
  
        console.log(obj);

        var upd=firebase.collection("Administrador").doc("jQZRfj15It5LedJgRuVU");
        upd.update(obj).then(res=> {
          console.log("Login successfull");
          this.props.history.push('/');

        }).catch(function(err){
        
        });
     


    }else{
      const alert = useAlert()
 
      const vare = () => {
          alert.show("Datos invalidos");
    }
    }
  }

  onFormSubmit(event) {
    event.preventDefault(); 
    var obj;
    var id;
    firebase.collection('Administrador').doc("jQZRfj15It5LedJgRuVU").get()
    .then((snapshot) => {
        id=snapshot.id;
        obj=snapshot.data();
        console.log(snapshot.data(),snapshot.id);
        this.login(id,obj);
    })
    .catch((err) => {
      
    });

    console.log(obj,id);

}

  render() {
    var style={
      width: '25rem'
    }
    return (
        <div style={style} className="card text-center mx-auto">
            <div className="card-body">
            <form className="form-signin" onSubmit={(e) => this.onFormSubmit(e)} >
              <div class="text-center mb-4">
                <img class="mb-4" src="https://png2.kisspng.com/sh/645e7b2d55e191e45178c1190e955b84/L0KzQYm3VcE5N51nj5H0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgV0baMyhNHwaX6wRbLthfQ3OGRnS9c5MUOxQYOAUcQ1PmU2TaQBNkWzQ4i4V8M3QF91htk=/kisspng-computer-icons-user-login-5afed603b3e013.1271446415266503717368.png" alt="" width="340" height="240"/>
                <h1 class="h3 mb-3 font-weight-normal">Introduzca su usuario y contraseña</h1>
              </div>
                <div className="form-label-group">
                    <input 
                      type="text" 
                      placeholder="Usuario"
                      className="form-control" 
                      value={this.state.Usuario}
                      onChange={this.onChangeUsuario}
                      />
                </div>
                <div className="form-label-group">
                    <input type="password" 
                      className="form-control"
                      placeholder="Contraseña"
                      value={this.state.Pass}
                      onChange={this.onChangePass}
                      />
                </div>
                
                <div className="btn btn-lg btn-primary btn-block">
                    <input type= "submit" 
                      value="Login" 
                      className="btn btn-primary"/> 
                </div>
                </form>   
             
           
                </div>
           
              </div>)
            }
          }
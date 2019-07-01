import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Validar from "./Validar";
import Editar from "./EditarNoticia";
import Lista from './ListaNoticias';
class Admin extends Component {

	
  render() {
    const style={
        marginRight: 50,
        display: "flex",
        alignItems:"start", 
        justifyContent: "space-between",
    };

    const style2={
        align: "center"
    };
    return (
        <Router> 
        <div style={style}>
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading" >Acciones: </div>
                    <div className="list-group list-group-flush">
                        <a href="/Admin/Validar" className="list-group-item list-group-item-action bg-light">Nueva Noticia</a>
                        <a href="/Admin/Listar" className="list-group-item list-group-item-action bg-light">Todas las Noticias</a>
                    </div>
            </div>
                <div style={style2}>
                    <div >
                    <Route path="/Admin/Validar" component={Validar} />
                    <Route path="/Admin/Listar" component={Lista} />
                    <Route path="/Admin/Listar/Editar/:id" component={Editar} />
                    </div>
                </div>
        </div>
        </Router>
    );
  }
}

export default Admin;
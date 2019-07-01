import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "../firebase";

class Fila extends Component {
	
    delete(i) {
      firebase.collection('Noticias').doc(i).delete();

    }
	
  render() {
      console.log(this.props.id);
    return (
        <tr>
          <td>
            {this.props.obj.Titulo}
          </td>
          <td>
            {this.props.obj.Autor}
          </td>
          <td>
            {this.props.obj.Descripcion}
          </td>

          <td>
            <Link to={"/Admin/Listar/Editar/"+this.props.id} className="btn btn-primary">Editar</Link>
          </td>
          <td>
            <button onClick={()=>this.delete(this.props.id)} className="btn btn-danger">Eliminar</button>
          </td>
        </tr>
    );
  }
}

export default Fila;
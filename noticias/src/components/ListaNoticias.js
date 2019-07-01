import React, { Component } from 'react';
import Fila from './Fila';
import firebase from "../firebase";


export default class TodosList extends Component {
	constructor(props) {
      super(props);
      this.Escuchar();
      this.state = {
          Noticias: []
        
    };
    }
    Escuchar(){
      var doc = firebase.collection('Noticias');

      var observer = doc.onSnapshot(docSnapshot => {
          var tmp=[];
          docSnapshot.forEach(doc => {
              tmp.push(doc);
          });

          this.setState({
              Noticias: tmp,
          });
      }, err => {
      console.log('Encountered error:',err);
      });
  
     
  }
	getNoticias(){
       
        firebase.collection("Noticias").get().then((querySnapshot) => {
            var temp=[];
            querySnapshot.forEach((doc) => {
                temp.push(doc);
                console.log(doc);
            });

            this.setState({
                Noticias:temp,
            });

        });
	}
		
    componentDidMount(){
      this.getNoticias();
    }
	
    tabRow(){
      return this.state.Noticias.map((object, i)=>
          <Fila refrescar={()=>this.getNoticias()} obj={object.data()} id={object.id} />);
    }

    render() {
      return (
        <div>
          <h3 align="center">Lista de Noticias</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
}
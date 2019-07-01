import React, { Component } from 'react';
import Card from './Card';
import firebase from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

class Fila extends Component{
    render() {
        var lim=this.props.fila+3;
        var f=this.props.fila;
        return this.props.datos.map((object, i)=>{
            if(i<lim && i>=f)
                return (
                    <td>
                        <Card obj={object.data()} id={object.id} />
                    </td>)
                });
        
      }
}

export default class Principal extends Component {

	
	constructor(props) {
      super(props);
      this.Escuchar();
      this.state = {
          Noticias: [], 
          Recientes:[],
        };
    }
	Escuchar(){

    }

	getNoticias(){
        
        firebase.collection('Noticias').orderBy("Likes",'desc').get().then(snapshot => {
            var tmp=[];
            snapshot.forEach(doc => {
                tmp.push(doc);
            });

            this.setState({
                Noticias: tmp,
            });


          })
          .catch(err => {
            console.log('Error getting documents', err);
          });

        firebase.collection('Noticias').orderBy("Fecha",'desc').get().then(snapshot => {
            var tmp=[];
            snapshot.forEach(doc => {
                tmp.push(doc);
            });

            this.setState({
                Recientes: tmp,
            });


          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
    
	}
		
    componentDidMount(){
      this.getNoticias();
    }
	
    tabRow(){
        var arr=[0,3,6];

      return arr.map((object, i)=><tr>
          <Fila refrescar={()=>this.getNoticias()} fila={object} datos={this.state.Noticias} />
          </tr>);
    }

    recientes(){
       
        return this.state.Recientes.map((object, i)=>{
            var ti=object.data().Fecha.toDate();
            var t=ti.toString();
            return(<a href={"/Noticia/"+object.id} className="list-group-item list-group-item-action bg-light">{object.data().Titulo} el {t}</a>
            );
        }
        );
    }

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
         <div>
        <div style={style}>
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading" >Mas Recientes: </div>
                <div className="list-group list-group-flush">
                  {this.recientes()}
                </div>
        </div>
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <tbody>
                            {this.tabRow()}
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
       </div>
       <footer>&copy; Copyright 2019, Creado en NodeJS y React JS</footer>
       </div>
      );
    }
}
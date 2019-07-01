import React, { Component } from 'react';
import firebase from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";


export default class Policiaco extends Component {

	
	constructor(props) {
      super(props);
      this.onChangeComentario=this.onChangeComentario.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
        this.Escuchar();
      this.state = {
        Titulo: '',
        Contenido: '',
        Imagen:'',
        Descripcion:'',
        Autor:'',
        Categoria:'',
        Comentarios:[],
        Likes:0,
        Recientes:[],
        Comentario:'',

        };
    }
    onChangeComentario(e) {
        console.log(this.state.Comentarios);
        this.setState({
          Comentario: e.target.value
        });
      }
    componentDidMount(){
    var NotRef = firebase.collection('Noticias').doc(this.props.match.params.id);
        var getDoc = NotRef.get()
            .then(doc => {
                this.setState({ 
                    Titulo: doc.data().Titulo, 
                    Contenido: doc.data().Contenido,
                    Imagen: doc.data().Imagen,
                    Descripcion: doc.data().Descripcion,
                    Autor: doc.data().Autor,
                    Categoria: doc.data().Categoria,
                    Comentarios:doc.data().Comentarios,
                    Likes: doc.data().Likes,
                   });
            })
            .catch(err => {
              console.log('Error getting document', err);
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

	Escuchar(){
        var rec=[];
        var t=true;
        var doc = firebase.collection('Noticias').doc(this.props.match.params.id);
    
        var observer = doc.onSnapshot(doc => {
          this.setState({

            Titulo: doc.data().Titulo, 
            Contenido: doc.data().Contenido,
            Imagen: doc.data().Imagen,
            Descripcion: doc.data().Descripcion,
            Autor: doc.data().Autor,
            Categoria: doc.data().Categoria,
            Comentarios:doc.data().Comentarios,
            Likes: doc.data().Likes,
         
        });
        
    
        }, err => {
        console.log('Encountered error: ${err}');
        });
    
        console.log("Recuperado: "+ rec)
    }
    onLike(){
        var cant=this.state.Likes;
        cant++;
        firebase.collection('Noticias').doc(this.props.match.params.id).update({
            Likes:cant,
          }).catch(err=>{
              console.log("error:", err);
          });
    }
   
    comentarios(){
        var arr=this.state.Comentarios.slice();
        arr=arr.reverse();
        return arr.map((cad,i)=>
            <li className='list-group-item active'>{cad}</li>
        );
    }

    recientes(){
       
        return this.state.Recientes.map((object, i)=>{
            var t= Date(object.data().Fecha);
            return(<a href={"/Noticia/"+object.id} className="list-group-item list-group-item-action bg-light">{object.data().Titulo} el {t}</a>
            );
        }
        );
    }
    onSubmit(e){
        e.preventDefault();
        if(this.state.Comentario!=''){
            var comments=this.state.Comentarios;
            comments.push(this.state.Comentario);
            firebase.collection('Noticias').doc(this.props.match.params.id).update({
                Comentarios:comments,
              }).catch(err=>{
                  console.log("error:", err);
              });
            this.state.Comentario='';
        }
     
    }
    render() {
        const style={
        marginRight: 50,
        display: "flex",
        alignItems:"start", 
        justifyContent: "space-around",
        height: 'auto'
    };

    const style2={
        align: "center"
    };
    var f=Date(this.state.Fecha);
      return (
        <div>
        <div style={style} >
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading" >Mas Recientes: </div>
                    <div className="list-group list-group-flush">
                    {this.recientes()}
                    </div>
            </div>
            
            <div className="container-fluid" style={style2}>
                <div className="container-fluid">
                <div className="table-responsive">
                    <blockquote className="blockquote text-center">
                        <p className='mb-0'>{this.state.Titulo}</p>
                        <footer className='blockquote-footer'> por {this.state.Autor} <cite title='$titulo'>el {f}</cite></footer>";
                    </blockquote>
                    <img src={this.state.Imagen} className='img-fluid rounded' alt='imagen'/>
                    <div className='card-body'><p className='card-text'>{this.state.Contenido}</p></div>
                </div>
                </div>
            </div>                 
        </div>      
        <button type="button" className="btn btn-primary" onClick={() => this.onLike()} >Like {this.state.Likes}</button>

        <div style={{ marginTop: 10 }}>
            <h3>Agregar un comentario</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Comente aqui:  </label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.Comentario}
                    onChange={this.onChangeComentario}
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Comentar" className="btn btn-primary"/>
            </div>
        </form>

        </div>
            <ul className="list-group">
                {this.comentarios()}
            </ul>   
        </div>
      );
    }
}
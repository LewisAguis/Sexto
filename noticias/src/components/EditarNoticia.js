import React, { Component } from 'react';
import firebase from "../firebase";


export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeContenido = this.onChangeContenido.bind(this);
    this.onChangeImagen = this.onChangeImagen.bind(this);
    this.onChangeDescripcion=this.onChangeDescripcion.bind(this);
    this.onChangeAutor=this.onChangeAutor.bind(this);
    this.onChangeCategoria=this.onChangeCategoria.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        Titulo: '',
        Contenido: '',
        Imagen:'',
        Descripcion:'',
        Autor:'',
        Categoria:''
    }
  }
  
  

  componentDidMount() {
    var NotRef = firebase.collection('Noticias').doc(this.props.match.params.id);
    var getDoc = NotRef.get()
        .then(doc => {
            this.setState({ 
                Titulo: doc.data().Titulo, 
                Contenido: doc.data().Contenido,
                Imagen: doc.data().Imagen,
                Descripcion: doc.data().Descripcion,
                Autor: doc.data().Autor,
                Categoria: doc.data().Categoria
               });
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
 
    }
  
  onChangeTitulo(e) {
    this.setState({
      Titulo: e.target.value
    });
  }
  onChangeContenido(e) {
    this.setState({
      Contenido: e.target.value
    })  
  }
  onChangeImagen(e) {
    this.setState({
      Imagen: e.target.value
    })
  }

  onChangeDescripcion(e) {
    this.setState({
      Descripcion: e.target.value
    })
  }


  onChangeAutor(e) {
    this.setState({
      Autor: e.target.value
    })
  }


  onChangeCategoria(e) {
    this.setState({
      Categoria: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      Titulo: this.state.Titulo,
      Contenido: this.state.Contenido,
      Imagen: this.state.Imagen,
      Descripcion: this.state.Descripcion,
      Autor:this.state.Autor,
      Categoria: this.state.Categoria

    };

    var notRef = firebase.collection('Noticias').doc(this.props.match.params.id);

    var updateSingle = notRef.update(obj);
  
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Actualizar Noticia</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Titulo:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.Titulo}
                      onChange={this.onChangeTitulo}
                      />
                </div>
                <div className="form-group">
                    <label>Categoria: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.Categoria}
                      onChange={this.onChangeCategoria}
                      />
                </div>
                <div className="form-group">
                    <label>Descripcion: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.Descripcion}
                      onChange={this.onChangeDescripcion}
                      />
                </div>

                <div className="form-group">
                    <label>Autor: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.Autor }
                      onChange={this.onChangeAutor}
                      />
                </div>

                <div className="form-group">
                    <label>Imagen: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.Imagen}
                      onChange={this.onChangeImagen}
                      />
                </div>

                <div className="form-group">
                    <label>Contenido: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.Contenido}
                      onChange={this.onChangeContenido}
                      />
                </div>


                <div className="form-group">
                    <input type= "submit" 
                      value="Actualizar Noticia" 
                      className="btn btn-primary"/> 
                </div>
                </form>      
              </div>)
            }
          }
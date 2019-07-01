import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

class Card extends Component {
	
    delete() {		
    }
	
  render() {
      var estilo={
          width: '6rem',
      }
      var estilo2={
        width: '18rem',
    }
    return (
        <div className='card' style={estilo2}>
            <img src={this.props.obj.Imagen} className='card-img-top' />
            <div className='card-body'>
                <h5 className='card-title'>{this.props.obj.Titulo}</h5>
                <p className='card-text'>{this.props.obj.Descripcion}</p>
                <a href={'Noticia/' + this.props.id} className='btn btn-primary'>Ir a Nota</a>
                <div className='badge badge-primary text-wrap' style={estilo}>{this.props.obj.Categoria}</div>
            </div>
        </div>
    );
  }
}

export default Card;
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';


class EditBoardScreen extends Component {
  static navigationOptions = {
    title: 'Editar Persona',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      nombre: '',
      direccion: '',
      telefono: '',
      nacimiento:'',
      matricula:'',
      sexo:''
    };
  }

  componentDidMount() {
    const { navigation } = this.props;    
    var clave=navigation.getParam('boardkey')
    const n=JSON.parse(clave);

    axios.get('http://192.168.43.137:4000/api/v1/personas/'+n)
          .then(response => {
                this.setState({ 
                nombre: response.data.nombre,
                direccion: response.data.direccion,
                telefono: response.data.telefono,
                nacimiento: response.data.nacimiento,
                matricula:response.data.matricula,
                sexo: response.data.sexo,
                key: response.data.id,
                isLoading: false,
 
               });
                
          })
          .catch(function (error) {
              console.log(error);
          })
    
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    var clave= this.state.key;

    var postData = {
    nombre: this.state.nombre,
    direccion: this.state.direccion,
    telefono: this.state.telefono,
    nacimiento: this.state.nacimiento,
    sexo: this.state.sexo,
    matricula: this.state.matricula,
  };


   axios.put('http://192.168.43.137:4000/api/v1/personas/'+this.state.key, postData)
        .then( res => {
        console.log(res.data); 
        this.state.isLoading=false;
      })
    .catch(err => console.log(err));  
 
     this.props.navigation.navigate('Board');

}



  render() {
      if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Nombre'}
                value={this.state.nombre}
                onChangeText={(text) => this.updateTextInput(text, 'nombre')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Apellido Paterno'}
                value={this.state.direccion}
                onChangeText={(text) => this.updateTextInput(text, 'direccion')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Apellido Materno'}
                value={this.state.telefono}
                onChangeText={(text) => this.updateTextInput(text, 'telefono')}
            />
          </View>
           <View style={styles.subContainer}>
            <TextInput
                placeholder={'Edad'}
                value={this.state.nacimiento}
                onChangeText={(text) => this.updateTextInput(text, 'nacimiento')}
            />
          </View>
           <View style={styles.subContainer}>
            <TextInput
                placeholder={'Matricula'}
                value={this.state.matricula}
                onChangeText={(text) => this.updateTextInput(text, 'matricula')}
            />
          </View>
           <View style={styles.subContainer}>
            <TextInput
                placeholder={'Sexo'}
                value={this.state.sexo}
                onChangeText={(text) => this.updateTextInput(text, 'sexo')}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{name: 'update'}}
              title='Actualizar'
              onPress={() => this.updateBoard()} />
          </View>
        </ScrollView>
      );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default EditBoardScreen;
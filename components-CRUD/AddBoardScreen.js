import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

class AddBoardScreen extends Component {
  static navigationOptions = {
    title: 'Añadir Persona',
  };
  constructor() {
    super();
    this.state = {
      nombre: '',
      direccion: '',
      telefono: '',
      nacimiento:'',
      matricula:'',
      sexo:'',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  saveBoard() {
    this.setState({
      isLoading: true,
    });

      const obj = {
      nombre: this.state.nombre,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      sexo: this.state.sexo,
      nacimiento: this.state.nacimiento,
      matricula: this.state.matricula
    };
    axios.post('http://192.168.43.137:4000/api/v1/personas', obj)
        .then(res => {
        this.setState({
          nombre: '',
      direccion: '',
      telefono: '',
      sexo:'',
      nacimiento:'',
      matricula:'',
      });
      this.props.navigation.goBack();
    
        }).catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    }); 
    


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
                multiline={true}
                placeholder={'Dirección'}
                value={this.state.direccion}
                onChangeText={(text) => this.updateTextInput(text, 'direccion')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Teléfono'}
                value={this.state.telefono}
                onChangeText={(text) => this.updateTextInput(text, 'telefono')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Nacimiento'}
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
              leftIcon={{name: 'Guardar'}}
              title='Save'
              onPress={() => this.saveBoard()} />
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


export default AddBoardScreen;
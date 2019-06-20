import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class AddBoardScreen extends Component {
  static navigationOptions = {
    title: 'Añadir Persona',
  };
  constructor() {
    super();
    this.ref = firebase.database().ref('Persona');
    this.state = {
      Nombre: '',
      ApellidoP: '',
      ApellidoM: '',
      Edad:'',
      Sexo:'',
      Matricula:'',
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

    firebase.database().ref('Persona').push({
	    Nombre: this.state.Nombre,
    	ApellidoP: this.state.ApellidoP,
    	ApellidoM: this.state.ApellidoM,
    	Edad:this.state.Edad,
    	Sexo:this.state.Sexo,
     	Matricula:this.state.Matricula,
     
     }).then((docRef) => {
      this.setState({
        Nombre: '',
    	ApellidoP: '',
    	ApellidoM: '',
    	Edad:'',
    	Sexo:'',
     	Matricula:'',
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
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
                value={this.state.Nombre}
                onChangeText={(text) => this.updateTextInput(text, 'Nombre')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                multiline={true}
                placeholder={'Apellido Paterno'}
                value={this.state.ApellidoP}
                onChangeText={(text) => this.updateTextInput(text, 'ApellidoP')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Apellido Materno'}
                value={this.state.ApellidoM}
                onChangeText={(text) => this.updateTextInput(text, 'ApellidoM')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Edad'}
                value={this.state.Edad}
                onChangeText={(text) => this.updateTextInput(text, 'Edad')}
            />
          </View>

          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Sexo'}
                value={this.state.Sexo}
                onChangeText={(text) => this.updateTextInput(text, 'Sexo')}
            />
          </View>

          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Matricula'}
                value={this.state.Matricula}
                onChangeText={(text) => this.updateTextInput(text, 'Matricula')}
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
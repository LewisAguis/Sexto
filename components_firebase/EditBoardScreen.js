import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class EditBoardScreen extends Component {
  static navigationOptions = {
    title: 'Editar Persona',
  };
  constructor() {
    super();
    this.ref = firebase.database().ref('Persona');
    this.state = {
      key: '',
      isLoading: true,
      Nombre: '',
      ApellidoP: '',
      ApellidoM: '',
      Edad:'',
      Sexo:'',
      Matricula:''
    };
  }

  Obtener(id){
  var obtnr=null;
  
  var rec = firebase.database().ref('Persona/' + id);
  rec.on("value", function(snapshot) {
  obtnr=snapshot;
  });
}
  componentDidMount() {
    const { navigation } = this.props;    
    var clave=navigation.getParam('boardkey')
    const n=JSON.parse(clave);
    firebase.database().ref('/Persona/' + n+'/').once('value')
    .then(snapshot=> {
        var Persona = snapshot.val();
        var id=snapshot.key;
        this.setState({
          Nombre: Persona.Nombre,
          ApellidoP: Persona.ApellidoP,
          ApellidoM: Persona.ApellidoM,
          Edad: Persona.Edad,
          Sexo: Persona.Sexo,
          Matricula: Persona.Matricula,
          key: id,
          isLoading: false,
        });
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
    Nombre: this.state.Nombre,
    ApellidoP: this.state.ApellidoP,
    ApellidoM: this.state.ApellidoM,
    Sexo: this.state.Sexo,
    Edad: this.state.Edad,
    Matricula: this.state.Matricula,
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['Persona/' + clave] = postData;
  firebase.database().ref().update(updates).then(res=>{
    this.state.isLoading=false;
  });    
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
                value={this.state.Nombre}
                onChangeText={(text) => this.updateTextInput(text, 'Nombre')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
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
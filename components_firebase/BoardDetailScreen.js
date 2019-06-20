import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../firebasedb';

class BoardDetailScreen extends Component {
  static navigationOptions = {
    title: 'Detalles de Persona',
  };
  
  constructor() {
    super();
    this.state = {
      isLoading: true,
      persona: {},
      key: ''
    };
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
          persona: Persona,
          key: id,
          isLoading: false,
        });
    })
}
  
  
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });

  firebase.database().ref("Persona/"+key).remove().then(res=>{
    console.log("Document successfully deleted!");
    this.state.isLoading=false;
    navigation.navigate('Board');
  }).catch((error)=>{
    console.error("Error eliminando el documento",error);
  }); 

  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.persona.Nombre}</Text>
            </View>
            <View>
              <Text h4>{this.state.persona.ApellidoP}</Text>
            </View>
            <View>
              <Text h4>{this.state.persona.ApellidoM}</Text>
            </View>
            <View>
              <Text h5>{this.state.persona.Edad}</Text>
            </View>            
            <View>
              <Text h5>{this.state.persona.Sexo}</Text>
            </View>
            <View>
              <Text h5>{this.state.persona.Matricula}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Editar'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Eliminar'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
        </Card>
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
    paddingBottom: 20,
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
  },
  detailButton: {
    marginTop: 10
  }
})


export default BoardDetailScreen;
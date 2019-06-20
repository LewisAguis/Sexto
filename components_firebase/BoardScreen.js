import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from '../firebasedb';


class BoardScreen extends Component {
  
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this.ref = firebase.database().ref('Persona');
    this.state = {
      isLoading: true,
      personas: []
    };
  }

  listenForBoards(ref) {
    
    ref.on("value", dataSnapshot => {
      const Personas = [];

      dataSnapshot.forEach(child => {
        console.log(child.val());
        Personas.push({
          Nombre: child.val().Nombre,
          ApellidoP: child.val().ApellidoP,
          ApellidoM: child.val().ApellidoM,
          Edad: child.val().Edad,
          Sexo:child.val().Sexo,
          Matricula:child.val().Matricula,
          key: child.key,
        });
      });
            
      this.setState({
        personas:Personas,
        isLoading: false,
      });
    });
  }
  
 
  componentDidMount() {
    this.listenForBoards(this.ref);
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Personas',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddBoard') }}
        />
      ),
    };
  };
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
          {
            this.state.personas.map((item, i) => (
              <ListItem
                key={i}
                title={item.Nombre}
                leftIcon={{name: 'user', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('BoardDetails', {
                    boardkey:  `${JSON.stringify(item.key)}`,
                  });
                }}
              />
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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

export default BoardScreen;
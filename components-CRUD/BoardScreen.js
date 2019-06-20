import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import axios from 'axios';


class BoardScreen extends Component {
  
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
  //  this.ref = firebase.database().ref('Persona');
    this.state = {
      isLoading: true,
      personas: []
    };
  }

  listenForBoards() {
      
      axios.get('http://192.168.43.137:4000/api/v1/personas')
        .then(response => {
          this.setState({ personas: response.data,
            isLoading:false,
          });
        })
        .catch(function (error) {
          console.log(error);
        })        

  
  }
  componentDidMount() {
    this.listenForBoards();
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Personas',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddBoard') }}
          refrescar={()=>this.listenForBoards()}
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
                title={item.nombre}
                leftIcon={{name: 'user', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('BoardDetails', {
                  boardkey: `${JSON.stringify(item.id)}`,});
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
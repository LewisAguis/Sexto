import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import axios from 'axios';

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
    axios.get('http://192.168.43.137:4000/api/v1/personas/'+n)
          .then(response => {
                this.setState({ 
                persona:response.data,
                key: response.data.id,
                isLoading: false,
 
               });
                
          })
          .catch(function (error) {
              console.log(error);
          })
    
}
  
  
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });

  axios.delete('http://192.168.43.137:4000/api/v1/personas/'+this.state.key)
            .then(response => {
            console.log("Document successfully deleted!");
            this.state.isLoading=false;
          navigation.navigate('Board');
        })
            .catch(err => console.log(err))
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
              <Text h3>{this.state.persona.nombre}</Text>
            </View>
            <View>
              <Text h4>{this.state.persona.direccion}</Text>
            </View>
            <View>
              <Text h4>{this.state.persona.telefono}</Text>
            </View>
            <View>
              <Text h5>{this.state.persona.nacimiento}</Text>
            </View>            
            <View>
              <Text h5>{this.state.persona.matricula}</Text>
            </View>
            <View>
              <Text h5>{this.state.persona.sexo}</Text>
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
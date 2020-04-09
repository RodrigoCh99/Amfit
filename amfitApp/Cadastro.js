import React, { Component } from 'react';

// Importando o "banco de dados" do celular 
import AsyncStorage from '@react-native-community/async-storage';

// Importando biblioteca para verificar conexão com a internet:
import NetInfo from '@react-native-community/netinfo'

// Importando de componentes react-native:
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a biblioteca que será o DB da aplicação:
import firebase from 'react-native-firebase'

export default class CadastroScreen extends Component {

  state = {
    email: '',
    password: '',
    isAuthenticaded: false,
  }

  // função que retorna para a tela de login:
  TelaLogin() {

    Actions.pop();

  }

  // função que ativa o routes e leva para a tela de config:
  TelaConfig() {

    Actions.configuracoes({email: this.state.email, password: this.state.password});

  } 

  cadastrar = async () => {

    NetInfo.fetch().then(async state => {

      const conex = state.isConnected

      // atribuindo os doados do estado a duas variaveis diferentes dentro da função:
      const { email, password } = this.state

      if (conex == true) {      
        
        // estrutura de decisão para impedir criação de usuario com email e senha nulos:
        if (email !=  '' && password != '') {
    
          // verificação se o usuario já existe no firebase
          try {
    
            // desenhando no console um separador de informações:
            console.log('========================================================================================================================================')
    
            // crição de um novo usuario a partir das variaveis email e senha criadas na função e armazenamento da resposta em uma constante resposta
            const resposta = await firebase.auth().createUserWithEmailAndPassword(email, password)
    
            // visualização da resposta:
            console.log(resposta)
    
            // se tudo der certo muda o estado de autenticação para true:
            this.setState( { isAuthenticaded: true } )
    
            // Salvando o Login para futura entrada com AsyncStorage
            console.log('salvando em async:')
    
            console.log('salvando auth')
            await AsyncStorage.setItem('isAuthenticaded', JSON.stringify(true))
    
            console.log('salvando e-mail')
            await AsyncStorage.setItem('email', this.state.email)
    
            console.log('salvando pssword')
            await AsyncStorage.setItem('password', this.state.password)
    
            // informando o usuario com um alerta:
            Alert.alert('Aviso', 'Usuario cadastrado com Sucesso!')
    
            // função que leva o usuario para tela de configurações:
            this.TelaConfig()
    
          } catch (erro) {
    
            const ErroString = erro.toString()

            console.log(ErroString)

            if (ErroString == "Error: The email address is badly formatted.") {

              Alert.alert('Aviso', 'A informação inserida não possui formato de e-mail')

            } else if (ErroString == 'Error: The given password is invalid. [ Password should be at least 6 characters ]'){

              Alert.alert('Aviso', 'A senha Inserida é invalida. ela deve possuir pelo menos 6 caracteries')

            } else {

              // mostra mensagem de erro padrão pro usuario:
              Alert.alert('Aviso - erro inesperado:', ErroString)

            }
            
          }
    
        } else {

          // Lembra o usuario de inserir informações:
          Alert.alert('Aviso', 'Para se cadastrar lembre-se de Inserir informações')

        }

      } else {

        Alert.alert('Aviso', 'Sem conexão com a Internet!')

      }

    }) 

  }

  render(){

    return(

      <View style={ styles.container }> 

        <Text style={ styles.titulo }>Tela de Cadastro</Text>

        {/* Input e-mail */}
        <TextInput 
          style={ styles.input }
          placeholder='Digite seu e-mail'
          value = {this.state.email}
          onChangeText={ email => this.setState( { email } ) }
        />

        {/* Input passord */}
        <TextInput 
          style={ styles.input }
          placeholder='Digite sua senha'
          value = {this.state.password}
          onChangeText={ password => this.setState( { password } ) }
        />

        {/* Botão de cadastro */}
        <TouchableOpacity style={styles.button} onPress={this.cadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* tela de login */}
        <TouchableOpacity onPress={this.TelaLogin}>
          <Text style={styles.link}>já possui cadastro? faça Login aqui!</Text>
        </TouchableOpacity>
      </View>

    )   
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#069',
    alignSelf: 'stretch',
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    padding: 30,
  },
  titulo: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    color: '#069'
  
  }
  
});



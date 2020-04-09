// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  Modal,
  Keyboard,
  Platform,
  PermissionsAndroid 
} from 'react-native';

// Importando o acesso ao "banco de dados" do celular:
import AsyncStorage from '@react-native-community/async-storage';

// Importando função que permite monitorar a conexão online do celular:
import NetInfo from '@react-native-community/netinfo'

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a biblioteca que será o DB da aplicação:
import firebase from 'react-native-firebase'

// Classe responsavel por toda a informação que ficará na tela de Login:
export default class LoginScreen extends Component {

  // estados da classe LoginScreen:
  state = {
    email: '',
    password: '',
    isAuthenticaded: false,
    uid: '',
  }

  // componente que é o primeiro a ser processado:
  componentDidMount = async () => {

    /*
    var firebaseConfig = {
      apiKey: "AIzaSyA2GMRZaQayEoCiBIkq9xRUOiNISXhtFnY",
      authDomain: "amfitfirebase2.firebaseapp.com",
      databaseURL: "https://amfitfirebase2.firebaseio.com",
      projectId: "amfitfirebase2",
      storageBucket: "amfitfirebase2.appspot.com",
      messagingSenderId: "715468288708",
      appId: "1:715468288708:web:1d6383fdf762e085fd0f91",
      measurementId: "G-BXKXW7NJ6L"
    };*/

    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    console.log('Confimação firebase ->', firebase)

    /*
    firebase.database().ref('testes/001').set({
        name: 'Rod',
        age: 20,

      }).then(() => {
        
         console.log('Inserted')

      }).catch(erro => {
        console.log('Erro na inserção')
      }) 
    */


    // variavel que armazena a lista de informações retirada do AsyncStroage:
    const ListaOff = await AsyncStorage.getItem('ListaCadastroOffLine')

    // Caso a lista não esteja vazia o usuario fez login recentemente, ou seja realizar a persistencia:
    if (ListaOff != null) {
      
      // convertendo as informações salvas no formato string em array:
      const ListArray = JSON.parse(ListaOff)

      // visualização titulo:
      console.log('Respostas AsyncStorage didMount:')
  
      // visualização:
      console.log(ListArray)
  
      // se a resposta for verdade, os dados puxados do AsyncStorage se tonam estados:
      if (ListArray[0] == 'true') {
  
        this.setState( { isAuthenticaded: true } )
  
        this.setState( { email: ListArray[1] } )
  
        this.setState( { password: ListArray[2] } )
  
        await this.login()
  
      }

    // Caso a lista esteja vazia o usuario não fez login recentemente, ou seja não existe persistencia:
    } else {

      // visualização de confirmação:
      console.log('primeira entrada offline.')

    } 
  } 

  // função que ativa o routes e leva para a tela de cadastro:
  TelaCadastro() {

    Actions.cadastro();

  }

  // função que ativa o routes e leva para a tela da camera:
  TelaCam() {

    Actions.camera({ email: this.state.email, senha: this.state.password ,uid: this.state.uid })

  }

  // função que utiliza o firebase para um autenticação de e-mail/senha
  login = async () => {


    // fechamento automatico do teclado pois a biblioteca camera entra em conflito caso ele não esteja fechado:
    Keyboard.dismiss()

    // funçã de verificação de conexão:
    NetInfo.fetch().then(async state => {
    
      // constante armazenando o estado da conexão com internet
      const con = state.isConnected
      
      // operador destructor pegando informações do state:
      // const { email, password } = this.state;

      const email = this.state.email
      const password = this.state.password

      // caso os 
      if (email != '' && password != '' ) {

        if (con == true) {

          console.log('com conexão')

          // tenta fazer a autenticação do usuario, caso exista erro printa no console e mostra um Alert.alert
          try {

            // Função assincrona que autentica o usuario no firebase
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);

            console.log('UID => ', user["user"]["uid"])

            const ID = JSON.stringify(user["user"]["uid"])

            console.log('Constante iD ==> ', ID)

            this.setState( { uid:  ID } )

            // se tudo der certo muda o estado de autenticação para true:
            this.setState( { isAuthenticaded: true } )

            // Salvando o Login para futura entrada com AsyncStorage
            console.log('salvando em async:')

            await AsyncStorage.setItem('isAuthenticaded', JSON.stringify(true))
            console.log('salvando auth')

            await AsyncStorage.setItem('email', this.state.email)
            console.log('salvando email')

            await AsyncStorage.setItem('password', this.state.password)
            console.log('salvando password')

            // await AsyncStorage.clear()
            await AsyncStorage.setItem('ListaCadastroOffLine', JSON.stringify( ['true', this.state.email, this.state.password] ) )

            // printa informações no console:
            console.log('========================================================================================================================================')

            console.log(user)

            console.log('========================================================================================================================================')

            // visualizações:
            console.log('Email atual:')

            console.log(this.state.email)

            console.log('Senha atual:')

            console.log(this.state.password)
            
            this.TelaCam()
            
            this.setState({ isAuthenticaded: false })

          } catch (err) {

            // printa erro no console:
            console.log(err);

            // mostra mensagem de erro padrão pro usuario:
            Alert.alert('Aviso', 'Senha Invalida ou este usuario não existe!')
          }

        } else {

          console.log('Vc não tem net seu lixo!')

          // resposta armazena se o usuario deixou ou não o app aberto portanto se ele pode ou não ir para uma tela logada
          const resposta = await AsyncStorage.getItem('ListaCadastroOffLine')

          if (resposta != null) {

            // conversão da respota em formato string de volta para seu formato original de array
            const respostArray = JSON.parse(resposta)
  
            // visualização no console:
            console.log( 'resposta array: ', respostArray )
  
            if ( this.state.email == respostArray[1] && this.state.password == respostArray[2] ) {
  
              if (respostArray[0] == 'true') {
                
                // setando o estado como verdadeiro caso as informações batam:
                this.setState( { isAuthenticaded: true } )
  
                // Chama a função que leva a tela de configurações após a confirmação:
                //this.TelaConfig()
                this.TelaCam()
  
              } else {
  
                Alert.alert('Aviso', 'Sem conexão com a Internet!')
                console.log('erro na autenticação off line, novo usuario entrando.')
  
              }
  
            } else {

              Alert.alert('Aviso', 'Devido a falta de conexão não foi possivel fazer login, confira seus dados e tente novamente mais tarde')
              console.log('erro na autenticação off line, usuario novo entrando ou erro na senha/email')

            }

          } else {

            Alert.alert('Aviso', 'Sem conexão com a Internet!')

          }

        } 
      } else {

        // Lembra o usuario de inserir informações:
        Alert.alert('Aviso', 'Insira informações para entrar')
        
      }

    })

  }  

  render() {
    return(     
      // Input E-mail
      <View style={ styles.container }> 

        <Text style={ styles.titulo }>Tela de Login</Text>

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
          value = { this.state.password }
          onChangeText={ password => this.setState( { password } ) }
        />

        {/* Botão de Login */}
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Logar!</Text>
        </TouchableOpacity>

        {/* tela de cadastro */}
        <TouchableOpacity onPress={this.TelaCadastro}>
          <Text style={styles.link}>Ainda não possui cadastro? cadastre-se aqui!</Text>
        </TouchableOpacity>

      </View>
    )   
  }
}

// Estilos Visuais do App:
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



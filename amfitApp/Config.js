// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

// Importando componente modal de alterações:
import ModalEmail from './AlterarEmail'

// Importando o segundo componente modal de alterações:
import ModalPassword from './AlterarSenha'

// Importando o "banco de dados" do celular 
import AsyncStorage from '@react-native-community/async-storage';

// Importando função que permite monitorar a conexão online do celular:
import NetInfo from '@react-native-community/netinfo'

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a biblioteca d=que será o DB da nossa aplicação:
import firebase from 'react-native-firebase'

export default class ConfigScreen extends Component {

  state = {

    email: '',
    password: '',
    visibleModalOne: false,
    visibleModalTwo: false,

  }

  // função para o logOut
  logout = async () => {

    AsyncStorage.removeItem('ListaCadastroOffLine', (err) => {

      if (err != null) {

        console.log('erro na saida:')

        console.log(err)

      } else {

        console.log('Visualização do asyncStorage no Logoff:')

        console.log(AsyncStorage)

        this.TelaLogin()

      }

    });
    
    
  }

  delete = async () => {

    var usuario = firebase.auth().currentUser

    console.log('firebase.auth().currentUser:')
    
    console.log(usuario)

    usuario.delete()

    Alert.alert('Aviso', 'seu usuario foi deletado com sucesso!')

    this.logout()

  }

  TelaLogin() {

    Actions.login();

  }

  // Este componente por padrão é sempre o primairo a ser chamado no react-native
  componentDidMount = async () => {

    // a partir do momento em que a tela é renderizada todos os dados do usurio autenticado passaram da autenticação para a nova tela:

    // Utilizando a lista armazenada na memoria do celular sobre o usuario
    const ListaOff = await AsyncStorage.getItem('ListaCadastroOffLine')

    // convertendo a lista de strings em array
    const ListArray = JSON.parse(ListaOff)

    // Intanciando os estados de config com as variavel de dentro do array:
    this.setState( { email: ListArray[1] } )
    this.setState( { password: ListArray[2] } )
  
    console.log('----------------------------------------------------------------------')
    // visualização no console
    console.log('listArray na TelaConfig:')
    console.log(ListArray)
    console.log('estados no Config:')
    console.log(this.state.email)
    console.log(this.state.password)
    console.log('----------------------------------------------------------------------')

  }

  showModalOne = () => {

    NetInfo.fetch().then(async state => {

      const conex = state.isConnected

      if (conex == true) {

        this.setState({ visibleModalOne: true })

      } else {

        Alert.alert('Aviso', 'Esta ação só é possivel com conexão a internet!')

      }

    })
  }

  showModalTwo = () => {

    NetInfo.fetch().then(async state => {

      const conex = state.isConnected

      if (conex == true) {

        this.setState({ visibleModalTwo: true })

      } else {

        Alert.alert('Aviso', 'Esta ação só é possivel com conexão a internet!')

      }

    })

  }

  SaveModalOne = async ( NovoEmail ) => {

    console.log(' A função que salva a mudança de e-mail foi ativada! ')

    var usuario = firebase.auth().currentUser

    try {

      const resposta = await usuario.updateEmail( NovoEmail )

      this.setState({ email: NovoEmail })

    } catch (erro) {

      if (erro = '[Error: The email address is badly formatted.]') {
        Alert.alert('Aviso', 'Informação inserida não possui formato de e-mail')
      }

      console.log('Erro em SaveModalOne')
      console.log(erro)
      
    }
    
  }

  SaveModalTwo = async ( NovaSenha ) => {

    console.log(' A função que salva a mudança de senha foi ativada! ')

    var usuario = firebase.auth().currentUser

    try {

      const resposta = await usuario.updatePassword( NovaSenha )

      this.setState({ password:  NovaSenha })

    } catch (erro) {

      Alert.alert('Aviso', 'erro na senha, por favor insira novamente!')

      console.log('Erro em SaveModalTwo')
      console.log(erro)

    }

  }

  render() {

    return(

      <View style={ styles.container }> 

        <View>
          
          <ModalEmail  

            visible={ this.state.visibleModalOne } 
            SalvarEmail={ this.SaveModalOne } 
            Cancelar={ () => this.setState({ visibleModalOne: false }) }
            emailAtual={ this.state.email }

          />

          <ModalPassword

            visible={ this.state.visibleModalTwo } 
            SalvarSenha={ this.SaveModalTwo }
            Cancelar={ () => this.setState({ visibleModalTwo: false }) }
            senhaAtual={ this.state.password }

          />  

        </View>

        <Text style={ styles.titulo }>Configurações</Text> 
        
        <Text style={styles.subtitulo}>E-mail Cadastrado:</Text>

        <Text style={styles.info}>{this.state.email}</Text>

        <TouchableOpacity style={styles.subbutton} onPress={ this.showModalOne }>

          <Text style={styles.subbuttonText}>Alterar</Text>

        </TouchableOpacity>


        <Text style={styles.subtitulo}>Senha Cadastrada:</Text>


        <Text style={styles.info}>{this.state.password}</Text>

        <TouchableOpacity style={styles.subbutton} onPress={ this.showModalTwo }>

          <Text style={styles.subbuttonText}>Alterar</Text>

        </TouchableOpacity>

        {/* Botão de sair */}
        <TouchableOpacity style={styles.button} onPress={ this.logout }>

          <Text style={styles.buttonText}>Sair</Text>

        </TouchableOpacity>

        {/* Botão de sair */}
        <TouchableOpacity style={styles.button2} onPress={ this.delete }>

          <Text style={styles.buttonText}>Deletar conta</Text>

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
  subtitulo: {

    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingHorizontal: 10,

  },
  info: {

    height: 18,
    fontSize: 14,
    alignSelf: 'stretch',
    paddingHorizontal: 10,

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
  button2: {

    marginTop: 25,
    height: 45,
    backgroundColor: 'red',
    alignSelf: 'stretch',
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  subbutton: {

    height: 22,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    margin: 12,
    marginLeft: 0,

  },
  subbuttonText: {

    fontWeight: 'bold',
    color: '#069',

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



// Importando o componente do React
import React, { Component } from 'react';
// Importando a biblioteca que será o DB da aplicação:
import firebase from 'react-native-firebase'

// Importando componentes react-native
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Alert, 
  Image, 
  PermissionsAndroid, 
  Platform,
  Modal
} from 'react-native';

// Importando a biblioteca de manipulação da câmera react-native
import { RNCamera } from 'react-native-camera';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando o acesso ao "banco de dados" do celular:
import AsyncStorage from '@react-native-community/async-storage';

// Importando função que permite monitorar a conexão online do celular:
import NetInfo from '@react-native-community/netinfo'

// Importando componente modal de alterações:
import FormFoto from './FormFoto'

// Importando biblioteca de localização geográfica
import Geolocation from 'react-native-geolocation-service'

export default class CamScreen extends Component {

  state = {
    email: this.props.email,
    senha: this.props.senha,
    uid: this.props.uid,
    ImgCode: '',
    ImgPath: '',
    visibleForm: false,
    carregando: false,
    posicao: '',
    latitude: '',
    longitude: '',
    classificacoes: '',
  }

  TerPermissaoLocal = async () => {

    if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  PegarLocalizacao = async () => {

    const TerPermissaoLocal = await this.TerPermissaoLocal();

    if (!TerPermissaoLocal) return;

    this.setState({ carregando: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          
          this.setState({ posicao: position, carregando: false });
          this.setState( 
            { latitude:  position["coords"]["latitude"],
              longitude: position["coords"]["longitude"] },
               () => console.log('Latitude | Longitude', this.state.latitude + '|' + this.state.longitude ))

        },
        (error) => {
          this.setState({ posicao: error, carregando: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    });
  }

  TirarFoto = async () => {

    console.log('UID EM CÂMERA --> --> --> ', this.state.uid )

    await this.ListarInfracoes2()

    await this.PegarLocalizacao()
  
    try {

      if (this.camera) {

        const opcoes = { 
  
           quality: 0.5,
           base64: true,

          };
        
        const dados = await this.camera.takePictureAsync(opcoes)

        // console.log(dados)
        // console.log('Visualização da Imagem em base 64: \n', dados["base64"])

        this.setState({ ImgCode: dados["base64"] })
        this.setState({ ImgPath: dados.uri })

        //console.log('estado Imagem Path em Cam: ', this.state.ImgPath)
        //console.log('estado Base64 em Cam: ', this.state.ImgCode)
  
        this.showForm()

      }

    } catch (erro) {

      console.log('veio para erro:')
      console.log(erro)

      Alert.alert('Erro:', erro.message)

    }

  }

  /*
  ListarInfracoes = async () => {
        
    firebase.database().ref('/Classificacoes').on('value',  (dados) => {

      //console.log('chaves ->', Object.keys(dados["_value"]))
      //console.log('valores ->', Object.values(dados["_value"]))

      const arrayClassificacoes = []

      for (var i = 0; i < 5; i++) {

        arrayClassificacoes.push( Object.keys(dados["_value"])[i] + ' - ' +  Object.values(dados["_value"])[i] )
        
      }

      //console.log('Array de classificações =>', arrayClassificacoes)

      return this.setState({ classificacoes: arrayClassificacoes })

    })
  }
  */

  ListarInfracoes2 = async () => {

    var that = this
    var firebaseRef = firebase.database().ref('/Classificacoes')

    await firebaseRef.once('value')
      .then( function (dados) {

        //console.log('dados ListarInfrações2 =>>' + dados)

        const arrayClassificacoes = []

        for (var i = 0; i < 5; i++) {

          arrayClassificacoes.push( Object.keys(dados["_value"])[i] + ' - ' +  Object.values(dados["_value"])[i] )

        }

        that.setState({ classificacoes: arrayClassificacoes })

      })

    //console.log('Classificação sem that =>>'+ this.state.classificacoes)

    
  }


  showForm() {

    // this.ListarInfracoes2()

    this.setState({ visibleForm: true })

  }

  // função que ativa o routes e leva para a tela de config:
  TelaConfig = async () => {

    Actions.configuracoes();

  } 

  // função que ativa o routes e leva para a tela de lista:
  TelaLista= async () => {

    //console.log( 'UID -> ', this.state.uid )

    Actions.lista({ uid: this.state.uid })

  } 

  render() {

    return (

      <View style={styles.container}>

        <View>
          <FormFoto 
            visible={ this.state.visibleForm } 
            Cancelar={ () => this.setState({ visibleForm: false }) }
            ImgCode={ this.state.ImgCode }
            ImgPath={ this.state.ImgPath }
            Imglong={ this.state.longitude }
            Imglati={ this.state.latitude }
            ImgUser={ this.state.email }
            ImgPass={ this.state.senha }
            ImgUid={ this.state.uid }
            ImgClass={ this.state.classificacoes }
          />
        </View>

        {/* Utilizando a classe que manipula a câmera */}
        <RNCamera 

          // definindo a referencia do objeto câmera
          ref= { camera => { this.camera = camera } }

          // estilo da câmera 
          style={styles.preview} 

          // Prop para indicar se a câmera utilizada será a frontal ou traseira. 
          type={RNCamera.Constants.Type.back} 

          // Prop para indicar se ao capturar a imagem o Flash da câmera deve ser usado. 
          flashMode={RNCamera.Constants.FlashMode.off}

        >

          {/* definição em formato de linha de varias opacidades tocaveis */}
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

            {/* Implementação da biblioteca de icones vetoriais com o objetivo de criar um botão que leva para config */}
            <TouchableOpacity onPress={ this.TelaConfig } style={styles.capture}>

              <Text><Icon name="gear" size={30} color="#fff" /></Text>

            </TouchableOpacity>
            
            {/* Implementação da biblioteca de icones vetoriais com o objetivo de criar um botão que tira a foto */}
            <TouchableOpacity onPress={ this.TirarFoto } style={styles.capture}>

              <Text> <Icon name="camera" size={45} color="#fff" /></Text>

            </TouchableOpacity>
            
            {/* Implementação da biblioteca de icones vetoriais com o objetivo de criar um botão que leva para a lista  de fotos*/}
            <TouchableOpacity onPress={ this.TelaLista } style={styles.capture}>

              <Text><Icon name="list" size={30} color="#fff" /></Text>

            </TouchableOpacity>
            
          </View>

        </RNCamera>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
});
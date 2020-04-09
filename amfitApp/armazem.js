import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class CamScreen extends Component {

  // função que ativa o routes e leva para a tela de config:
  TelaConfig() {

    Actions.configuracoes();

  } 

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

                <TouchableOpacity onPress={ this.TelaConfig } style={styles.capture}>
                  <Text><Icon name="gear" size={30} color="#fff" /></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text><Icon name="camera" size={45} color="#fff" /></Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {}} style={styles.capture}>
                  <Text><Icon name="list" size={30} color="#fff" /></Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };
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
});

AppRegistry.registerComponent('App', () => ExampleApp);

// ===========================================================================================================
// ===========================================================================================================
// ===========================================================================================================
// ===========================================================================================================
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importando a função principal da biblioteca da câmera em react-native:
import { RNCamera } from 'react-native-camera';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

const PendingView = () => (
  <View
    style={{

      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',

    }}
  >
    <Text>Waiting</Text>

  </View>
);

// classe responsavel pelas funções que a tela de camera irá executar:
export default class CamScreen extends PureComponent {

  // função qeu realiza efetivamente a fotografia:
  TirarFoto = async function(camera) {

    const opcoes = { quality: 0.5, base64: true };
    const dado = await camera.takePictureAsync(opcoes);

    //  eslint-disable-next-line
    console.log(dado.uri);
  };

  // função que ativa o routes e leva para a tela de config:
  TelaConfig() {

    Actions.configuracoes();

  } 
  

  render() {
    return (

      <View style={styles.container}>

        {/* Configuração da camera da Android e IOS*/}
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >

          {({ camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

                <TouchableOpacity onPress={ this.TelaConfig } style={styles.capture}>
                  <Text><Icon name="gear" size={30} color="#fff" /></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.TirarFoto(camera)} style={styles.capture}>
                  <Text> <Icon name="camera" size={45} color="#fff" /></Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {}} style={styles.capture}>
                  <Text><Icon name="list" size={30} color="#fff" /></Text>
                </TouchableOpacity>
            </View>
            );
          }}
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
});

AppRegistry.registerComponent('App', () => ExampleApp);

// ===============================================================================================================================================

import React, { Component } from 'react'

import { Modal, View, Text, TextInput, TouchableWithoutFeedback,
         TouchableOpacity, StyleSheet, Alert, Image} from 'react-native'

export default class FormFoto extends Component {

    state = {

        Img64: '',
        path: '',

    }

    componentWillReceiveProps = async () => {
        console.log('Veio para o modal!')
        this.setState({ Img64: this.props.ImgCode })
        this.setState({ path: this.props.ImgPath })

        console.log('==>', this.state.Img64 )
        

    }

    render() {
        return(
            <Modal onRequestClose={ this.props.Cancelar } 
                visible={this.props.visible}
                animationType='slide'
                transparent={ true }>

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>

                <View style={ styles.container }>

                    <View style= {{backgroundColor: 'white'}}>

                        <Image source={{uri: 'data:image/png;base64,' + this.state.Img64 }}/>

                    </View>

                </View>

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    constainer: {

        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#069',
    },
    header: {
        backgroundColor: '#069',
        color: 'white',
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    ModelText: {
        color: 'black',
        padding: 2,
        fontSize: 15,
        marginLeft: 12,
        marginTop: 10,
        textAlign: 'left',
    },
    input: {
       width: '90%',
       height: 40,
       marginTop: 10,
       marginLeft: 10,
       backgroundColor: 'white', 
       borderWidth: 1,
       borderColor: '#e3e3e3',
       borderRadius: 6
    }

})

{"coords": 
  {"accuracy": 48.50325012207031, 
   "altitude": 1191.579345703125, 
   "heading": 2.400754451751709, 
   "latitude": -15.80582871162235, 
   "longitude": -48.034516694064635, 
   "speed": 8}, 
   "mocked": false, 
   "timestamp": 1573739819690
}

/* ======================================================================================================================
======================================================================================================================
======================================================================================================================
======================================================================================================================
====================================================================================================================== */
/* ======================================================================================================================
======================================================================================================================
======================================================================================================================
======================================================================================================================
====================================================================================================================== */
/* ======================================================================================================================
======================================================================================================================
======================================================================================================================
======================================================================================================================
====================================================================================================================== */
/* ======================================================================================================================
======================================================================================================================
======================================================================================================================
======================================================================================================================
====================================================================================================================== */

// Importando o componente do React
import React, { Component } from 'react';

// Importando componentes react-native
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, PermissionsAndroid, Platform} from 'react-native';

// Importando a biblioteca de manipulação da câmera react-native
import { RNCamera } from 'react-native-camera';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a função que permite a navegação da biblioteca routes
import { Actions, Modal } from 'react-native-router-flux';

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

    // estado contador de imagens tiradas pela câmera:
    ImgCode: '',
    ImgPath: '',
    visibleForm: false,
    loading: false,
    location: '',
  }

  hasLocationPermission = async () => {

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

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false });
          console.log(position);
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    });
  }

  TirarFoto = async () => {

    await this.getLocation()
  
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

  showForm = () => {

    this.setState({ visibleForm: true })

  }



  // função que ativa o routes e leva para a tela de config:
  TelaConfig() {

    Actions.configuracoes();

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
            <TouchableOpacity onPress={() => {}} style={styles.capture}>

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


// =============================================================================================================================
import React, { Component } from 'react'

import { 
    Modal, 
    View, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback,
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    Image, 
    Dimensions } from 'react-native'

export default class FormFoto extends Component {

    state = {

        Img64: ' ',
        path: ' ',
        time: ' ',
        dia: ' ',
        mes: ' ',
        ano: ' ',
        hora: ' ',
        minuto: ' ',
        segundo: ' ',

    }

    componentWillReceiveProps = async () => {

        this.setState({ Img64: this.props.ImgCode })

        this.setState({ path: this.props.ImgPath })
    
    }

    componentDidMount = async () => {

        console.log('modal - componentDidMount')

        const dia = new Date().getDate()
        const mes = new Date().getMonth()
        const ano = new Date().getFullYear()
        const hora = new Date().getHours()
        const minuto = new Date().getMinutes()
        const segundo = new Date().getSeconds()

        this.setState({ 
            
            dia: dia, 
            mes: mes, 
            ano: ano, 
            hora: hora, 
            minuto: minuto, 
            segundo: segundo },

            () => { 
                console.log('Data atual ->', this.state.dia + '/' + this.state.mes + '/' + this.state.ano) 
            }
        )

    }

    render() {
        return(
            <Modal onRequestClose={ this.props.Cancelar } 
                visible={ this.props.visible }
                animationType='slide'
                transparent={ true }>

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>

                <View style={ styles.container }>

                    <View style= {{backgroundColor: 'white'}}>

                        <Text style={ styles.header }>Formulario de Denuncia</Text>

                        <Text style={styles.ModelText}></Text>

                    </View>

                <View style= {{flexDirection:'row', justifyContent: 'center', backgroundColor: 'white'}}>

                    <Image style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: 350, height: 250}} source={{uri: `data:image/png;base64,${this.state.Img64}` }}/>


                </View>

                    <View style= {{backgroundColor: 'white'}}>
                        <Text style={styles.ModelText}>Data da denuncia:</Text>
                        <Text style={styles.ModelSubText}>{this.state.dia + '/' + this.state.mes + '/' + this.state.ano}</Text>
                        <Text style={styles.ModelText}>Horario da denuncia:</Text>
                        <Text style={styles.ModelSubText}>{this.state.hora + ':' + this.state.minuto + ':' + this.state.segundo}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  backgroundColor: 'white'}}>

                       <TouchableOpacity onPress={this.props.Cancelar}>

                           <Text style={styles.button}>Cancelar</Text>

                       </TouchableOpacity> 

                       <TouchableOpacity onPress={() => {}}>

                           <Text style={styles.button}>Confirmar</Text>

                       </TouchableOpacity> 

                    </View>
                    
                </View>

                <TouchableWithoutFeedback onPress={this.props.Cancelar}>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>                

            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    constainer: {

        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#069',
    },
    header: {
        backgroundColor: '#069',
        color: 'white',
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    ModelText: {
        color: 'black',
        padding: 1,
        fontSize: 15,
        marginLeft: 10,
        marginTop: 2,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    ModelSubText: {
        color: 'black',
        padding: 1,
        fontSize: 15,
        marginLeft: 10,
        marginTop: 2,
        textAlign: 'left',
    },
    input: {
       width: '90%',
       height: 40,
       marginTop: 10,
       marginLeft: 10,
       backgroundColor: 'white', 
       borderWidth: 1,
       borderColor: '#e3e3e3',
       borderRadius: 6
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
    },
    modalImage: {
        width: Dimensions.get('window').width * 0.8,
        marginHorizontal: Dimensions.get('window').width * 0.1,
    }
})

// ===================================================================================================================
// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a biblioteca que será o DB da aplicação:
import firebase from 'react-native-firebase'

// Classe responsavel por toda a informação que ficará na tela de Lista de denuncias:
export default class ListaScreen extends Component {

    state = {

        dados: [
            {id: '1', data: '01/08/2016', Horario: '16:30:02', resposta: 'Autuado'},
            {id: '2', data: '01/09/2016', Horario: '14:00:02', resposta: 'Em andamento'},
            {id: '3', data: '01/08/2011', Horario: '23:55:02', resposta: 'Autuado'},
            {id: '4', data: '01/08/1999', Horario: '20:30:02', resposta: 'Negada'},
            {id: '5', data: '01/08/1980', Horario: '16:10:02', resposta: 'Autuado'}
        ],
    }

    renderItem = ( { item } ) => (

        <View style={styles.listItem}>

            <Text>{ item.resposta }</Text>

        </View>
    )

    carregarDados = async () => {

        firebase.database().ref('/Denuncias').once('value', (data) => {

            console.log('dados -> ->', data.val()["-LudQPox3Jynq28k4seT"]["anoDenuncia"])

        })
    }

    componentDidMount = async () => {
        
        
        this.carregarDados()

    }

    render() {

        return( 

            <View >

                <View style={styles.container}>

                    <Text style={ styles.titulo }>Lista de Denuncias</Text>

                </View>

                <View>

                    <FlatList
                        style={{ marginTop: 30 }}
                        contentContainerStyle={ styles.list }
                        data={ this.state.dados }
                        renderItem={ this.renderItem }
                        keyExtractor={ item => item.id }
                    />

                </View>
                
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
    titulo: {

        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 80,
        marginTop: 80,
        color: '#069',
        
      
    },
    list: {

        paddingHorizontal: 20,

    },
    listItem: {

        backgroundColor: '#EEE',
        marginTop: 20,
        padding: 30,

    },

})

// ===========================================================================================================================================================
carregarDados = () => {

  const resposta = firebase.database().ref('/Denuncias' + '/' + this.state.uid ).on('value', function(dados) {

      //console.log('Valores ->', Object.values(dados)[2]["-LusNODTfKUop_ygjNRZ"])

      const ArrayDados = []

      for (var c in Object.values(dados)[2]) {
          ArrayDados.push( Object.values(dados)[2][c] )
      }

      // Visualização:
      //console.log('Array de dados: ', ArrayDados)

      /* Testes:
      for ( var subdata in ArrayDados ) {
          console.log( 'SUBDATA ==', ArrayDados[subdata]["minutoDenuncia"] )
      }
      */

      return ArrayDados
  }) 
}

// ==================================================================================================================================
import React, { Component } from 'react'

import { 
    Modal, 
    View, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback,
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    Image, 
    Dimensions,
    Picker } from 'react-native'

// Importando a biblioteca que será o DB da aplicação:
import firebase from 'react-native-firebase'

export default class FormFoto extends Component {

    state = {

        Img64: '',
        path: '',
        time: '',
        latitude: '',
        longitude: '',
        Infracao: ' ',
        email: '',
        senha: '',
        uid: '',
        cassificacoes: '',
        teste: ["Estacionado afastado do meio-fio mais de 1 metro", "Estacionado no passeio (local de movimentação de pedestres)", "Estacionado impedindo movimentação de outro veiculo", "Estacionado ao lado de outro veiculo em fila dupla", "Estacionado na contramão"],
        teste2: '',

    }

    ListarInfracoes = async () => {

        var that = this
        var firebaseRef = firebase.database().ref('/Classificacoes')
    
        await firebaseRef.once('value')
          .then( function (dados) {
    
            //console.log('dados ListarInfrações2 =>>' + dados)
    
            const arrayClassificacoes = []
    
            for (var i = 0; i < 5; i++) {
    
              arrayClassificacoes.push( Object.keys(dados["_value"])[i] + ' - ' +  Object.values(dados["_value"])[i] )
              //arrayClassificacoes.push(Object.values(dados["_value"])[i])
    
            }
    
            that.setState({ classificacoes: arrayClassificacoes })
    
          })
    
        //console.log('Classificação sem that =>>'+ this.state.classificacoes)
    
        
    }

    
    componentWillReceiveProps = async () => {

        //console.log(' >=> Antes Classificações >=> ')
        //console.log(this.state.classificacoes)

        await this.ListarInfracoes()

        //console.log(' >=> Após Classificações >=> ')
        //console.log(this.state.classificacoes)
        
        this.setState({ Img64: this.props.ImgCode })
        this.setState({ path: this.props.ImgPath })
        this.setState({ latitude: this.props.Imglati})
        this.setState({ longitude: this.props.Imglong})
        this.setState({ email: this.props.ImgUser })
        this.setState({ senha: this.props.ImgPass })
        this.setState({ uid: this.props.ImgUid })

        console.log( ' --- Path ---')
        console.log(this.state.path)

    }
    
    /*
    componentDidMount() {

        console.log(' *** Path *** ')
        console.log( this.state.ImgPath )

        this.ListarInfracoes()
    }
    */

    itemPicker = (array) => {

        const itens = this.state.cassificacoes

        console.log("itens ----- " + itens)

        //itens.map( (item, index) => { return (<Picker.Item label={item} value={item} key={item}/>) } ) 
    }

    SalvarDenuncia = async () => {
      
        console.log('O UID do usuario atual é -> -> ', this.state.uid)
 
        firebase.database().ref('/Denuncias' + '/' + this.state.uid ).push({

            idUsuario: this.state.email,
            diaDenuncia: new Date().getDate(),
            mesDenuncia: (new Date().getMonth() + 1),
            anoDenuncia: new Date().getFullYear(),
            horaDenuncia: new Date().getHours(),
            minutoDenuncia: new Date().getMinutes(),
            segundoDenuncia: new Date().getSeconds(),
            posicaoLongitude: this.state.longitude,
            posicaoLatitude: this.state.latitude,
            imagemDenuncia: this.state.Img64,

          }).then(() => {
            
            console.log('Inserted')

            Alert.alert('Denuncia efetivada com sucesso!')

            this.props.Cancelar()
            
          }).catch(erro => {

            console.log('Erro na inserção')

            Alert.alert('Erro ao efetivar denuncia!')

            this.props.Cancelar()

          })
    } 

    render() {

        return(

            <Modal onRequestClose={ this.props.Cancelar } 
                visible={ this.props.visible }
                animationType='slide'
                transparent={ true }>

                {/*

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>

                */}

                <View style={ styles.container }>

                    <View style= {{backgroundColor: 'white'}}>

                        <Text style={ styles.header }>Formulario de Denuncia</Text>

                        <Text style={styles.ModelText}></Text>

                    </View>

                <View style= {{flexDirection:'row', justifyContent: 'center', backgroundColor: 'white'}}>

                    <Image style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: 350, height: 250}} source={{uri: `data:image/png;base64,${this.state.Img64}` }}/>

                </View>

                    <View style= {{backgroundColor: 'white'}}>
                        
                        {/*<Text style={styles.ModelText}>Data da denuncia:</Text>
                        <Text style={styles.ModelSubText}>{ new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() }</Text>
                        <Text style={styles.ModelText}>Horario da denuncia:</Text>
                        <Text style={styles.ModelSubText}>{ new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() }</Text>
                        <Text style={styles.ModelText}>Latitude:</Text>
                        <Text style={styles.ModelSubText}>{ this.state.latitude }</Text>
                        <Text style={styles.ModelText}>Longitude:</Text>
                        <Text style={styles.ModelSubText}>{ this.state.longitude }</Text>
                        */}
                        <Text style={styles.ModelText}>Classifique esta Infração:</Text>
                        <Picker
                         mode='dropdown'
                         style={styles.picker}
                         onValueChange={
                            (itemValue, itemIndex) => this.setState({ teste2: itemValue })
                         }
                        >
                            { this.ListarInfracoes() }
                            { console.log('Classificações => ***', this.state.classificacoes) }
                            { this.state.teste.map(elemento => {
                                return ( <Picker.Item style={ styles.ModelSubText } label={ elemento } value={ elemento } /> ) 
                            }) }
                        </Picker>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  backgroundColor: 'white'}}>

                       <TouchableOpacity onPress={this.props.Cancelar}>

                           <Text style={styles.button}>Cancelar</Text>

                       </TouchableOpacity> 

                       <TouchableOpacity onPress={this.SalvarDenuncia}>

                           <Text style={styles.button}>Confirmar</Text>

                       </TouchableOpacity> 

                    </View>
                    
                </View>

                {/*
                <TouchableWithoutFeedback onPress={this.props.Cancelar}>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>                
                */}

            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    constainer: {

        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#069',
    },
    header: {
        backgroundColor: '#069',
        color: 'white',
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    ModelText: {
        color: 'black',
        padding: 1,
        fontSize: 15,
        marginLeft: 10,
        marginTop: 3,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    ModelSubText: {
        color: 'black',
        padding: 1,
        fontSize: 15,
        marginLeft: 10,
        marginTop: 2,
        textAlign: 'left',
    },
    input: {
       width: '90%',
       height: 40,
       marginTop: 10,
       marginLeft: 10,
       backgroundColor: 'white', 
       borderWidth: 1,
       borderColor: '#e3e3e3',
       borderRadius: 6
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
    },
    modalImage: {
        width: Dimensions.get('window').width * 0.8,
        marginHorizontal: Dimensions.get('window').width * 0.1,
    },
    picker: {
        marginTop: 1
    }

})


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image, Button } from 'react-native';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a biblioteca que será o DB da aplicação:
import firebase, { Firebase } from 'react-native-firebase'

// Classe responsavel por toda a informação que ficará na tela de Lista de denuncias:
export default class ListaScreen extends Component {


    state = {

        uid: this.props.uid,
        arrayDenuncias: [],
        dados: '',

    }

    renderItem = ( { item } ) => (

        
        <View style={styles.listItem}>

            
            <View style={{flexDirection: 'row'}}>

                <View style={{ padding: 2}}>

                    <Text style={{fontWeight: 'bold', marginTop: 3}}>{ item.diaDenuncia + '/' + item.mesDenuncia + '/' + item.anoDenuncia}</Text>

                </View>

                <View style={{ marginLeft: 60 }}>
                    <Text style={{fontWeight: 'bold', marginTop: 3}}>{ item.EstadoDenuncia }</Text>
                </View>

                <View style={{ marginLeft: 60 }}>
                    <Text style={{fontWeight: 'bold', marginTop: 3}}><Icon name="arrow-right" size={15} color= '#069' /></Text>
                </View>

            </View>


        </View>
    )

    componentDidMount = () => {

        console.log('O uid em lista é:', this.state.uid)

        this.carregarDados()

        // console.log('estado dados: ', this.state.dados )

    }


    carregarDados = () => {

        firebase.database().ref('/Denuncias' + '/' + this.state.uid ).on('value',  (dados) => {

            //console.log('Dados teste 10 -> ->', Object.values(dados).slice(-1)[0][0])

            //console.log('Dados teste 12 -> ->', Object.values(dados).slice(-1)[0])

            /*
            const ArrayDados = []

            for (var c in Object.values(dados)[2] ) {

                console.log('c', c)

                ArrayDados.push( Object.values(dados)[2][c] )

            }
            

            //console.log('Array de dados:', ArrayDados)



            this.setState({ dados: ArrayDados })

            // confirmação:
            // console.log('Estado dados:', this.state.dados)
            */

            const arrayDenuncias = []

            for (var c in Object.values(dados).slice(-1)[0] ) {

                //console.log('Id no contador ->', Object.values(dados).slice(-1)[0][c] )

                arrayDenuncias.push(Object.values(dados).slice(-1)[0][c])
            }

            console.log('Array de Ids -->', arrayDenuncias)

        })
    }

    render() {

        return( 

            <View >


                <View>

                    <View style={styles.container}>

                        <Text style={ styles.titulo }>Lista de Denuncias</Text>

                    </View>

                    
                    <View style={styles.listHeader}>

                        <View style={{flexDirection: 'row'}}>

                            <View style={{ marginLeft: 5}}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Data</Text>

                            </View>

                            
                            <View style={{ marginLeft: 80 }}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Estado</Text>

                            </View>

                            
                            <View style={{ marginLeft: 50 }}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Detalhes</Text>

                            </View>

                        </View>

                    </View>

                    <FlatList

                        style={{ marginTop: 30 }}
                        contentContainerStyle={ styles.list }
                        data={ this.state.dados }
                        renderItem={ this.renderItem }
                        keyExtractor={ item => item.id }
                    />
                    

                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        padding: 20,
  
    }, 
    titulo: {

        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 80,
        marginTop: 120,
        color: '#069',
    },
    list: {
        
        marginLeft: 5,
        marginTop: 5,
        
    },
    listItem: {

        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 10,

    },
    listHeader: {

        marginTop: 40,
        alignContent: "center",
        alignItems: 'center',
        marginLeft: 17,
        marginBottom: 2,

    },

})

// ==================================================================================================================================

// ==================================================================================================================================

// ==================================================================================================================================

// ==================================================================================================================================
carregarInfosVisuais = async () => {

  const iDenuncias = this.state.arrayDenuncias
  
  //console.log('Array denuncias é: '+ this.state.arrayDenuncias)

  const arrayVisual = []

  for ( var id in Object.values(iDenuncias) ) {
      
      firebase.database().ref('/Denuncias' + '/' + this.state.uid + '/' + iDenuncias[id]).on('value', (dados) => {

          /*
          console.log('\n'+'Dados |' + Object.values(dados)[0] + '|:\n')
          console.log('Data: ',Object.values(dados)[2]["diaDenuncia"] + '/' + Object.values(dados)[2]["mesDenuncia"] + '/' + Object.values(dados)[2]["anoDenuncia"],  )
          console.log('Estado: ' ,Object.values(dados)[2]["EstadoDenuncia"])
          console.log('Classificação: ',Object.values(dados)[2]["EstadoDenuncia"])
          console.log('Id Denuncia: ', Object.values(dados)[0])
          */

          arrayVisual.push({
              'Dia': Object.values(dados)[2]["diaDenuncia"], 
              'Mes': Object.values(dados)[2]["mesDenuncia"], 
              'Ano': Object.values(dados)[2]["anoDenuncia"],
              'Estado': Object.values(dados)[2]["EstadoDenuncia"],
              'idDenuncia': Object.values(dados)[0],
          })

          console.log('ArrayVisual: ', arrayVisual)

      })

      console.log('\n\nArrayVisual 3: ', arrayVisual)

  }

  console.log('\n\nArrayVisual 2: ', arrayVisual)
}


// ==================================================================================================================================

// ==================================================================================================================================

// ==================================================================================================================================

// ==================================================================================================================================


// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image, Button } from 'react-native';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a biblioteca que será o DB da aplicação:
import firebase, { Firebase } from 'react-native-firebase'

// Classe responsavel por toda a informação que ficará na tela de Lista de denuncias:
export default class ListaScreen extends Component {


    state = {

        uid: this.props.uid,
        arrayDenuncias: [],
        dados: [],

    }

    renderItem = ( { item } ) => (

        
        <View style={styles.listItem}>

            
            <View style={{flexDirection: 'row'}}>

                <View style={{ padding: 2}}>

                    <Text style={{fontWeight: 'bold', marginTop: 3}}>{ item.diaDenuncia + '/' + item.mesDenuncia + '/' + item.anoDenuncia}</Text>

                </View>

                <View style={{ marginLeft: 60 }}>
                    <Text style={{fontWeight: 'bold', marginTop: 3}}>{ item.EstadoDenuncia }</Text>
                </View>

                <View style={{ marginLeft: 60 }}>
                    <Text style={{fontWeight: 'bold', marginTop: 3}}><Icon name="arrow-right" size={15} color= '#069' /></Text>
                </View>

            </View>


        </View>
    )


    componentDidMount = async () => {

        console.log('O uid em lista é:', this.state.uid)

        await this.carregarDados()
        
    }


    // Função que armazena os id's de denuncias do usuario em um state array
    carregarDados = async () => {

        firebase.database().ref('/Denuncias' + '/' + this.state.uid ).on('value',  (dados) => {

            const arrayDenuncias = []

            for (var c in Object.values(dados).slice(-1)[0] ) {

                //console.log('Id no contador ->', Object.values(dados).slice(-1)[0][c] )

                arrayDenuncias.push(Object.values(dados).slice(-1)[0][c])
            }

            console.log('Array de Ids -->', arrayDenuncias)

            this.setState({ arrayDenuncias })

            this.carregarInfosVisuais()


        })
    
    }

    carregarInfosVisuais = async () => {

        const iDenuncias = this.state.arrayDenuncias
        
        //console.log('Array denuncias é: '+ this.state.arrayDenuncias)
      
        const arrayVisual = []

        const req = firebase.database().ref('/Denuncias' + '/' + this.state.uid )
      
        for (var id in iDenuncias ) {

            that = this

            var resp = ''

            resp = req.child('/' + iDenuncias[id])

            await resp.on('value', function(dados) {

                const dadoAtualizado = []

                dadoAtualizado.push(

                    Object.values(dados)[2]["diaDenuncia"], 
                    Object.values(dados)[2]["mesDenuncia"], 
                    Object.values(dados)[2]["anoDenuncia"],
                    Object.values(dados)[2]["EstadoDenuncia"],
                    Object.values(dados)[0],
                )

                const EstadoDado  = that.state.dados

                console.log('Estado Dado Anterior: ', EstadoDado)

                EstadoDado.push(dadoAtualizado)

                console.log('Estado Dado Atualizado: ', EstadoDado)

                that.setState({ dados: EstadoDado })
                
            })
        }

        this.showstate()

        
    }

    showstate = async () => {

        console.log('Estado é: ', this.state.dados )

    }

    render() {

        return( 

            <View >


                <View>

                    <View style={styles.container}>

                        <Text style={ styles.titulo }>Lista de Denuncias</Text>

                    </View>

                    
                    <View style={styles.listHeader}>

                        <View style={{flexDirection: 'row'}}>

                            <View style={{ marginLeft: 5}}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Data</Text>

                            </View>

                            
                            <View style={{ marginLeft: 80 }}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Estado</Text>

                            </View>

                            
                            <View style={{ marginLeft: 50 }}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Detalhes</Text>

                            </View>

                        </View>

                    </View>

                    <FlatList

                        style={{ marginTop: 30 }}
                        contentContainerStyle={ styles.list }
                        data={ this.state.arrayDenuncias }
                        renderItem={ this.renderItem }
                        keyExtractor={ item => item.id }
                    />
                    

                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        padding: 20,
  
    }, 
    titulo: {

        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 80,
        marginTop: 120,
        color: '#069',
    },
    list: {
        
        marginLeft: 5,
        marginTop: 5,
        
    },
    listItem: {

        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 10,

    },
    listHeader: {

        marginTop: 40,
        alignContent: "center",
        alignItems: 'center',
        marginLeft: 17,
        marginBottom: 2,

    },

})

******************************************************************************************************************************************************************
******************************************************************************************************************************************************************
******* FUNCIONA ********************************************************************************************************************************
******************************************************************************************************************************************************************
******************************************************************************************************************************************************************

// Função que armazena os id's de denuncias do usuario em um state array
carregarDados = async () => {

  const ref = firebase.database().ref('/Denuncias' + '/' + this.state.uid)
  
  var ultimaKey = ''
  
  await ref.orderByKey().limitToFirst(2).once('value', dado => {
      console.log('Dado OrderbyKey')
      console.log(dado)
      dado.forEach( (subdado) => {
          console.log('key atual', subdado.key)
          ultimaKey = subdado.key
      })
  })

  ref.orderByKey().startAt(ultimaKey).once('value', dado =>{
      console.log('Dado startAt')
      console.log(dado)
  })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image, Button } from 'react-native';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a biblioteca que será o DB da aplicação:
import firebase, { Firebase } from 'react-native-firebase'

// Classe responsavel por toda a informação que ficará na tela de Lista de denuncias:
export default class ListaScreen extends Component {


    state = {

        /*dados: [
            {"EstadoDenuncia": "Em Andamento", "anoDenuncia": 2019, "mesDenuncia": 12, "diaDenuncia": 13, "classificacaoUsuario": "classificação1" }, 
            {"EstadoDenuncia": "Avaliada", "anoDenuncia": 2019, "mesDenuncia": 12, "diaDenuncia": 14, "classificacaoUsuario": "classificação2" },
            {"EstadoDenuncia": "Cancelada", "anoDenuncia": 2020, "mesDenuncia": 1, "diaDenuncia": 15, "classificacaoUsuario": "classificação3" }   
        ]*/
        uid: this.props.uid,
        dados: '',

    }

    renderItem = ( item ) => (


        <View style={styles.listItem}>

            
            <View style={{flexDirection: 'row'}}>

                <View style={{ padding: 2}}>

                    <Text style={{fontWeight: 'bold', marginTop: 3}}>{ item.diaDenuncia + '/' + item.mesDenuncia + '/' + item.anoDenuncia}</Text>

                </View>

                <View style={{ marginLeft: 60 }}>

                    <Text style={{fontWeight: 'bold', marginTop: 3}}>{ item.EstadoDenuncia }</Text>

                </View>

                <View style={{ marginLeft: 60 }}>

                    <Text style={{fontWeight: 'bold', marginTop: 3}}><Icon name="arrow-right" size={15} color= '#069' /></Text>

                </View>

            </View>


        </View>
        
    )


    componentDidMount = async () => {

        console.log('O uid em lista é:', this.state.uid)

        this.carregarDados()
        
    }


    // Função que armazena os id's de denuncias do usuario em um state array
    carregarDados = async () => {

        const ref = firebase.database().ref('/Denuncias' + '/' + this.state.uid)
        
        // var ultimaKey = ''
        
        await ref.orderByKey().limitToFirst(2).once('value', dado => {

            const arraydado = []

            console.log('Dado OrderbyKey')

            dado.forEach( (val) =>{
                console.log('val ->', val)
                arraydado.push(val)
            })

            /*dado.forEach( (subdado) => {
                console.log('key atual', subdado.key)
                ultimaKey = subdado.key
            })*/

            //console.log(arraydado)
            this.setState({ dados: arraydado})
        
        })

        console.log('\n\n\Estado Dados 0 é: ', this.state.dados[0])

        /*
        ref.orderByKey().startAt(ultimaKey).once('value', dado =>{
            console.log('Dado startAt')
            console.log(dado)
        })
        */

    }


    render() {

        return( 

            <View >


                <View>

                    <View style={styles.container}>

                        <Text style={ styles.titulo }>Lista de Denuncias</Text>

                    </View>

                    
                    <View style={styles.listHeader}>

                        <View style={{flexDirection: 'row'}}>

                            <View style={{ marginLeft: 5}}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Data</Text>

                            </View>

                            
                            <View style={{ marginLeft: 80 }}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Estado</Text>

                            </View>

                            
                            <View style={{ marginLeft: 50 }}>

                                <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 18}}>Detalhes</Text>

                            </View>

                        </View>

                    </View>

                    <FlatList

                        style={{ marginTop: 30 }}
                        contentContainerStyle={ styles.list }
                        data={ this.state.dados }
                        renderItem={ this.renderItem }
                        keyExtractor={ item => item.id }
                    />
                    

                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        padding: 20,
  
    }, 
    titulo: {

        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 80,
        marginTop: 120,
        color: '#069',
    },
    list: {
        
        marginLeft: 5,
        marginTop: 5,
        
    },
    listItem: {

        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 10,

    },
    listHeader: {

        marginTop: 40,
        alignContent: "center",
        alignItems: 'center',
        marginLeft: 17,
        marginBottom: 2,

    },

})
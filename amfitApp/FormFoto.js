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
    Picker 
} from 'react-native'

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
        classificacaoUsuario: '',

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

        
        this.setState({ Img64: this.props.ImgCode })
        this.setState({ path: this.props.ImgPath })
        this.setState({ latitude: this.props.Imglati })
        this.setState({ longitude: this.props.Imglong })
        this.setState({ email: this.props.ImgUser })
        this.setState({ senha: this.props.ImgPass })
        this.setState({ uid: this.props.ImgUid })

    }

    itemPicker = (array) => {

        const itens = this.state.cassificacoes

        //console.log("itens ----- " + itens)

        //itens.map( (item, index) => { return (<Picker.Item label={item} value={item} key={item}/>) } ) 
    }

    SalvarDenuncia = async () => {
      
        console.log('O UID do usuario atual é -> -> ', this.state.uid)
 
        firebase.database().ref('Denuncias').push({
            
            UidUsuario: this.state.uid,
            idUsuario: this.state.email,
            dataDenuncia: parseInt((new Date().getFullYear()).toString() + (new Date().getMonth() + 1).toString().padStart(2, "0") + (new Date().getDate()).toString().padStart(2, "0")),
            diaDenuncia: new Date().getDate().toString().padStart(2, "0"),
            mesDenuncia: (new Date().getMonth() + 1).toString().padStart(2, "0"),
            anoDenuncia: new Date().getFullYear(),
            horaDenuncia: new Date().getHours(),
            minutoDenuncia: new Date().getMinutes(),
            segundoDenuncia: new Date().getSeconds(),
            posicaoLongitude: this.state.longitude,
            posicaoLatitude: this.state.latitude,
            imagemDenuncia: this.state.Img64,
            classificacaoUsuario: this.state.classificacaoUsuario,
            EstadoDenuncia: 'Em Andamento',

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


        /*
        const pickerItems = Object.values(this.props.ImgClass).map( elemento  => {
            return (
            <Picker.Item label={ elemento } value={ elemento } />
            )
          })
        */

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

                        <Text style={{ fontSize: 5 }}></Text>

                    </View>

                    <View style= {{flexDirection:'row', justifyContent: 'center', backgroundColor: 'white'}}>

                        <Image style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: 350, height: 250}} source={{uri: `data:image/png;base64,${this.state.Img64}` }}/>

                    </View>

                    <View style= {{backgroundColor: 'white'}}>

                        {/*console.log('\n'+'PROPS classificações -> '+ this.props.ImgClass ) */}
                        {/* console.log('\n'+'State classificações -> '+ this.state.classificacoes ) */}
                        {/*console.log('\n'+'CONST PickerItems => '+ Object.values(pickerItems))*/}
                        
                        {/*
                        <Text style={styles.ModelText}>Data da denuncia:</Text>
                        <Text style={styles.ModelSubText}>{ new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() }</Text>
                        <Text style={styles.ModelText}>Horario da denuncia:</Text>
                        <Text style={styles.ModelSubText}>{ new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() }</Text>
                        <Text style={styles.ModelText}>Latitude:</Text>
                        <Text style={styles.ModelSubText}>{ this.state.latitude }</Text>
                        <Text style={styles.ModelText}>Longitude:</Text>
                        <Text style={styles.ModelSubText}>{ this.state.longitude }</Text>
                        */}
                        <Text style={styles.ModelText}>Classifique esta Infração:</Text>

                    
                        { this.state.classificacoes == '' ?
                            <Text>Picker Vazio</Text> :
                            <Picker
                            mode='dropdown'
                            style={styles.picker}
                            onValueChange={
                                (itemValue) => { this.setState({ classificacaoUsuario: itemValue }) }
                            }>
                            {console.log('CLASSIFICACAO USUARIO ***', this.state.classificacaoUsuario)}
                            {Object.values(this.props.ImgClass).map( elemento  => {
                            return (
                                <Picker.Item label={ elemento } value={ elemento } />
                            )
                            })}  
                            </Picker>  
                        }

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












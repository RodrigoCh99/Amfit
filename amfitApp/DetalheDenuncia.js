import React, { Component } from 'react'

// Importando a biblioteca que será o DB da aplicação:
import firebase, { Firebase } from 'react-native-firebase'

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
} from 'react-native'

export default class ModalDetalhe extends Component {
    
    state = {

        uid: '',
        chaveDenuncia: '',
        img: '',
        data: '',
        hora: '',
        localizacao: '',
        estado: '',
        classificacao: '',
    }

    
    componentWillReceiveProps = async () => {

        this.setState({ uid: this.props.uid })
        this.setState({ chaveDenuncia: this.props.ChaveDenuncia  }, () => {

            console.log('Chave $$$', this.state.chaveDenuncia )

            if ( this.state.chaveDenuncia != '') {

                this.QueryFirebase()

            } 

        })

    }


    QueryFirebase = async () => {

        const ref = firebase.database().ref('/Denuncias' + '/' + this.state.chaveDenuncia )

        await ref.once('value').then( ( val ) => {
            //console.log('Requisicao detalhes')
            //console.log('VAL ==', val.val())

            const dataFormatada = val.val()['diaDenuncia'] + '/' + val.val()['mesDenuncia'] + '/' + val.val()['anoDenuncia']
            const horaFormatada = val.val()['horaDenuncia'] + ':' + val.val()['minutoDenuncia'] + ':' + val.val()['segundoDenuncia']
            const locFormatada = val.val()['posicaoLatitude'] + ',' + val.val()['posicaoLongitude']

            this.setState( {

                img: val.val()['imagemDenuncia'],
                data: dataFormatada,
                hora: horaFormatada,
                localizacao: locFormatada,
                estado: val.val()['EstadoDenuncia'],
                classificacao: val.val()['classificacaoUsuario']
            
            })

        })

    }

    render() {
        return (
            <Modal onRequestClose={ this.props.Cancelar } 
                visible={ this.props.visible }
                animationType='slide'
                transparent={ true }>

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={styles.offset}></View>

                </TouchableWithoutFeedback>

                <View style={ styles.container }>

                    <View style= {{backgroundColor: 'white'}}>

                        <Text style={ styles.header }>Detalhes da Denuncia</Text>
                        <Text style={{ fontSize: 5 }}></Text>

                    </View>

                    <View style= {{flexDirection:'row', justifyContent: 'center', backgroundColor: 'white'}}>

                        <Image style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: 350, height: 250}} source={{uri: `data:image/png;base64,${this.state.img}` }}/>

                    </View>

                    <View style= {{backgroundColor: 'white'}}>

                        <Text style={ styles.ModelText }>UID: { this.state.uid }</Text>

                        <Text style={ styles.ModelText }>Chave: { this.state.chaveDenuncia }</Text>

                        <Text style={ styles.ModelText }>Hora: { this.state.hora }</Text>

                        <Text style={ styles.ModelText }>Data: { this.state.data }</Text>

                        <Text style={ styles.ModelText }>Localizacao geográfica: { this.state.localizacao }</Text>

                        <Text style={ styles.ModelText }>sua classificacao: { this.state.classificacaoUsuario }</Text>

                        <Text style={ styles.ModelText }>Estado: { this.state.estado }</Text>

                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  backgroundColor: 'white'}}>

                       <TouchableOpacity onPress={this.props.Cancelar}>

                           <Text style={styles.button}>Sair</Text>

                       </TouchableOpacity> 

                       <TouchableOpacity onPress={this.Salvar}>

                           <Text style={styles.button}>O.K</Text>

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
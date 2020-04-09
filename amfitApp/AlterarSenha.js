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
} from 'react-native'

export default class ModalPassword extends Component {

    state = {

        AntigaSenha: '',
        NovaSenha: '',

    }

    Salvar = () => {
        
        console.log('********************************************************************************')

        console.log('Função de salvar foi ativada')

        if (this.state.NovaSenha == '' || this.state.NovaSenha == this.state.AntigaSenha) {

            Alert.alert('Aviso', 'Para mudar de Senha, insira uma senha nova')

            console.log('****************************** // ******************************************')

        } else {

            console.log('A nova senha é:')

            console.log(this.state.NovaSenha)

            console.log('****************************** // ******************************************')
            
            this.props.SalvarSenha(  this.state.NovaSenha  )

            Alert.alert('Aviso', 'sua senha foi modificada com sucesso! ')

            this.props.Cancelar()


        }

    }

    componentWillReceiveProps = async () => {

        this.setState({ AntigaSenha: this.props.senhaAtual })

    }

    render() {

        return (
            <Modal onRequestClose={ this.props.Cancelar } 

                visible={ this.props.visible }

                animationType='slide'

                transparent={ true }>

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={ styles.offset }></View>

                </TouchableWithoutFeedback>

                <View style={ styles.container }>

                    <View style= {{backgroundColor: 'white'}}>

                        <Text style={ styles.header }>Mudança de Senha:</Text>

                        <Text style={ styles.ModelText }>Insira uma nova Senha:</Text>

                        <TextInput style={{ backgroundColor: 'white' }} 

                            style={ styles.input } 
                            placeholder={ this.state.AntigaSenha } 
                            value={ this.state.NovaSenha }  
                            onChangeText={ nova => this.setState( { NovaSenha: nova } ) }/>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  backgroundColor: 'white'}}>

                       <TouchableOpacity onPress={this.props.Cancelar}>

                           <Text style={ styles.button }>Cancelar</Text>

                       </TouchableOpacity> 

                       <TouchableOpacity onPress={ this.Salvar }>

                           <Text style={ styles.button }>Salvar</Text>

                       </TouchableOpacity> 

                    </View>
                    
                </View>

                <TouchableWithoutFeedback onPress={ this.props.Cancelar }>

                    <View style={ styles.offset }></View>

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
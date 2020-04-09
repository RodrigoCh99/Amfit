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

export default class ModalEmail extends Component {

    state = {

        AntigoEmail: '',

        NovoEmail: '',

    }

    Salvar = () => {
        
        console.log('********************************************************************************')

        console.log('Função de salvar foi ativada')

        if (this.state.NovoEmail == '' || this.state.NovoEmail == this.state.AntigoEmail) {

            Alert.alert('Aviso', 'Para mudar de E-mail, insira um e-mail novo')

            console.log('****************************** // ******************************************')

        } else {

            console.log('O novo e-mail é:')

            console.log(this.state.NovoEmail)

            console.log('****************************** // ******************************************')
            
            this.props.SalvarEmail(  this.state.NovoEmail  )

            Alert.alert('Aviso', 'seu e-mail foi modificado com sucesso! ')

            this.props.Cancelar()


        }

    }

    componentWillReceiveProps = async () => {

        this.setState({ AntigoEmail: this.props.emailAtual })

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

                        <Text style={ styles.header }>Mudança de E-mail:</Text>

                        <Text style={styles.ModelText}>Insira um novo E-mail:</Text>

                        <TextInput style={{ backgroundColor: 'white' }} style={styles.input} placeholder={this.state.AntigoEmail} value={this.state.NovoEmail}  onChangeText={ novo => this.setState( { NovoEmail: novo } ) }/>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  backgroundColor: 'white'}}>

                       <TouchableOpacity onPress={this.props.Cancelar}>

                           <Text style={styles.button}>Cancelar</Text>

                       </TouchableOpacity> 

                       <TouchableOpacity onPress={this.Salvar}>

                           <Text style={styles.button}>Salvar</Text>

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
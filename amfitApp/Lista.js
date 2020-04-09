// Importando a a classe componente da lib react
import React, { Component } from 'react';

// Importando alguns componentes interessantes para nossa aplicação
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image, TouchableOpacity, } from 'react-native';

// Importando a função que permite a navegação da biblioteca routes
import { Actions } from 'react-native-router-flux';

// Importando a função que permite colocar icones vetoriais nas telas
import Icon from 'react-native-vector-icons/FontAwesome';

// Importando a biblioteca que será o DB da aplicação:
import firebase, { Firebase } from 'react-native-firebase'

// Importando o modal de detalhe das denuncias
import ModalDetalhe from './DetalheDenuncia'

// Classe responsavel por toda a informação que ficará na tela de Lista de denuncias:
export default class ListaScreen extends Component {

    state = {

        uid: this.props.uid,
        dados: '',
        chaveAtual: '',
        visibleModal: false,
        ChaveDenuncia: '',
    }

    showModal = async () => {

        console.log('modalChaveDenuncia ->', this.state.ChaveDenuncia)
        this.setState({ visibleModal: true })

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

                    <TouchableOpacity onPress={ () => { this.DetalharDenuncia( item.ChaveDenuncia ) } }>

                        <Text style={ {fontWeight: 'bold', marginTop: 3} }><Icon name="plus" size={18} color= '#069' /></Text>

                    </TouchableOpacity>

                </View>

            </View>


        </View>
        
    )

    componentDidMount = async () => {

        console.log('O uid em lista é:', this.state.uid)

        //this.carregarDados()
        this.carregarDados2()

    }

    DetalharDenuncia = async ( val ) => {

        // console.log('Pressionado: ', val)  

        this.setState( { ChaveDenuncia: val }, () => this.showModal() )
        this

    }

    // Função que armazena os id's de denuncias do usuario em um state array

 
    carregarDados = async () => {

        const ref = firebase.database().ref('/Denuncias' + '/' + this.state.uid)

        const arrayObjetos = []

        await ref.orderByKey().limitToFirst(20).once('value', (dado) => {

            //console.log('DADO RAIZ', Object.values(dado))

            const listaChaves = []

            // CODIGO PARA PEGAR A CHAVE:
            dado.forEach( (subdado) => {

                //console.log('Chave atual:', subdado.key)
                listaChaves.push(subdado.key)
                this.setState({ chaveAtual: subdado.key })

            })

            // invertendo os dados da lista para adicionar no arrayObj:
            listaChaves.reverse()

            console.log('Lista de chaves é:', listaChaves)

            // CODIGO PARA PEGAR VALORES DA QUERY E ESTRUTURA-LOS PARA O FLAT-LIST:
            Object.values(Object.values(dado)[2]).forEach( (val) => {

                var objeto_saida = {

                    EstadoDenuncia: val["EstadoDenuncia"],
                    diaDenuncia: val["diaDenuncia"],
                    mesDenuncia: val["mesDenuncia"],
                    anoDenuncia: val["anoDenuncia"],
                    horaDenuncia: val["horaDenuncia"],
                    minutoDenuncia: val["minutoDenuncia"],
                    segundoDenuncia: val["segundoDenuncia"],
                    classificacaoUsuario: val["classificacaoUsuario"]

                }

                arrayObjetos.push( Object.assign(objeto_saida) )

            })


            // adicionando a chave do da denuncia a cada objeto:
            arrayObjetos.forEach( (item, index) => {
                item["ChaveDenuncia"] = listaChaves[index]
            })

            
            //console.log('array objetos', arrayObjetos)
            //console.log('obj values', Object.values(Object.values(dado)[2]))

            this.setState({ dados: arrayObjetos })

            // VERSAO DE TESTES SEGUINDO UM TUTORIAL:
            //this.setState({ dados: Object.values(Object.values(dado)[2]) })
            
            console.log('STATE DADOS -> ', this.state.dados)

        })

        /* CODIGO DA DIVISÃO EM ABAS
        ref.orderByKey().startAt(ultimaKey).once('value', dado =>{
            console.log('Dado startAt')
            console.log(dado)
        })
        */

    }

    carregarDados2 = async () => {

        // chaves no firebase correspondentes a cada denuncia
        const listaChaves = []

        const ref = firebase.database().ref('Denuncias').orderByChild('UidUsuario').equalTo(this.state.uid)

        await ref.once('value', dado => {

            console.log('novo carregar dados --> ', dado)

            // codigo que percorre o retorno do banco e pega as chaves:
            dado.forEach( (subdado) => {

                // adicionando as chaves a lista
                listaChaves.push(subdado.key)

            })

            // invertendo os dados da lista para adicionar no arrayObj:
            listaChaves.reverse()

            console.log('listaChaves -> ->', listaChaves)

            
            // adicionando a chave do da denuncia a cada objeto:
            Object.values(Object.values(dado)[2]).forEach( (item, index) => {

                item["ChaveDenuncia"] =  listaChaves[index]

                //console.log('\nitem ------', item)
                //console.log('\nindex ------', listaChaves[index])

            })

            //console.log('\nDado na posição 2 -> ', Object.values(Object.values(dado)[2])[0])
            

            this.setState({ dados: Object.values(Object.values(dado)[2]) })

            console.log('\nSTATE DADOS -> ', this.state.dados)

        })

    }


    render() {

        return( 

            <View >

                <ModalDetalhe 

                    visible={ this.state.visibleModal } 
                    Cancelar={ () => this.setState({ visibleModal: false }) }
                    uid={ this.state.uid }
                    ChaveDenuncia={ this.state.ChaveDenuncia }                    

                />  

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
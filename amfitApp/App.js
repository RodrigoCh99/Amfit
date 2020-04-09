// Importando conteudo da biblioteca react:
import React, { Component } from 'react';

// Importando componentes do react-native:
import { Alert, Button, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native'

// Importando o gerenciador de telas:
import Routes from './Routes';

export default class App extends Component {
    render() {
        return (<Routes/>);
    }
}
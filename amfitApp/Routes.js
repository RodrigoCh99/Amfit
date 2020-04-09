import React, { Component } from 'react';

// Importando funções de navegação do react-native-route-flux
import {Router, Stack, Scene} from 'react-native-router-flux';

// Importando as demias relas para fazer a navegação entre elas:
import LoginScreen from './Login';
import CadastroScreen from './Cadastro';
import ConfigScreen from './Config';
import CamScreen from './Cam';
import ListaScreen from './Lista';

// função que realiza a manipulação de telas:
export default class Routes extends Component {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={ true }>
                    <Scene key="cadastro" component={ CadastroScreen } title="Cadastro" />
                    <Scene key="login" component={ LoginScreen } title="Login" initial={true} />
                    <Scene key="configuracoes" component={ ConfigScreen } title="Configurações" />
                    <Scene key="camera" component={ CamScreen } title="Câmera" />
                    <Scene key='lista' component={ ListaScreen } title="Lista" />
                </Stack>
            </Router>
        )
    }
}

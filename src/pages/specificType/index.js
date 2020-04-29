import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import api from '../../services/api';

import LottieView from "lottie-react-native";
import pokeball from "../../../assets/4366-game-east-west.json";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SpecificType extends Component {

    state = {
        loading: true,
        name: "",
        double_damage_from: [],
        double_damage_to: [],
        half_damage_from: [],
        half_damage_to: [],
        no_damage_from: [],
        no_damage_to: [],
        moves: []
    }

    componentDidMount = async () => {
        const response = await api.get(this.props.navigation.state.params.url)
        console.log(response);
        this.setState({
            loading: false
        })
    }
    render() {
        return (<>
            {this.state.loading ? (
                <View style={styles.loadingContainer}>
                    <LottieView resizeMode="contain" style={{
                        width: 50,
                        height: 50
                    }} autoSize source={pokeball} autoPlay loop />
                </View>
            ) : (
                    <View style={styles.container}>
                        <ScrollView style={styles.scrollContainer}>
                            <Text>Type: {this.state.name}</Text>
                            <Text>Double damage from: </Text>
                        </ScrollView>
                    </View>
                )}
        </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: "10%",
    },
    scrollContainer: {
        width: "100%",
        height: "100%"
    }
})


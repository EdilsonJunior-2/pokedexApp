import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import api from '../../services/api';

import LottieView from "lottie-react-native";
import pokeball from "../../../assets/4366-game-east-west.json";


export default class pokemon extends Component {

    state = {
        name: "",
        abilities: [],
        moves: [],
        height: 0,
        pokedexNo: 0,
        loading: true
    }

    componentDidMount = async () => {
        const response = await api.get(this.props.navigation.state.params.url)
        var moves = [];
        var abilities = [];
        for (const moveStats of response.data.moves) {
            moves.push(moveStats.move.name)
        }
        for (const abilityName of response.data.abilities) {
            abilities.push(abilityName.ability.name);
        }
        this.setState({
            abilities: abilities,
            moves: moves,
            name: response.data.forms[0].name,
            pokedexNo: response.data.id,
            height: response.data.height

        })
        console.log(response.data);
        this.setState({loading: false});
    }
    render() {
        return (
            <>
                {this.state.loading ? (
                    <View style={styles.loadingContainer}>
                        <LottieView resizeMode="contain" style={{
                            width: 50,
                            height: 50
                        }} autoSize source={pokeball} autoPlay loop />
                    </View>
                ) : (
                        <View style={styles.container}>
                            <Text style={styles.titles}>Name: {this.state.name}</Text>
                            <Text style={styles.titles}>Pokedex Number: {this.state.pokedexNo}</Text>
                            <Text style={styles.titles}>height: {this.state.height}</Text>
                            <Text style={styles.titles}>Abilities: </Text>
                            <View style={styles.abilitiesList}>
                                {this.state.abilities.map(ability => (
                                    <Text style={styles.abilityName}>
                                        {ability}
                                    </Text>
                                ))}
                            </View>

                            <Text style={styles.titles}>Moves:</Text>
                            <ScrollView style={styles.scrollMoves}>
                                <View style={styles.moveList}>
                                    {this.state.moves.map(move => (
                                        <Text 
                                        style={styles.moveName}
                                        key={move}>
                                            {move}
                                        </Text>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "10%"
    },
    loadingContainer: {
        flex: 1,
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    titles: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    abilitiesList: {
        borderWidth: 1,
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: "3%"
    },
    abilityName: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 40
    },
    scrollMoves: {
        maxHeight: 200,
        borderWidth: 1,
        marginHorizontal: 20
    },
    moveList: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
        height: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    moveName: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 40
    }
})

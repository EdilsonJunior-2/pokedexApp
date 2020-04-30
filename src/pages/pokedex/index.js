import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import api from "../../services/api";
import { TouchableOpacity } from 'react-native-gesture-handler';

import LottieView from "lottie-react-native";
import pokeball from "../../../assets/4366-game-east-west.json";

export default class Pokedex extends Component {
    state = {
        pokemons: [],
        next: null,
        previous: null,
        loading: true
    }

    componentDidMount = async () => {
        const response = await api.get('/pokemon');
        this.setState({
            pokemons: response.data.results,
            next: response.data.next,
            previous: response.data.previous
        });

        this.setState({ loading: false });
    }

    next = async () => {
        if (this.state.next !== null) {
            const response = await api.get(this.state.next);
            this.setState({
                pokemons: response.data.results,
                next: response.data.next,
                previous: response.data.previous
            });
        }
        if (this.state.next == "https://pokeapi.co/api/v2/pokemon?offset=960&limit=4"){
            this.setState({
                next: null
            })
        }
    }

    previous = async () => {
        if (this.state.previous !== null) {
            const response = await api.get(this.state.previous);
            this.setState({
                pokemons: response.data.results,
                next: response.data.next,
                previous: response.data.previous
            });
        }
    }

    render() {
        const { pokemons } = this.state;
        return (
            <>
                {this.state.loading ? (
                    <View style={styles.container}>
                        <LottieView resizeMode="contain" autoSize source={pokeball} autoPlay loop />
                    </View>
                ) : (
                        <View style={styles.container}>
                            <Text style={styles.pokedexTitle}>
                                Pokedex
                            </Text>
                            <ScrollView style={styles.scrollPokemonList}>
                            <View style={styles.pokemonList}>
                                {pokemons.map(pokemon => (
                                    <TouchableOpacity
                                        style={styles.pokemonNameTouchable}
                                        key={pokemon.url}
                                        onPress={() => {
                                            this.props.navigation.navigate("Pokemon",
                                                {
                                                    url: pokemon.url
                                                })
                                        }}
                                    >
                                        <Text style={styles.pokemonName}>
                                            {pokemon.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            </ScrollView>

                            <View style={styles.nextPrev}>
                                <TouchableOpacity onPress={() => this.previous()}>
                                    <Text style={styles.option}>
                                        Previous
                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.next()}>
                                    <Text style={styles.option}>
                                        Next
                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
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
    pokedexTitle: {
        marginTop: "5%",
        marginBottom: "5%",
        fontSize: 40,
        color: "#D3350D",
        fontWeight: "bold"

    },
    scrollPokemonList: {
        width: "100%",
        maxHeight: "70%"
    },
    pokemonList: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    pokemonNameTouchable: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    pokemonName: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    nextPrev: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 40
    },
    option: {
        fontWeight: "bold",
        fontSize: 16
    }

});
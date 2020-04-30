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

        this.loadElements(this.props.navigation.state.params.url);
    }

    loadElements = async (url) => {

        this.setState({
            loading: true
        })
        const response = await api.get(url)

        var double_damage_from = [];
        var double_damage_to = [];
        var half_damage_from = [];
        var half_damage_to = [];
        var no_damage_from = [];
        var no_damage_to = [];
        var moves = [];

        for (const type of response.data.damage_relations.double_damage_from) {
            double_damage_from.push(type);
        }

        for (const type of response.data.damage_relations.double_damage_to) {
            double_damage_to.push(type);
        }

        for (const type of response.data.damage_relations.half_damage_from) {
            half_damage_from.push(type);
        }

        for (const type of response.data.damage_relations.half_damage_to) {
            half_damage_to.push(type);
        }

        for (const type of response.data.damage_relations.no_damage_from) {
            no_damage_from.push(type);
        }

        for (const type of response.data.damage_relations.no_damage_to) {
            no_damage_to.push(type);
        }

        for (const move of response.data.moves) {
            moves.push(move);
        }

        this.setState({
            name: response.data.name,
            double_damage_from: double_damage_from,
            double_damage_to: double_damage_to,
            half_damage_from: half_damage_from,
            half_damage_to: half_damage_to,
            no_damage_from: no_damage_from,
            no_damage_to: no_damage_to,
            moves: moves,
            loading: false
        })
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
                            <ScrollView style={styles.scrollContainer} nestedScrollEnabled={true}>
                                <Text style={styles.titles}>Type: {this.state.name}</Text>
                                <Text style={styles.titles}>Double damage from: </Text>
                                <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                    <View style={styles.moveList}>
                                        {this.state.double_damage_from.map(double_damage_from => (
                                            <TouchableOpacity
                                                key={double_damage_from.url}
                                                onPress={() => this.loadElements(double_damage_from.url)}>
                                                <Text style={styles.moveName}>
                                                    {double_damage_from.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                                    <Text style={styles.titles}>Double damage to: </Text>
                                    <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                        <View style={styles.moveList}>
                                            {this.state.double_damage_to.map(double_damage_to => (
                                                <TouchableOpacity
                                                    key={double_damage_to.url}
                                                    onPress={() => this.loadElements(double_damage_to.url)}>
                                                    <Text style={styles.moveName}>
                                                        {double_damage_to.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    <Text style={styles.titles}>Half damage from: </Text>
                                    <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                        <View style={styles.moveList}>
                                            {this.state.half_damage_from.map(half_damage_from => (
                                                <TouchableOpacity
                                                    key={half_damage_from.url}
                                                    onPress={() => this.loadElements(half_damage_from.url)}>
                                                    <Text style={styles.moveName}>
                                                        {half_damage_from.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    <Text style={styles.titles}>Half damage to: </Text>
                                    <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                        <View style={styles.moveList}>
                                            {this.state.half_damage_to.map(half_damage_to => (
                                                <TouchableOpacity
                                                    key={half_damage_to.url}
                                                    onPress={() => this.loadElements(half_damage_to.url)}>
                                                    <Text style={styles.moveName}>
                                                        {half_damage_to.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    <Text style={styles.titles}>No damage from: </Text>
                                    <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                        <View style={styles.moveList}>
                                            {this.state.no_damage_from.map(no_damage_from => (
                                                <TouchableOpacity
                                                    key={no_damage_from.url}
                                                    onPress={() => this.loadElements(no_damage_from.url)}>
                                                    <Text style={styles.moveName}>
                                                        {no_damage_from.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    <Text style={styles.titles}>No damage to: </Text>
                                    <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                        <View style={styles.moveList}>
                                            {this.state.no_damage_to.map(no_damage_to => (
                                                <TouchableOpacity
                                                    key={no_damage_to.url}
                                                    onPress={() => this.loadElements(no_damage_to.url)}>
                                                    <Text style={styles.moveName}>
                                                        {no_damage_to.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    <Text style={styles.titles}>Moves: </Text>
                                    <ScrollView style={styles.scrollMoves} nestedScrollEnabled={true}>
                                        <View style={styles.moveList}>
                                            {this.state.moves.map(move => (
                                                <Text style={styles.moveName} key={move.url}>
                                                    {move.name}
                                                </Text>
                                            ))}
                                        </View>
                                    </ScrollView>
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
        marginTop: "10%"
    },
    loadingContainer: {
                    flex: 1,
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    scrollContainer: {
                    width: "100%",
        height: "100%",
        paddingHorizontal: "5%"
    },
    titles: {
                    marginTop: 15,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    scrollMoves: {
                    maxHeight: 200,
        borderWidth: 1,
        marginHorizontal: 20
    },
    moveList: {
        flex: 1,
        flexDirection: 'row',
        height: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    moveName: {
                    marginVertical: 10,
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 40
    }
})


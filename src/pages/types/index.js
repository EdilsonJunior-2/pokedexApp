import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import api from "../../services/api";
import { TouchableOpacity } from 'react-native-gesture-handler';

import LottieView from "lottie-react-native";
import pokeball from "../../../assets/4366-game-east-west.json";

// import { Container } from './styles';

export default class Types extends Component {

    state = {
        types: []
    }

    componentDidMount = async () =>{
        const response = await api.get("/type");
        this.setState({
            types: response.data.results
        })
        console.log(this.state.types);
    }

    render(){

        const { types } = this.state;

        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.typesTitle}>Types</Text>
                    <ScrollView style={styles.scrollTypeList}>
                            <View style={styles.typeList}>
                                {types.map(type => (
                                    <TouchableOpacity
                                        style={styles.typeNameTouchable}
                                        key={type.url}
                                        onPress={() => {
                                            this.props.navigation.navigate("SpecificType",
                                                {
                                                    url: type.url
                                                })
                                        }}
                                    >
                                        <Text style={styles.typeName}>
                                            {type.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            </ScrollView>
                </View>
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
    typesTitle: {
        marginTop: "5%",
        marginBottom: "5%",
        fontSize: 40,
        color: "#D3350D",
        fontWeight: "bold"

    },
    scrollTypeList: {
        width: "100%",
        maxHeight: "70%"
    },
    typeList: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    typeNameTouchable: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    typeName: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
})
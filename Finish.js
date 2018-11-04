import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Finish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Score: this.props.navigation.state.params.Score,
            time: this.props.navigation.state.params.secondsElapsed
        };
    }

    finish = () => {
        this.props.navigation.navigate("StartPage", {});
    };
    static navigationOptions = {
        title: "Finish"
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Your Score: {this.state.Score}</Text>
                <Text style={styles.text}>Your Time: {this.state.time}</Text>
                <TouchableOpacity onPress={this.finish} style={styles.button_large}>
                    <Text style={styles.text}>Start Quiz Again</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#576574"
    },
    text: {
        color: "white",
        fontSize: 20
    },
    textBack: {
        color: "white",
        fontSize: 20,
        marginTop: 20,
        marginLeft: '40%'
    },
    button_large: {
        backgroundColor: "#ff7455",
        padding: 20,
        borderRadius: 40,
        width: '80%',
        alignItems: "center"
    },
});
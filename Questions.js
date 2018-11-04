import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Spinner } from "native-base";
const Entities = require("html-entities").AllHtmlEntities;

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            difficulty: "",
            number: 0,
            score: 0,
            secondsElapsed: 0,
            spin: false,
            times: 0,
            timem: 0,
        };
    }
    static navigationOptions = {
        title: "Quiz"
    };

    //Getting 10 TRUE OR FALSE questions  from the API and Saving them to data
    componentWillMount() {
        //setting a spiner until we get all questions from the API
        this.setState({
            spin: true
        });

        fetch("https://opentdb.com/api.php?amount=10&type=boolean")
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    //saving the result from the request into the variable data
                    data: responseData.results
                });
            })
            .then(this.onSuccess)
            .catch(() => {
                console.log("Error while connecting");
            });
        //this is the time neded to finish the test
        this.timer();
    }

    //now stoping the spinner
    onSuccess = () => {
        this.setState({
            spin: false
        });
    };
    onFail = () => { };
    renderButton = () => {
        const entities = new Entities();
        if (this.state.spin) {
            return <Spinner />;
        }

        return (
            <View>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.h1}>Questions No {this.state.number + 1}</Text>
                        <View >
                            <Text style={styles.text}>
                                {this.getMinutes()} :{this.getSeconds()}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.h2}>
                            {entities.decode(this.state.data[this.state.number].question)}
                        </Text>
                    </View>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => this.nextQuestion(true)}
                            style={styles.button_small}
                        >
                            <Text style={styles.text}>True</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.nextQuestion(false)}
                            style={styles.button_small}
                        >
                            <Text style={styles.text}>False</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };


    //these methods for calculating time i found online I just copied them
    timer = () => {
        this.incrementer = setInterval(() => {
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            });
        }, 1000);
    };


    getSeconds = () => {
        return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
    };
    getMinutes = () => {
        return Math.floor(this.state.secondsElapsed / 60);
    };

    stopTimer = () => {
        clearInterval(this.incrementer);
    };

    finish = () => {
        this.stopTimer();

        this.props.navigation.navigate("Finish", {
            Score: this.state.score
        });
    };
    nextQuestion(answer) {
        console.log("Question Number", this.state.number);
        if (this.state.number == 6 + 2) {
            this.finish();
        }

        let correct = this.state.data[this.state.number].correct_answer == "True";


        if (answer == correct) {
            this.setState({
                score: this.state.score + 10
            });
        }
        this.setState({
            number: this.state.number + 1
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: "#576574", flex: 1 }}>
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button_small: {
        backgroundColor: "#0984e3",
        padding: 10,
        borderRadius: 40,
        width: 100,
        alignItems: "center"
    },
    finishNow: {
        color: '#e50d0d',
        paddingBottom: 10,
    },
    timer: {
        backgroundColor: "#ff6b6b",
        padding: 5,
        borderRadius: 40,
        width: 150,
    },
    text: {
        color: "white",
        fontSize: 20
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1
    },
    h1: {
        fontSize: 20,
        color: "white"
    },
    h2: {
        fontSize: 18,
        color: "white"
    },
    header: {
        backgroundColor: "#34495e",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default Questions;
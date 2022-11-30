import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountDown from "react-native-countdown-component";

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [counterTime, setCounterTime] = React.useState(4500);

  const [id, setId] = React.useState(0);

  let BPM = 0;

  const handleClickTimer = () => {
    if (isRunning) {
      setCount(count + 1);
      calculateBPM();
    }
    setIsRunning(true);
  };

  const handleClean = () => {
    setCount(0);
    setIsRunning(false);
    handleReset();
  };

  const handleReset = () => {
    setId(id + 1);
  };

  const calculateBPM = () => {

    var cantosPorMin 
    var cantosTotal
    while (timer != 0) {
      if (tempoAtual % 60 == 0) {
          cantosPorMin = Math.abs(cantosTotal - cantosPorMin);
      }
  
      when (clickContaCanto) {
          do cantosTotal ++;
      }
  }
  };





  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Média por minuto</Text>
          <Text>{BPM}</Text>
        </View>
        <CountDown
          id={id}
          size={80}
          until={counterTime}
          onFinish={() => alert("Finished")}
          digitStyle={{
            backgroundColor: "#FFF",
            borderWidth: 2,
            borderColor: "transparent",
          }}
          timeLabelStyle={{ color: "red", fontWeight: "bold" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: null, s: null }}
          running={isRunning}
          showSeparator
        />
        <TouchableOpacity onPress={handleClickTimer} style={styles.tapCounter}>
          <Text style={styles.counterText}>{count}</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setIsRunning(false)}
            style={styles.stopButton}
          >
            <Text style={styles.text}>Parar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClean()}
            style={styles.cleanButton}
          >
            <Text style={styles.text}>Zerar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  tapCounter: {
    fontWeight: "bold",
    backgroundColor: "#0E3F79",
    padding: 10,
  },
  counterText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  stopButton: {
    backgroundColor: "#E5424B",
    padding: 20,
  },
  cleanButton: {
    backgroundColor: "#ACAC4B",
    padding: 20,
  },
});

export default Counter;

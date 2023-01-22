import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const START_MINUTES = "03";
const START_SECOND = "00";
const START_DERATION = 10;

const CountdownTimer = () => {
  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(START_DERATION);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentTime, setCurrentTime] = useState(
    parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10)
  );
  const [singsPerMinute, setSingsPerMinute] = useState<number[]>([]);
  const [lastMinuteSings, setLastMinuteSings] = useState(0);

  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
    setLastMinuteSings(0);
    setCount(0);
    setSingsPerMinute([]);
    setCurrentTime(
      parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10)
    );
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  const handleClickCount = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    setIsRunning(true);

    if (isRunning) {
      setCount(count + 1);
      setLastMinuteSings(lastMinuteSings + 1);
    }
  };

  const averageSingsPerMinute = () => {
    const timeElapsed =
      parseInt(START_SECOND, 10) +
      60 * parseInt(START_MINUTES, 10) -
      currentTime;

    const ratePerSecond = count / timeElapsed;

    const ratePerMinute = ratePerSecond * 60;
    return ratePerMinute.toFixed(1);
  };

  const predictTotalSings = () => {
    const timeElapsed =
      parseInt(START_SECOND, 10) +
      60 * parseInt(START_MINUTES, 10) -
      currentTime;

    const ratePerSecond = count / timeElapsed;

    const ratePerMinute = ratePerSecond * 60;

    return (ratePerMinute * Number(START_MINUTES)).toFixed(1);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          setMinutes(START_MINUTES);
          setSeconds(START_SECOND);
          setIsRunning(false);
          setIsStop(false);
          setDuration(START_DERATION);
        } else {
          minutes = parseInt(String(timer / 60), 10);
          seconds = parseInt(String(timer % 60), 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(String(minutes));
          setSeconds(String(seconds));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning || currentTime === 0) {
      setCurrentTime(currentTime - 1);

      if (
        (currentTime % 60 === 0 && currentTime !== 180) ||
        currentTime === 0
      ) {
        setSingsPerMinute(singsPerMinute.concat(lastMinuteSings));
        setLastMinuteSings(0);
      }
    }
  }, [currentSeconds]);

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            display: "flex",
          }}
        >
          <Text style={styles.counter}>
            {currentMinutes}:{currentSeconds}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={singsPerMinute}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />

        <Text>{averageSingsPerMinute()} Média de cantos por minuto</Text>
        <Text>{predictTotalSings()} Previsão de cantos</Text>

        <View>
          {isRunning && (
            <TouchableOpacity style={styles.stopButton} onPress={stopHandler}>
              <Text style={styles.buttonText}>STOP</Text>
            </TouchableOpacity>
          )}

          {isStop && (
            <TouchableOpacity
              style={styles.resumeButton}
              onPress={resumeHandler}
            >
              <Text style={styles.buttonText}>RESUME</Text>
            </TouchableOpacity>
          )}
          {isRunning && (
            <TouchableOpacity style={styles.resetButton} onPress={resetHandler}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.tapButton}
          onPress={() => handleClickCount()}
        >
          <Text style={styles.buttonText}>{count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },

  counter: {
    textAlign: "center",
    fontSize: 80,
    fontWeight: "bold",
  },
  list: {
    width: "60%",
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
  resetButton: {
    padding: 20,
    backgroundColor: "#F7EF81",
  },
  stopButton: {
    padding: 20,
    backgroundColor: "#FF6B6B",
  },
  resumeButton: {
    padding: 20,
    backgroundColor: "#4ECDC4",
  },
  tapButton: {
    padding: 20,
    backgroundColor: "#3C91E6",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CountdownTimer;

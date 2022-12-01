import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const START_MINUTES = '02';
const START_SECOND = '00';
const START_DERATION = 10;

const Counter = () => {

  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0)
  const [duration, setDuration] = useState(START_DERATION);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentTime, setCurrentTime] = useState(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10))

  const startHandler = () => {
   
  };
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

    if(isRunning) {
      setCount(count+1)
    }
  }

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(String(timer / 60), 10);
          seconds = parseInt(String(timer % 60), 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          setMinutes(String(minutes));
          setSeconds(String(seconds));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  let BPM: any[] = []
  
  useEffect(() => {
    if(isRunning) {
      setCurrentTime(currentTime-1)
      const totalSingingLastMinute = 15
      if(currentTime % 60 === 0){
        BPM.push(count - totalSingingLastMinute)
        console.log(BPM[0])
      }
    }
  }, [currentSeconds])


  return (
    <View style={styles.container}>
      <View>
       
        <View>
          <Text>{currentMinutes}</Text>
          <Text>:</Text>
          <Text>{currentSeconds}</Text>
        </View>
        {!isRunning && !isStop && (
          <TouchableOpacity
            onPress={startHandler}
          ><Text>START</Text>
            
          </TouchableOpacity>
        )}
        {isRunning && (
          <TouchableOpacity
            onPress={stopHandler}
          >
            <Text>STOP</Text>
       
          </TouchableOpacity>
        )}

        {isStop && (
          <TouchableOpacity
            onPress={resumeHandler} 
          >
            <Text>RESUME</Text>
          </TouchableOpacity>
        )}

        <Text>{duration}</Text>

        <TouchableOpacity
          onPress={resetHandler}
        >
          <Text>RESET</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=> handleClickCount()} style={styles.tapCounter}>
          <Text>{count}</Text>
        </TouchableOpacity>
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
  stopTouchableOpacity: {
    backgroundColor: "#E5424B",
    padding: 20,
  },
  cleanTouchableOpacity: {
    backgroundColor: "#ACAC4B",
    padding: 20,
  },
});

export default Counter;

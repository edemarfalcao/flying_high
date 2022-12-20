import { SafeAreaView, StyleSheet } from "react-native";
import CountdownTimer from "./components/CountdownTimer";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CountdownTimer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

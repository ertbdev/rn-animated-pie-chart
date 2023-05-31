import {useState} from 'react';
import {
  Button,
  SafeAreaView,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PieChart, AnimatedPieChart} from 'rn-animated-pie-chart';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState([10, 20, 30]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = () => {
    setData(oldData => [...oldData, Math.random() * 10 + 5]);
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
      <View style={styles.constainer}>
        <PieChart data={[10, 20]} size={200} />
        <AnimatedPieChart data={data} size={200} holeSize={40} />
        <Button title="Add" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  constainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;

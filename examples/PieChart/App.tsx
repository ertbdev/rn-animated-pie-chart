/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PieChart, AnimatedPieChart} from 'rn-animated-pie-chart';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <PieChart data={[10, 20]} />
        <AnimatedPieChart data={[10, 20, 30]} />
      </View>
    </SafeAreaView>
  );
}

export default App;

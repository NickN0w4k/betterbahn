import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import './global.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-[#313C38]">
      <Text className="text-xl font-bold text-white">Willkommen in der BetterBahn App!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

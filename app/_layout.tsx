import { Nunito_400Regular, Nunito_700Bold, Nunito_900Black } from "@expo-google-fonts/nunito";
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from "expo-font";
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry:1
    }
  }
});
export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black
  })
  if(!fontsLoaded){ 
    return null
  }
  return (
    <ThemeProvider value={DefaultTheme}>
      {/* 手势操作容器 */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

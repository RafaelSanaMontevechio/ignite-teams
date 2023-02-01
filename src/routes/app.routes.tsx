import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from 'styled-components/native';

import { Groups } from '@screens/Groups';
import { Players } from '@screens/players';
import { NewGroup } from '@screens/NewGroup';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { COLORS } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Groups" component={Groups} />
        <Screen name="NewGroup" component={NewGroup} />
        <Screen name="Players" component={Players} />
      </Navigator>
    </View>
  );
}

import {Pressable, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function IconButton({iconName, size, color, onPress}) {
  return (
    <Pressable android_ripple style={(pressed) => pressed && styles.pressed} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Ionicons size={size} color={color} name={iconName}/>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },

  pressed: {
    opacity: 0.75
  }
})
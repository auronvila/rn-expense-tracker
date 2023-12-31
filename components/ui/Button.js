import {Pressable, StyleSheet, View, Text} from 'react-native';
import {GlobalStyles} from '../../constans/styles';

export default function Button({children, onPress, mode, style}) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} android_ripple>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colors.primary200
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: 4,
  }
})
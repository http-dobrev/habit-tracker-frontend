import { StyleSheet, Image, useColorScheme } from 'react-native'

// images
import DarkLogo from '../assets/img/logo-dark.png'
import LightLogo from '../assets/img/logo-light.png'

const ThemedLogo = ({...props}) => {
  const colorScheme = useColorScheme()
  
  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

  return (
    <Image source={logo} style={styles.img} {...props} />
  )
}

export default ThemedLogo

const styles = StyleSheet.create({
    img: {
    marginVertical: 10,
    width: 320,
    height: 180
  }
})
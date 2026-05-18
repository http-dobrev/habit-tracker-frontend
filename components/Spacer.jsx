import { View } from 'react-native'

const Spacer = ({ width = "100%", height = 30 }) => {
  return (
    <View style={{ width, height }} />
  )
}

export default Spacer
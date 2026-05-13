import { StyleSheet } from "react-native"
import { useColorScheme } from 'react-native'

import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import DateHeader from "../../components/DateHeader"

const Dashboard = () => {
    return (
        <ThemedView style={styles.container} safe={true}>
            <ThemedText title={true} style={styles.heading}>
                Today
            </ThemedText>
            <DateHeader />
        </ThemedView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
    },
    heading: {
        fontWeight: "bold",
        fontSize: 24,
    },
})
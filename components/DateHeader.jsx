import ThemedText from "./ThemedText"

const DateHeader = () => {
    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
    })

    return (
        <ThemedText title={true}>
            {formattedDate}
        </ThemedText>
    )
}

export default DateHeader
import ThemedText from "./ThemedText"

function DateHeader({ style, ...props }) {
    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
    })

    return (
        <ThemedText title={true} style={style}>
            {formattedDate}
        </ThemedText>
    )
}

export default DateHeader
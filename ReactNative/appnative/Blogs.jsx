import { FlatList, StyleSheet } from "react-native"
import { View, Text } from "react-native"

const Blogs = () => {
    const blogs = [
        {
            id: 1,
            title: "blog1"
        },
        {
            id: 2,
            title: "blog2"
        },
        {
            id: 3,
            title: "blog3"
        },
        {
            id: 4,
            title: "blog4"
        },
        {
            id: 5,
            title: "blog5"
        },
        {
            id: 6,
            title: "blog6"
        },
        {
            id: 7,
            title: "blog7"
        },
        {
            id: 8,
            title: "blog7"
        },
        {
            id: 9,
            title: "blog7"
        },
        {
            id: 10,
            title: "blog7"
        },
        {
            id: 11,
            title: "blog7"
        },
    ]
    return (
        <View>
            {/* {
                blogs.map((blog) => {
                    return (
                        <ScrollView style={ styles.blogs }>
                            <Text style={ { fontSize: 20, color: 'white', textAlign: 'center' } }>{ blog.title }</Text>
                        </ScrollView>
                    )
                })
            } */}
            <FlatList data={ blogs } renderItem={ ({ item }) => (
                <View style={ styles.blogs }>
                    <Text style={ { fontSize: 20, color: 'white', textAlign: 'center' } }>{ item.title }</Text>
                </View>
            ) } />
        </View>
    )
}
export default Blogs

const styles = StyleSheet.create({
    blogs: {
        backgroundColor: 'blue',
        padding: 20,
        marginVertical: 10,
    }
})

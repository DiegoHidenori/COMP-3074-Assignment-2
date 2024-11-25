import { View, Text, StyleSheet, Button } from 'react-native';

export default function AboutScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Full Name: Diego Tsukayama</Text>
            <Text style={styles.text}>Student ID: 101472085</Text>
            <Button title='Go back' onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
    },
});
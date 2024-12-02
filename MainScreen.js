import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';

export default function MainScreen({ navigation }) {
    const [baseCurrency, setBaseCurrency] = useState('CAD');
    const [destinationCurrency, setDestinationCurrency] = useState('USD');
    const [amount, setAmount] = useState('1');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState('');

    const getExchangeRate = async () => {
        try {
            setError('');
            const response = await axios.get(
                `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_HCtjO1cCc8vFpInYcpINdY3Fk8eO32o20X1FHaNI&base_currency=${baseCurrency}`
            );
            const rate = response.data.data[destinationCurrency];
            if (!rate) {
                throw new Error('Invalid currency');
            };
            const result = parseFloat(amount) * rate;
            setConvertedAmount(result.toFixed(2));
        } catch (err) {
            setError(err.message || 'Error fetching exchange rate');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Base Currency:</Text>
            <TextInput
                style={styles.input}
                value={baseCurrency}
                onChangeText={setBaseCurrency}
            />
            <Text style={styles.text}>Destination Currency:</Text>
            <TextInput
                style={styles.input}
                value={destinationCurrency}
                onChangeText={setDestinationCurrency}
            />
            <Text style={styles.text}>Amount:</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
            />
            <Button title='Convert' onPress={getExchangeRate} />
            {convertedAmount && (
                <Text style={styles.text}>Converted Amount: {convertedAmount}</Text>
            )}
            <Button title='Go to About' onPress={() => navigation.navigate('About')} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    marginBottom: 15,
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

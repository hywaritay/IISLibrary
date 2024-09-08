import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { createItem } from './../components/api/libraryApi'; 

export default function Home() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        author: '',
        grade: '',
        category: '',
        published_date: '',
        quantity: '',
        available_quantity: 0
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        console.log(formData);
        await createItem(formData);
        setFormData({
            id: 0,
            title: '',
            author: '',
            grade: '',
            category: '',
            published_date: '',
            quantity: '',
            available_quantity: 0
        });
        router.push('/listBooking');  
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Add New Book</Text>
                
                <Text style={{fontFamily:"outfit-medium"}}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={formData.title}
                    onChangeText={(value) => handleChange('title', value)}
                />

                <Text style={{fontFamily:"outfit-medium"}}>Author</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Author"
                    value={formData.author}
                    onChangeText={(value) => handleChange('author', value)}
                />

                <Text style={{fontFamily:"outfit-medium"}}>Grade</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Grade"
                    value={formData.grade}
                    onChangeText={(value) => handleChange('grade', value)}
                />

                <Text style={{fontFamily:"outfit-medium"}}>Category</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    value={formData.category}
                    onChangeText={(value) => handleChange('category', value)}
                />

                <Text style={{fontFamily:"outfit-medium"}}>Published Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Published Date (YYYY-MM-DD)"
                    value={formData.published_date}
                    onChangeText={(value) => handleChange('published_date', value)}
                />
                <Text style={{fontFamily:"outfit-medium"}}>Quantity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={formData.quantity}
                    keyboardType="numeric"
                    onChangeText={(value) => handleChange('quantity', value)}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}  onPress={() => router.push('./listBooking')}>
                    <Text style={styles.buttonText}>View Listing </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 25,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

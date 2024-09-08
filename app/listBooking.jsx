import React, { useState, useEffect } from 'react'; 
import { SafeAreaView, View, Text, FlatList, ScrollView, TouchableOpacity, Modal, Alert, TextInput, StyleSheet } from 'react-native';
import { getItems, updateItem, deleteItem } from './../components/api/libraryApi';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function ListBooking() {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
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

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await getItems();
        console.log(response.data);
        setItems(response.data);
    };

    const confirmDelete = (item) => {
        setSelectedItem(item);
        setDeleteModalVisible(true);
    };
    
    const handleDelete = async () => {
        if (selectedItem) {
            await deleteItem(selectedItem.id);
            setDeleteModalVisible(false);
            fetchItems();
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setFormData({
            title: item.title,
            author: item.author,
            grade: item.grade,
            category: item.category,
            published_date: item.published_date,
            quantity: item.quantity,
            available_quantity: item.available_quantity
        });
        setModalVisible(true);
    };
    
    const handleSaveEdit = async () => {
        if (selectedItem) {
            await updateItem({
                id: selectedItem.id,
                title: formData.title,
                author: formData.author,
                grade: formData.grade,
                category: formData.category,
                published_date: formData.published_date,
                quantity: formData.quantity,
                available_quantity: formData.available_quantity
            });
            setModalVisible(false);
            fetchItems();
        }
    };

    const renderItem = ({ item }) => (
        <View 
            style={styles.itemContainer}
        >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>Author: {item.author}</Text>
            <Text style={styles.itemSubtitle}>Grade: {item.grade}</Text>
            <Text style={styles.itemSubtitle}>Category: {item.category}</Text>
            <Text style={styles.itemSubtitle}>Published Date: {item.published_date}</Text>
            <Text style={styles.itemSubtitle}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemSubtitle}>Available: {item.available_quantity}</Text>

            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                    <Ionicons name="pencil" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item)} style={styles.deleteButton}>
                    <Ionicons name="trash" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ padding: 20 }}>
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <Ionicons name="arrow-back" size={24} color="#020452" />
                </TouchableOpacity>
                <Text style={styles.header}>Books</Text>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: "#F6F5F5" }}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </ScrollView>

            {/* Edit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ScrollView>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Edit Book</Text>

                            <Text style={{fontFamily:"outfit-medium"}}>Title</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Title"
                                value={formData.title}
                                onChangeText={(value) => setFormData({ ...formData, title: value })}
                            />

                            <Text style={{fontFamily:"outfit-medium"}}>Author</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Author"
                                value={formData.author}
                                onChangeText={(value) => setFormData({ ...formData, author: value })}
                            />

                            <Text style={{fontFamily:"outfit-medium"}}>Grade</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Grade"
                                value={formData.grade}
                                onChangeText={(value) => setFormData({ ...formData, grade: value })}
                            />

                            <Text style={{fontFamily:"outfit-medium"}}>Category</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Category"
                                value={formData.category}
                                onChangeText={(value) => setFormData({ ...formData, category: value })}
                            />

                            <Text style={{fontFamily:"outfit-medium"}}>Published Date</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Published Date (YYYY-MM-DD)"
                                value={formData.published_date}
                                onChangeText={(value) => setFormData({ ...formData, published_date: value })}
                            />

                            <Text style={{fontFamily:"outfit-medium"}}>Quantity</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Quantity"
                                value={formData.quantity}
                                keyboardType="numeric"
                                onChangeText={(value) => setFormData({ ...formData, quantity: value })}
                            />

                            <Text style={{fontFamily:"outfit-medium"}}>Available Quantity</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Available Quantity"
                                value={formData.available_quantity.toString()}
                                keyboardType="numeric"
                                onChangeText={(value) => setFormData({ ...formData, available_quantity: parseInt(value) })}
                            />

                            <View style={styles.modalActions}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Delete Book</Text>
                        <Text>Are you sure you want to delete this book?</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteConfirmButton} onPress={handleDelete}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        color: "#2D0C57",
        fontSize: 24,
        fontFamily: 'outfit-bold',
        marginTop: 10,
    },
    itemContainer: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSubtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    editButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#F44336",
        padding: 10,
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 13,
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontFamily:'outfit-medium'
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#000',
    },
    deleteConfirmButton: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
    },
});

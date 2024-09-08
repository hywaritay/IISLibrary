import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';


export default function LoginScreen() {


  return (
    <View>
      
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.btn}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 100,
            }}
          >
            <Image
              source={require('./../assets/images/fingerprint.jpg')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      padding: 20,
      marginTop:-20,
      elevation:1
  },
  btn:{
      backgroundColor:Colors.PRIMARY,
      padding:16,
      borderRadius:99,
      marginTop:20
  }
})
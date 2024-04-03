import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Image, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  
  return (
    <SafeAreaView style={styles.container}>
        <Image source={require("../assets/shape.png")} style={styles.image} />
        <View style={styles.containerImg}>  
            <Image source={require("../assets/image-top.png")} style={styles.imagTop} />
            <Text style={styles.title}>Cotação do Ouro</Text>
        </View>
        <View style={styles.containerButton}>
            <Link href={"/price"} style={styles.buttonText}>Cotação</Link>
            <Link href={"/grafico"} style={styles.buttonText}>Gráfico</Link>
            <Link href={"/coff"} style={styles.buttonText}>Regreção</Link>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImg: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        
        marginRight: 10,
    },
    imagTop: {
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 45,
    },
    containerButton: {
        flex: 1,
        alignItems: "center",
        gap: 10
    },
    buttonText: {
        textAlign: "center",
        width: 120,
        padding: 15,
        backgroundColor: "#6C63FF",
        color: "white",
        borderRadius: 8,
    }
});

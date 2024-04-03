import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Coeficientes da regressão
const coefficients = [
  { "Exponent": 1, "Coeff.": -5.67e11 },
  { "Exponent": 2, "Coeff.": 5.63e8 },
  { "Exponent": 3, "Coeff.": -279.7976361 },
  { "Exponent": 4, "Coeff.": 69.4733 },
  { "Exponent": 5, "Coeff.": -0.0069 },
  { "Exponent": 0, "Coeff.": 2.28e14 }
];

// Função para calcular o preço do ouro usando regressão polinomial
const calculateGoldPrice = (year: number): string => {
  let result = 0;
  for (let i = 0; i < coefficients.length; i++) {
    result += coefficients[i]["Coeff."] * Math.pow(year, coefficients[i]["Exponent"]);
  }
  return result.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
};

export default function Home() {
  const years = Array.from({ length: 2100 - 2024 + 1 }, (_, index) => index + 2024);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [modalVisible, setModalVisible] = useState(false);
  const [goldPrice, setGoldPrice] = useState('');

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setModalVisible(false);
    setGoldPrice(calculateGoldPrice(parseInt(year)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Pesquise o preço do ouro</Text>

      <TouchableOpacity style={styles.selectYearButton} onPress={() => setModalVisible(true)}>
        <Text>Ano Selecionado: {selectedYear}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <FlatList
            data={years}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.yearItem}
                onPress={() => handleSelectYear(item.toString())}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => setGoldPrice(calculateGoldPrice(parseInt(selectedYear)))}>
        <Text style={styles.buttonText}>Calcular Preço do Ouro</Text>
      </TouchableOpacity>

      {goldPrice !== '' && <Text style={styles.goldPrice}>Preço do Ouro: {goldPrice}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectYearButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  yearItem: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  goldPrice: {
    fontSize: 16,
    marginTop: 20,
  }
});

import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [randomImg, setRandomImg] = useState('');
  const [breed, setBreed] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dogImages, setDogImages] = useState([]);
  const [currentBreed, setcurrentBreed]= useState('');

  useEffect(() => {
    getRandomDog();
  }, []);

  const getRandomDog = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const json = await response.json();
      const randomImg = json.message;
      console.log('New dog', randomImg);

      setRandomImg(randomImg);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const getRandomDogByBreed = async () => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );

      const json = await response.json();
      const randomImg = json.message;
      console.log('New dog by breed', randomImg);

      setRandomImg(randomImg);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchDogImages();
  }, []);

  const fetchDogImages = async () => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/${10}`
      );
      const data = await response.json();
      setDogImages(data.message);
    } catch (error) {
      console.error('Error fetching dog images:', error);
    }
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>Random dog!</Text>

      <Image style={styles.image} source={{ uri: randomImg }} />

      <TextInput
        placeholder="Enter Breed here"
        onChangeText={(text) => {
          setBreed(text);
        }}
      />
      <Button title="new Dog by breed" onPress={getRandomDogByBreed} />
      <Button title="Get any dog" onPress={getRandomDog} />

      {dogImages.map((image, index) => (
        <Text
          key={index}
          style={styles.imageText}
          onPress={() => handleImagePress(image)}
        >
          {image}
        </Text>
      ))}

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.selectedImage}
        />
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  imageText: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
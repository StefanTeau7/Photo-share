import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {auth} from '../../firebaseConfig';
import ApiService from '../services/api_service';

export interface ImageModel {
  imageUrl: string;
  imageId: string;
}

const FavoriteImagesScreen: React.FC = () => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!userId) {
          return;
        }
        const favorites = await ApiService.fetchFavoriteImages(userId);
        if (favorites) {
          const uniqueImageUrls = [...new Set(favorites)];
          const imagesData: ImageModel[] = uniqueImageUrls.map((url: any) => ({
            imageUrl: url,
            imageId: url, // Using the URL as ID; you might want to extract or generate a unique ID differently
          }));
          setImages(imagesData);
        }
      } catch (error) {
        console.error('Error while fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [userId]);

  const renderItem = ({item}: {item: ImageModel}) => (
    <Image source={{uri: item.imageUrl}} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={item => item.imageId}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    margin: 5,
  },
});

export default FavoriteImagesScreen;

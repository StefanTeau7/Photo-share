import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {auth} from '../../firebaseConfig';
import ApiService from '../services/API_Service';
import {ImageModel} from '../components/ImageGrid';
import {styles} from '../styles/styles';

const ImagesCollection: React.FC<{route: any}> = ({route}) => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = auth.currentUser?.uid;

  const {collectionId, collectionTitle} = route.params;

  useEffect(() => {
    if (!userId) {
      return;
    }
    try {
      // Access cached images
      const fetchedUrls = ApiService.getCachedCollectionImages(collectionId);
      const fetchedImages = fetchedUrls.map((url, index) => ({
        imageUrl: url,
        imageId: index.toString(),
      }));
      if (fetchedImages.length) {
        setImages(fetchedImages);
      } else {
        console.warn(`No images found for collection ${collectionId}`);
      }
    } catch (error) {
      console.error('Error accessing images for collection:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, collectionId]);

  const renderItem = ({item}: {item: ImageModel}) => (
    <Image source={{uri: item.imageUrl}} style={styles.imageBig} />
  );

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>{collectionTitle}</Text>
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

export default ImagesCollection;

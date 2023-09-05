import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import ImageGrid, {ImageModel} from '../components/ImageGrid';
import CreateCollectionModal from '../components/CreateCollectionModal';
import AddToCollectionModal from '../components/AddToCollectionModal';
import {auth} from '../../firebaseConfig';
import ApiService from '../services/API_Service';
import CollectionItem from '../components/CollectionItem';
import {styles} from '../styles/styles';
import {ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const FavoriteImagesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [addToCollectionVisible, setAddToCollectionVisible] = useState(false);
  const [createCollectionVisible, setCreateCollectionVisible] = useState(false);
  const userId = auth.currentUser?.uid;

  const toggleImageSelection = (imageId: string, imageUrl: string) => {
    setSelectedImages(prevSelected => {
      if (prevSelected.includes(imageUrl)) {
        return prevSelected.filter(url => url !== imageUrl);
      } else {
        return [...prevSelected, imageUrl];
      }
    });
  };

  const handleAddToExistingCollection = async (collectionName: string) => {
    try {
      await ApiService.addImagesToCollection(
        collectionName,
        selectedImages,
        userId,
      );
      setSelectedImages([]);
      setAddToCollectionVisible(false);
    } catch (error) {
      console.error('Error while adding to collection:', error);
    }
  };

  const handleCreateNewCollection = async (collectionName: string) => {
    try {
      await ApiService.saveCollection(collectionName, selectedImages, userId);
      setCollections(prevCollections => [...prevCollections, collectionName]);
      setSelectedImages([]);
      setCreateCollectionVisible(false);
    } catch (error) {
      console.error('Error while creating collection:', error);
    }
  };

  const fetchCollections = useCallback(async () => {
    if (userId) {
      const collectionsMap = await ApiService.fetchCollections(userId);
      setCollections(Object.keys(collectionsMap));
    }
  }, [userId]);

  const fetchImages = useCallback(async () => {
    try {
      if (!userId) {
        return;
      }
      const favorites = await ApiService.fetchFavoriteImages(userId);
      if (favorites) {
        const uniqueImageUrls = [...new Set(favorites)];
        const imagesData: ImageModel[] = uniqueImageUrls.map((url: any) => ({
          imageUrl: url,
          imageId: Math.random().toString().slice(2, 10),
        }));
        setImages(imagesData);
      }
    } catch (error) {
      console.error('Error while fetching images:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchImages();
    fetchCollections();
  }, [fetchImages, fetchCollections]);

  useFocusEffect(
    React.useCallback(() => {
      fetchImages();
      fetchCollections();
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }, [fetchImages, fetchCollections]),
  );

  if (images.length === 0) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.collectionsTitle}>No images</Text>
      </View>
    );
  }

  if (!images.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerCenter}>
      <ScrollView>
        <Text style={styles.collectionsTitle}>Collections</Text>
        {collections.map(collectionName => {
          const lastImage =
            ApiService.cachedCollections[collectionName]?.slice(-1)[0];
          return (
            <CollectionItem
              key={collectionName}
              name={collectionName}
              lastImage={lastImage}
              onPress={() => {
                navigation.navigate('ImagesCollections', {
                  collectionId: collectionName,
                  collectionTitle: collectionName,
                });
              }}
            />
          );
        })}
        <Text style={styles.collectionsTitle}>Favorite Images</Text>
        <ImageGrid
          images={images}
          selectedImages={selectedImages}
          toggleImageSelection={(imageId: string, imageUrl: string) =>
            toggleImageSelection(imageId, imageUrl)
          }
        />
      </ScrollView>
      {selectedImages.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setAddToCollectionVisible(true)}>
            <Text style={styles.primaryButtonText}>
              Add to Existing Collection
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setCreateCollectionVisible(true)}>
            <Text style={styles.secondaryButtonText}>
              Create New Collection
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <AddToCollectionModal
        isVisible={addToCollectionVisible}
        collections={collections}
        onCollectionSelect={handleAddToExistingCollection}
        onClose={() => setAddToCollectionVisible(false)}
      />
      <CreateCollectionModal
        isVisible={createCollectionVisible}
        onSave={handleCreateNewCollection}
        onClose={() => setCreateCollectionVisible(false)}
      />
    </View>
  );
};

export default FavoriteImagesScreen;

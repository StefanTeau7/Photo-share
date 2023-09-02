import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {auth} from '../../firebaseConfig';
import ApiService from '../services/API_Service';
import CollectionItem from '../components/CollectionItem';

export interface ImageModel {
  imageUrl: string;
  imageId: string;
}

const FavoriteImagesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = auth.currentUser?.uid;
  const [collectionName, setCollectionName] = useState<string>('');
  const [isAddToCollectionModalVisible, setAddToCollectionModalVisible] =
    useState<boolean>(false);
  const [isCreateCollectionModalVisible, setCreateCollectionModalVisible] =
    useState<boolean>(false);

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId],
    );
  };

  const fetchCollections = useCallback(async () => {
    if (userId) {
      const collectionsMap = await ApiService.fetchCollections(userId);
      setCollections(Object.keys(collectionsMap));
    }
  }, [userId]);

  const addToCollection = async () => {
    try {
      await ApiService.addImagesToCollection(
        collectionName,
        selectedImages,
        userId,
      );
      setSelectedImages([]); // Clearing the selection
    } catch (error) {
      console.error('Error while adding to collection:', error);
    }
  };

  const createCollection = async () => {
    try {
      await ApiService.saveCollection(collectionName, selectedImages, userId);
      setSelectedImages([]); // Clearing the selection

      // Update collections state directly after creating a new collection
      setCollections(prevCollections => [...prevCollections, collectionName]);
    } catch (error) {
      console.error('Error while creating collection:', error);
    }
  };

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
          imageId: url,
        }));
        setImages(imagesData);
      }
    } catch (error) {
      console.error('Error while fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchImages();
    fetchCollections();
  }, [fetchImages, fetchCollections]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            {Array.from({length: Math.ceil(images.length / 3)}).map(
              (_, index) => {
                const items = images.slice(index * 3, index * 3 + 3);
                return (
                  <View key={index} style={styles.imageRow}>
                    {items.map(item => (
                      <TouchableOpacity
                        key={item.imageId}
                        onPress={() => toggleImageSelection(item.imageId)}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={[
                            styles.image,
                            selectedImages.includes(item.imageId) &&
                              styles.selectedImage,
                          ]}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              },
            )}
            {/* Modal for adding to existing collection */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isAddToCollectionModalVisible}
              onRequestClose={() => {
                setAddToCollectionModalVisible(false);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Select a Collection</Text>
                  {collections.map((name, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.collectionOption}
                      onPress={() => {
                        setCollectionName(name);
                        setAddToCollectionModalVisible(false);
                        addToCollection();
                      }}>
                      <Text>{name}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={{...styles.button, marginTop: 10}}
                    onPress={() => setAddToCollectionModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* Modal for creating a new collection */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCreateCollectionModalVisible}
              onRequestClose={() => {
                setCreateCollectionModalVisible(false);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Collection Name</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter Collection Name"
                    onChangeText={text => setCollectionName(text)}
                  />
                  <TouchableOpacity
                    style={{...styles.button, marginTop: 10}}
                    onPress={() => {
                      setCreateCollectionModalVisible(false);
                      createCollection();
                    }}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
          {selectedImages.length > 0 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setAddToCollectionModalVisible(true)}>
                <Text style={styles.buttonText}>Add to Collection</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCreateCollectionModalVisible(true)}>
                <Text style={styles.buttonText}>Create New Collection</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
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
    width: '25%',
    height: 100,
    aspectRatio: 1,
  },
  selectedImage: {
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  collectionsContainer: {
    marginTop: 20,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  modalInput: {
    width: 200,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  collectionOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  collectionsTitle: {
    fontSize: 20,
    marginVertical: 15,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 5,
  },
});

export default FavoriteImagesScreen;

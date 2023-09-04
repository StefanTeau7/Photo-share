import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import {auth} from '../../firebaseConfig';
import {UserProvider} from '../providers/UserContext';
import ApiService from '../services/API_Service';
import {styles} from '../styles/styles';
import {useAuth} from '../services/useAuth';
import ImageGrid, {ImageModel} from '../components/ImageGrid';

export interface Photo {
  id: string;
  urls: {small: string};
}

const UnsplashGridView: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const isButtonDisabled = selectedImages.length === 0;
  const {signOut} = useAuth();
  const transformedPhotos: ImageModel[] = photos.map(photo => ({
    imageId: photo,
    imageUrl: photo,
  }));

  const toggleImageSelection = (selectedPhoto: string) => {
    if (selectedImages.some(photo => photo === selectedPhoto)) {
      setSelectedImages(prev => prev.filter(photo => photo !== selectedPhoto));
    } else {
      setSelectedImages(prev => [...prev, selectedPhoto]);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Success',
      text2: 'Successfully saved images',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
    });
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get<Photo[]>(
        'https://api.unsplash.com/photos/',
        {
          params: {count: 3},
          headers: {
            Authorization:
              'Client-ID UVUMsMnUFmzCCsyDs7H2SZWQX8NS0eH7I_N3tqklu9k',
          },
        },
      );
      const photoUrls = response.data.map(photo => photo.urls.small);
      setPhotos(photoUrls);
    };
    fetchPhotos();
  }, []);

  return (
    <UserProvider>
      <ScrollView style={styles.container}>
        <>
          <ImageGrid
            images={transformedPhotos}
            selectedImages={selectedImages}
            toggleImageSelection={toggleImageSelection}
          />
          <TouchableOpacity
            style={[
              styles.primaryButton,
              isButtonDisabled && styles.iosButtonDisabled,
            ]}
            onPress={async () => {
              if (!isButtonDisabled) {
                const userId = auth.currentUser?.uid;
                if (userId) {
                  const result = await ApiService.saveFavoriteImages(
                    userId,
                    selectedImages,
                  );
                  if (result) {
                    console.log('Successfully saved images');
                    setSelectedImages([]);
                    showToast();
                  }
                } else {
                  console.error('No user is authenticated');
                }
              }
            }}
            disabled={isButtonDisabled}>
            <Text
              style={[
                styles.primaryButtonText,
                isButtonDisabled && styles.iosButtonTextDisabled,
              ]}>
              Save Selected
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      </ScrollView>
    </UserProvider>
  );
};

export default UnsplashGridView;

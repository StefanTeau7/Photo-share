import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {auth} from '../../firebaseConfig';
import {UserProvider, useUser} from '../providers/UserContext';
import ApiService from '../services/API_Service';

export interface Photo {
  id: string;
  urls: {small: string};
}

const UnsplashGridView: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const isButtonDisabled = selectedImages.length === 0;
  const {setUserInfo} = useUser();

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // reset user info when signing out
    } catch (error) {
      console.error(error);
    }
  };

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
      position: 'bottom',
      text1: 'Success',
      text2: 'Successfully saved images',
      visibilityTime: 4000,
      autoHide: true,
      bottomOffset: 40,
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
          {photos.map(imageUrl => {
            <TouchableOpacity
              style={[
                styles.imageWrapper,
                selectedImages.includes(imageUrl) && styles.imageSelected,
              ]}
              onPress={() => toggleImageSelection(imageUrl)}>
              <Image source={{uri: imageUrl}} style={styles.image} />
            </TouchableOpacity>;
          })}
          <TouchableOpacity
            style={[
              styles.iosButton,
              isButtonDisabled && styles.iosButtonDisabled,
            ]}
            onPress={() => async () => {
              if (!isButtonDisabled) {
                const userId = auth.currentUser?.uid;
                if (userId) {
                  const result = await ApiService.saveFavoriteImages(
                    userId,
                    selectedImages,
                  );
                  if (result) {
                    console.log('Successfully saved images');
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
                styles.iosButtonText,
                isButtonDisabled && styles.iosButtonTextDisabled,
              ]}>
              Save Selected
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}>
            <View style={styles.signOutContent}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </>
      </ScrollView>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '33.33%',
    height: 120,
    aspectRatio: 1,
    borderRadius: 12,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  imageWrapper: {
    margin: 5,
  },
  imageSelected: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 12,
  },
  iosButton: {
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: 'transparent',
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iosButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  iosButtonDisabled: {
    borderColor: '#C3C3C3',
  },
  iosButtonTextDisabled: {
    color: '#C3C3C3',
  },
  signOutButton: {
    padding: 15,
    borderRadius: 50, // This will create a fully rounded button for square-shaped buttons, adjust if needed
    backgroundColor: 'white',
    // Add any other styling or shadow you want for the button here
  },
  signOutContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // Add space between elements if there's more than the Text element
  },
  signOutText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    // Add any other text styles you want here
  },
});

export default UnsplashGridView;

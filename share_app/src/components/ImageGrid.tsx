import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from '../styles/styles';

export interface ImageModel {
  imageId: string;
  imageUrl: string;
}

interface ImageGridProps {
  images: ImageModel[];
  selectedImages: string[];
  toggleImageSelection: (imageId: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  selectedImages,
  toggleImageSelection,
}) => {
  return (
    <>
      {Array.from({length: Math.ceil(images.length / 3)}).map((_, index) => {
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
      })}
    </>
  );
};

export default ImageGrid;

import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

export interface ImageModel {
  imageId: string;
  imageUrl: string;
}

interface ImageGridProps {
  images: ImageModel[];
  selectedImages: string[];
  toggleImageSelection: (imageId: string, imageUrl: string) => void;
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
                onPress={() =>
                  toggleImageSelection(item.imageId, item.imageUrl)
                }>
                <Image
                  source={{uri: item.imageUrl}}
                  style={[
                    styles.image,
                    selectedImages.includes(item.imageId) &&
                      styles.imageSelected,
                  ]}
                  onError={error => console.log('Image Error:', error)}
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

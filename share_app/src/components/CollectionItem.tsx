import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

const CollectionItem: React.FC<{
  name: string;
  lastImage: string;
  onPress: () => void;
}> = ({name, lastImage, onPress}) => {
  return (
    <TouchableOpacity style={styles.collectionItem} onPress={onPress}>
      <Image source={{uri: lastImage}} style={styles.collectionImage} />
      <Text style={styles.collectionName}>{name}</Text>
    </TouchableOpacity>
  );
};
export default CollectionItem;

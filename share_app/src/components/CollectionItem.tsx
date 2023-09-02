import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

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

const styles = StyleSheet.create({
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  collectionImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  collectionName: {
    fontSize: 16,
  },
});

export default CollectionItem;

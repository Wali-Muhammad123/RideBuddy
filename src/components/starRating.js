import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ maxStars, rating, onStarPress }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(maxStars)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => onStarPress(index + 1)}>
          <Icon
            name="star"
            size={50}
            color="#FFD700" // Yellow color for filled stars
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default StarRating;

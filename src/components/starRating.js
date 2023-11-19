import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const StarRating = ({ maxStars, rating, onStarPress }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(maxStars)].map((_, index) => {
        const isSelected = index < rating; // Check if star should be selected
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onStarPress(index + 1)}
            style={{ padding: 5 }} // Add padding for tappable area
          >
            <Icon
              name={isSelected ? "star" : "star-o"} // "star" for selected, "star-o" for unselected
              size={50}
              color={isSelected ? "#FFD700" : "#CCCCCC"} // Golden color for selected, grey for unselected
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StarRating;


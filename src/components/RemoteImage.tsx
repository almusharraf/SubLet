import React, { useState } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface RemoteImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const RemoteImage = ({ uri, style }: RemoteImageProps) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return null; // Return nothing if image fails to load
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      onError={() => setError(true)}
      resizeMode="cover"
    />
  );
}; 
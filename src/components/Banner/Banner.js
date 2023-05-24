import styles from './style';
import {View, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import React from 'react';

let {height, width} = Dimensions.get('window');

const ImageSlider = ({banners, path}) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const _renderContent = campaign => {
    const {id, img} = campaign.item;
    return <Image source={{uri: img}} style={styles.banner} key={id} />;
  };

  return (
    <View style={styles.mainView}>
      <Carousel
        layout={'default'}
        data={banners}
        sliderWidth={width}
        enableSnap={true}
        itemWidth={width - 20}
        renderItem={_renderContent}
        onSnapToItem={index => setActiveSlide(index)}
        autoplay={true}
        loop={true}
      />
      {/* <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeSlide}
        // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'black'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
    </View>
  );
};
export default ImageSlider;

import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from'./style'

const Slider = (props) => {
    const {item}=props;
    return (
        <View style={[styles.banner, {backgroundColor:item?.backgroundColor}]}>
            <View style={styles.bannerItem}>
                <View style={styles.chipContainer}>
                    <Text style={styles.chips}>{item?.chips}</Text>
                </View>
                <Image source={item?.image} style={styles.bannerImg}/>
            </View>
            <View >
                <Text style={styles.bannerTitle}> {item?.title} </Text>
                <Text style={styles.bannerSubTiitle}> {item?.subtitle} </Text>

            </View>
        </View>
    )
}

export default Slider

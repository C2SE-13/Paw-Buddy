/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Category from './Category';
import {RowComponent, TextComponent} from '../../../components';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';

const data = [
  ...Array.from([...Array(10).keys()]).map((el, index) => ({
    id: index,
    name: `doctor-${index}`,
    star: index,
    view: index,
    description: `desc-${index}`,
    iamge: require('../../../assets/imgs/Default.png'),
  })),
];

const Recommendation = () => {
  return (
    <SafeAreaView style={[globalStyles.container, {gap: 16, marginBottom: 12}]}>
      <Category text="Recommendation Doctor" onPress={() => {}} />
      <View style={{gap: 16}}>
        {data.map(item => (
          <TouchableOpacity key={item.id}>
            <RowComponent styles={{padding: 8}} gap={16}>
              <Image
                source={item.iamge}
                style={{
                  width: 110,
                  height: 110,
                  objectFit: 'cover',
                  borderRadius: 12,
                }}
              />
              <View style={{flex: 1, gap: 8}}>
                <TextComponent
                  text={item.name}
                  title
                  size={16}
                  font={fontFamilies['inter-bold']}
                  color={colors['text-100']}
                />
                <RowComponent justify="flex-start" gap={8}>
                  <TextComponent text="General" styles={styles.textLocal} />
                  <TextComponent text="|" styles={styles.textLocal} />
                  <TextComponent
                    text={item.description}
                    styles={styles.textLocal}
                  />
                </RowComponent>
                <RowComponent justify="flex-start" gap={4}>
                  <TextComponent
                    text={item.star.toString()}
                    styles={styles.textLocal}
                  />
                  <TextComponent
                    text={`(${item.view} reviews)`}
                    styles={styles.textLocal}
                  />
                </RowComponent>
              </View>
            </RowComponent>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textLocal: {
    fontSize: 12,
    color: colors['text-body'],
    fontFamily: fontFamilies['inter-medium'],
  },
});

export default Recommendation;

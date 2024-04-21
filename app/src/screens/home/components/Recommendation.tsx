/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Category from './Category';
import {RowComponent, TextComponent} from '../../../components';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {apiGetDoctors} from '../../../apis';
import {IDoctors} from '../../../utils/interface';

const Recommendation = () => {
  const [dataDoctor, setDataDoctor] = useState<IDoctors[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      const response: any = await apiGetDoctors({
        limit: 10,
        page: 0,
        roleId: 2,
      });
      if (response.success) {
        setDataDoctor(response.data);
      }
    };

    getDoctors();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.container, {gap: 16, marginBottom: 12}]}>
      <Category text="Recommendation Doctor" onPress={() => {}} />
      {dataDoctor.length > 0 && (
        <FlatList
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          data={dataDoctor}
          renderItem={({item}) => (
            <TouchableOpacity>
              <RowComponent styles={{padding: 8}} gap={16}>
                <Image
                  source={
                    item.avatar
                      ? {uri: item.avatar}
                      : require('../../../assets/imgs/Activities.png')
                  }
                  style={{
                    width: 110,
                    height: 110,
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
                <View style={{flex: 1, gap: 8}}>
                  <TextComponent
                    text={item.fullName}
                    title
                    size={16}
                    font={fontFamilies['inter-bold']}
                    color={colors['text-100']}
                  />
                  <RowComponent justify="flex-start" gap={4}>
                    <TextComponent
                      text={item.roleData.name_role}
                      styles={[styles.textLocal, {textTransform: 'capitalize'}]}
                    />
                    <TextComponent text="|" styles={styles.textLocal} />
                    <TextComponent
                      text={item.phone}
                      styles={styles.textLocal}
                    />
                  </RowComponent>
                  <TextComponent
                    text={`Address: ${item.address}`}
                    styles={styles.textLocal}
                  />
                </View>
              </RowComponent>
            </TouchableOpacity>
          )}
        />
      )}
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

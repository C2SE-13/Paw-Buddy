/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {
  ButtonComponent,
  HeaderBookDate,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {SearchProfileIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';
import {apiGetRecords} from '../../apis';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import moment from 'moment';
import {fontFamilies} from '../../constants/fontFamilies';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

interface Props {
  route: RouteProp<MainStackParamList, 'HealthCardScreen'>;
}

interface IRecord {
  id: number;
  pet_id: number;
  vet_id: number;
  vetData: {
    avatar: string;
    fullName: string;
    phone: string;
  };
  bookingData: {
    date: string;
    start_time: string;
    end_time: string;
    note: string;
  };
  vaccineData: {
    name_vaccine: string;
    note: string;
    number_of_doses: number;
    type_disease: string;
    vaccination_schedule: string;
    side_effect: string;
    contraindication: string;
  } | null;
  medicationsData: {
    medicineData: {
      contraindication: string;
      guide: string;
      indication: string;
      intended_use: string;
      name_medicine: string;
      side_effect: string;
      unit: string;
    };
  }[];
  diagnosis: string;
  symptoms: string;
  treatment_plan: string;
  exam_date: string;
}

const HealthCardScreen = ({route}: Props) => {
  const {petId} = route.params;
  const [search, setSearch] = useState('');
  const [data, setData] = useState<{[key: string]: IRecord[] | undefined}>({});
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [chosen, setChosen] = useState<IRecord | null>(null);

  const getRecord = async () => {
    const response: any = await apiGetRecords({statuses: 'completed'});

    if (response.success) {
      const petRecord = response.data.filter(
        (item: IRecord) => item.pet_id === petId,
      );
      const newData = petRecord.reduce((acc: any, obj: IRecord) => {
        const year = moment(obj.exam_date).year();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(obj);
        return acc;
      }, {});

      setData(newData);
    }
  };

  useEffect(() => {
    getRecord();
  }, [petId]);

  return (
    <View style={{flex: 1, backgroundColor: colors.lightBackground}}>
      <HeaderBookDate title="Record" subTitle="Pet Profile" />
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
        }}>
        <InputComponent
          value={search}
          onChange={setSearch}
          placeholder="Search by record"
          iconLeft={<SearchProfileIcon />}
          styles={{
            backgroundColor: colors['background-white'],
          }}
          allowClear
        />
      </View>
      <ScrollView
        contentContainerStyle={{gap: 24}}
        style={{
          paddingHorizontal: 22,
          paddingVertical: 10,
          marginVertical: 2,
        }}>
        {Object.keys(data)
          .sort((a: any, b: any) => b - a)
          .map(year => (
            <View style={{gap: 16}} key={year}>
              <TextComponent
                text={year}
                size={16}
                title
                color={colors['grey-800']}
              />
              <View style={{gap: 16}}>
                {data[year]?.map((item: IRecord) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      actionSheetRef.current?.show();
                      setChosen(item);
                    }}
                    style={[
                      shadowStyle,
                      shadowStyle2,
                      {
                        borderRadius: 14,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        backgroundColor: colors['background-white'],
                        marginHorizontal: 2,
                        marginVertical: 2,
                        gap: 2,
                      },
                    ]}>
                    <TextComponent
                      text={item.vetData.fullName ?? ''}
                      color={colors['grey-800']}
                      size={14}
                      title
                    />
                    <RowComponent justify="flex-start">
                      <TextComponent
                        text={`${moment(item.bookingData.date).format(
                          'DD.MM.YYYY',
                        )} `}
                        size={14}
                        font={fontFamilies['inter-medium']}
                      />
                    </RowComponent>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
      </ScrollView>
      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            height: Dimensions.get('screen').height / 1.3,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: colors['background-white'],
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SpaceComponent height={24} />
            <View style={{gap: 14}}>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Date"
                  size={14}
                  font={fontFamilies['inter-medium']}
                  color={colors['grey-800']}
                />
              </RowComponent>
              <TextComponent
                styles={{
                  paddingLeft: 12,
                  borderLeftWidth: 1,
                  borderColor: colors['grey-150'],
                }}
                text={
                  moment(chosen?.bookingData.date).format('DD.MM.YYYY') ?? ''
                }
                size={14}
                title
                color={colors['grey-800']}
              />
            </View>
            <SpaceComponent height={24} />
            <View style={{gap: 14}}>
              <TextComponent
                text="Time"
                size={14}
                font={fontFamilies['inter-medium']}
                color={colors['grey-800']}
              />
              <RowComponent justify="space-between">
                <View
                  style={{
                    paddingLeft: 12,
                    borderLeftWidth: 1,
                    borderColor: colors['grey-150'],
                    gap: 2,
                    width: '50%',
                  }}>
                  <TextComponent
                    text={'Register Time'}
                    size={14}
                    color={colors['grey-700']}
                  />
                  <TextComponent
                    text={chosen?.bookingData.start_time ?? ''}
                    size={14}
                    title
                    color={colors['grey-800']}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: 12,
                    borderLeftWidth: 1,
                    borderColor: colors['grey-150'],
                    gap: 2,
                    width: '50%',
                  }}>
                  <TextComponent
                    text={'Finish Time'}
                    size={14}
                    color={colors['grey-700']}
                  />
                  <TextComponent
                    text={chosen?.bookingData.end_time ?? ''}
                    size={14}
                    title
                    color={colors['grey-800']}
                  />
                </View>
              </RowComponent>
            </View>
            <SpaceComponent height={24} />
            <View style={{gap: 14}}>
              <TextComponent
                text="Veterinarian"
                size={14}
                font={fontFamilies['inter-medium']}
                color={colors['grey-800']}
              />
              <RowComponent
                justify="flex-start"
                gap={10}
                styles={{
                  paddingVertical: 13,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderRadius: 14,
                  borderColor: colors['grey-150'],
                }}>
                <Image
                  resizeMode="cover"
                  source={{uri: chosen?.vetData.avatar}}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 54,
                  }}
                />
                <View
                  style={{
                    gap: 2,
                  }}>
                  <TextComponent
                    text={chosen?.vetData.fullName ?? ''}
                    size={14}
                    title
                    color={colors['grey-800']}
                  />
                  <TextComponent
                    text={`Phone: ${chosen?.vetData.phone}`}
                    size={14}
                    color={colors['grey-600']}
                  />
                </View>
              </RowComponent>
            </View>
            <SpaceComponent height={24} />
            <View style={{gap: 14}}>
              <TextComponent
                text="Diagnosis"
                size={14}
                font={fontFamilies['inter-medium']}
                color={colors['grey-800']}
              />
              <TextComponent
                styles={{
                  paddingLeft: 12,
                  borderLeftWidth: 1,
                  borderColor: colors['grey-150'],
                }}
                text={chosen?.diagnosis ?? ''}
                size={14}
                title
                color={colors['grey-800']}
              />
            </View>
            <SpaceComponent height={24} />
            <View style={{gap: 14}}>
              <TextComponent
                text="Symptoms"
                size={14}
                font={fontFamilies['inter-medium']}
                color={colors['grey-800']}
              />
              <TextComponent
                styles={{
                  paddingLeft: 12,
                  borderLeftWidth: 1,
                  borderColor: colors['grey-150'],
                }}
                text={chosen?.symptoms ?? ''}
                size={14}
                title
                color={colors['grey-800']}
              />
            </View>
            <SpaceComponent height={24} />
            <View style={{gap: 14}}>
              <TextComponent
                text="Treatment Plan"
                size={14}
                font={fontFamilies['inter-medium']}
                color={colors['grey-800']}
              />
              <TextComponent
                styles={{
                  paddingLeft: 12,
                  borderLeftWidth: 1,
                  borderColor: colors['grey-150'],
                }}
                text={chosen?.treatment_plan ?? ''}
                size={14}
                title
                color={colors['grey-800']}
              />
            </View>
            <SpaceComponent height={24} />
            {chosen && chosen.medicationsData.length > 0 && (
              <Fragment>
                <View style={{gap: 14}}>
                  <TextComponent
                    text={'Medications'}
                    size={14}
                    font={fontFamilies['inter-medium']}
                    color={colors['grey-800']}
                  />
                  <View style={{gap: 12}}>
                    {chosen.medicationsData.map(el => (
                      <View
                        style={{
                          paddingVertical: 13,
                          paddingHorizontal: 16,
                          borderWidth: 1,
                          borderRadius: 14,
                          borderColor: colors['grey-150'],
                          gap: 8,
                        }}>
                        <RowComponent justify="space-between">
                          <View
                            style={{
                              width: '50%',
                            }}>
                            <TextComponent
                              text={'Name'}
                              size={14}
                              color={colors['grey-700']}
                            />
                            <TextComponent
                              text={el.medicineData.name_medicine ?? ''}
                              size={14}
                              title
                              color={colors['grey-800']}
                            />
                          </View>
                          <View
                            style={{
                              paddingLeft: 12,
                              borderLeftWidth: 1,
                              borderColor: colors['grey-150'],
                              gap: 2,
                              width: '50%',
                            }}>
                            <TextComponent
                              text={'Unit'}
                              size={14}
                              color={colors['grey-700']}
                            />
                            <TextComponent
                              text={el.medicineData.unit ?? ''}
                              size={14}
                              title
                              color={colors['grey-800']}
                            />
                          </View>
                        </RowComponent>
                        <View>
                          <TextComponent
                            text={'contraindication'}
                            size={14}
                            color={colors['grey-700']}
                          />
                          <TextComponent
                            text={el.medicineData.contraindication ?? ''}
                            size={14}
                            title
                            color={colors['grey-800']}
                            align="justify"
                          />
                        </View>
                        <View>
                          <TextComponent
                            text={'Guide'}
                            size={14}
                            color={colors['grey-700']}
                          />
                          <TextComponent
                            text={el.medicineData.guide ?? ''}
                            size={14}
                            title
                            color={colors['grey-800']}
                            align="justify"
                          />
                        </View>
                        <View>
                          <TextComponent
                            text={'Side effect'}
                            size={14}
                            color={colors['grey-700']}
                          />
                          <TextComponent
                            text={el.medicineData.side_effect ?? ''}
                            size={14}
                            title
                            color={colors['grey-800']}
                            align="justify"
                          />
                        </View>
                        <View>
                          <TextComponent
                            text={'Intended use'}
                            size={14}
                            color={colors['grey-700']}
                          />
                          <TextComponent
                            text={el.medicineData.intended_use ?? ''}
                            size={14}
                            title
                            color={colors['grey-800']}
                            align="justify"
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                <SpaceComponent height={24} />
              </Fragment>
            )}
            {chosen && chosen.vaccineData && (
              <Fragment>
                <View style={{gap: 14}}>
                  <TextComponent
                    text={'Vaccine'}
                    size={14}
                    font={fontFamilies['inter-medium']}
                    color={colors['grey-800']}
                  />
                  <RowComponent justify="space-between">
                    <View
                      style={{
                        paddingLeft: 12,
                        borderLeftWidth: 1,
                        borderColor: colors['grey-150'],
                        gap: 2,
                        width: '50%',
                      }}>
                      <TextComponent
                        text={'Name'}
                        size={14}
                        color={colors['grey-700']}
                      />
                      <TextComponent
                        text={chosen?.vaccineData.name_vaccine ?? ''}
                        size={14}
                        title
                        color={colors['grey-800']}
                      />
                    </View>
                    <View
                      style={{
                        paddingLeft: 12,
                        borderLeftWidth: 1,
                        borderColor: colors['grey-150'],
                        gap: 2,
                        width: '50%',
                      }}>
                      <TextComponent
                        text={'Number of does'}
                        size={14}
                        color={colors['grey-700']}
                      />
                      <TextComponent
                        text={
                          chosen?.vaccineData.number_of_doses.toString() ?? ''
                        }
                        size={14}
                        title
                        color={colors['grey-800']}
                      />
                    </View>
                  </RowComponent>
                  <RowComponent justify="space-between">
                    <View
                      style={{
                        paddingLeft: 12,
                        borderLeftWidth: 1,
                        borderColor: colors['grey-150'],
                        gap: 2,
                        width: '50%',
                      }}>
                      <TextComponent
                        text={'Type disease'}
                        size={14}
                        color={colors['grey-700']}
                      />
                      <TextComponent
                        text={chosen?.vaccineData.type_disease ?? ''}
                        size={14}
                        title
                        color={colors['grey-800']}
                      />
                    </View>
                    <View
                      style={{
                        paddingLeft: 12,
                        borderLeftWidth: 1,
                        borderColor: colors['grey-150'],
                        gap: 2,
                        width: '50%',
                      }}>
                      <TextComponent
                        text={'Contraindication'}
                        size={14}
                        color={colors['grey-700']}
                      />
                      <TextComponent
                        text={chosen?.vaccineData.contraindication ?? ''}
                        size={14}
                        title
                        color={colors['grey-800']}
                      />
                    </View>
                  </RowComponent>
                  <View
                    style={{
                      paddingLeft: 12,
                      borderLeftWidth: 1,
                      borderColor: colors['grey-150'],
                      gap: 2,
                    }}>
                    <TextComponent
                      text={'Side effect'}
                      size={14}
                      color={colors['grey-700']}
                    />
                    <TextComponent
                      text={chosen?.vaccineData.side_effect ?? ''}
                      size={14}
                      title
                      color={colors['grey-800']}
                      align="justify"
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 12,
                      borderLeftWidth: 1,
                      borderColor: colors['grey-150'],
                      gap: 2,
                    }}>
                    <TextComponent
                      text={'Vaccination Schedule'}
                      size={14}
                      color={colors['grey-700']}
                    />
                    <TextComponent
                      text={chosen?.vaccineData.vaccination_schedule ?? ''}
                      size={14}
                      title
                      color={colors['grey-800']}
                      align="justify"
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 12,
                      borderLeftWidth: 1,
                      borderColor: colors['grey-150'],
                      gap: 2,
                    }}>
                    <TextComponent
                      text={'Note'}
                      size={14}
                      color={colors['grey-700']}
                    />
                    <TextComponent
                      text={chosen?.vaccineData.note ?? ''}
                      size={14}
                      title
                      color={colors['grey-800']}
                      align="justify"
                    />
                  </View>
                </View>
                <SpaceComponent height={24} />
              </Fragment>
            )}
          </ScrollView>
          <ButtonComponent
            styles={{
              marginTop: 12,
            }}
            text="Done"
            type="primary"
            size="large"
            radius={14}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}
          />
        </View>
      </ActionSheet>
    </View>
  );
};

export default HealthCardScreen;

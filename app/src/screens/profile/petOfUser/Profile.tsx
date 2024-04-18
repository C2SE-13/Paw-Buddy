/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {IPet} from '../../../utils/interface';
import {globalStyles} from '../../../styles/globalStyles';
import {
  CircleComponent,
  DarkDecoEllipses,
  RowComponent,
  TextComponent,
} from '../../../components';
import {colors} from '../../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';
import {ArrowRight} from '../../../assets/icons';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppDispatch} from '../../../redux/store';
import {setPet} from '../../../redux/user/userSlice';
import withBaseComponent from '../../../hocs/withBaseComponent';

interface IPageProps {
  navigation: any;
  petData: IPet[];
  dispatch: AppDispatch;
}

interface ICardProps {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

interface ICardPetProps {
  item: IPet;
  index: number;
  length: number;
  maxVisibleItem: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDataPet: React.Dispatch<React.SetStateAction<IPet[]>>;
  dataPet: IPet[];
}

const CardVertical = (props: ICardProps) => {
  const {children, styles, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        shadowStyle,
        shadowStyle2,
        {
          backgroundColor: colors['background-white'],
          width: 155,
          height: 168,
          borderRadius: 14,
          paddingVertical: 18,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: colors['grey-100'],
          overflow: 'hidden',
        },
        styles,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const CardPet = (props: ICardPetProps) => {
  const {
    item,
    index,
    length,
    maxVisibleItem,
    currentIndex,
    animatedValue,
    setCurrentIndex,
    setDataPet,
    dataPet,
  } = props;
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const pan = Gesture.Pan()
    .onUpdate(e => {
      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;
      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1],
        );
      }
    })
    .onEnd(e => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setCurrentIndex)(currentIndex + 1);
            runOnJS(setDataPet)([...dataPet, dataPet[currentIndex]]);
          });
          animatedValue.value = withTiming(currentIndex + 1);
        } else {
          translateX.value = withTiming(0, {duration: 500});
          animatedValue.value = withTiming(currentIndex);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
    );

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [24, 0],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1],
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItem,
      [index, index + 1],
      [0, 1],
    );

    return {
      transform: [
        {translateX: translateX.value},
        {
          scale: currentItem ? 1 : scale,
        },
        {
          translateY: currentItem ? 0 : translateY,
        },
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg',
        },
      ],
      opacity: index < maxVisibleItem + currentIndex ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          globalStyles['w-100'],
          {
            position: 'absolute',
            zIndex: length - index,
          },
          {paddingHorizontal: 24},
          animatedStyle,
        ]}>
        <View
          style={[
            shadowStyle,
            shadowStyle2,
            {
              height: 130,
              backgroundColor: colors['blue-500'],
              borderRadius: 14,
              paddingHorizontal: 20,
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: colors['grey-100'],
            },
          ]}>
          <View style={{gap: 4, width: 150}}>
            <TextComponent
              text={item.name_pet ?? ''}
              title
              size={20}
              color={colors['background-white']}
            />
            <RowComponent justify="flex-start" gap={2}>
              <TextComponent text="Dog" size={14} color={colors['grey-150']} />
              <TextComponent text="|" size={14} color={colors['grey-150']} />
              <TextComponent
                text={item.breed ?? ''}
                size={14}
                color={colors['grey-150']}
              />
            </RowComponent>
          </View>
          <Image
            source={{uri: item.photo ?? ''}}
            style={{
              width: 100,
              height: 100,
              zIndex: 100,
              borderRadius: 100,
              position: 'absolute',
              top: 15,
              bottom: 15,
              right: 20,
            }}
          />
          <DarkDecoEllipses right={-30} />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const Profile = ({navigation, dispatch, petData}: IPageProps) => {
  const [dataPet, setDataPet] = useState([...petData]);
  const MAXITEM = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    petData.length > 0 && dispatch(setPet({petActive: dataPet[currentIndex]}));
  }, [currentIndex, dataPet, dispatch, petData]);

  useEffect(() => {
    petData.length > 0 && setDataPet([...petData]);
  }, [petData]);

  return (
    <ScrollView
      style={[globalStyles.container]}
      showsVerticalScrollIndicator={false}>
      <View style={{paddingVertical: 24}}>
        <View style={{gap: 16, paddingBottom: 24}}>
          <RowComponent
            styles={{paddingHorizontal: 24}}
            justify="flex-start"
            gap={6}>
            <TextComponent
              text="Active pet profiles"
              title
              color={colors['grey-800']}
              size={16}
            />
            <View
              style={[
                globalStyles.center,
                {
                  width: 25,
                  height: 28,
                  backgroundColor: colors['grey-150'],
                  borderRadius: 10,
                },
              ]}>
              <TextComponent
                text={`${petData.length | 0}`}
                title
                size={14}
                color={colors['grey-700']}
              />
            </View>
          </RowComponent>
          <View style={{height: 160}}>
            {dataPet.map((item, index) => {
              if (index > currentIndex + MAXITEM || index < currentIndex) {
                return null;
              }

              return (
                <CardPet
                  key={item.id}
                  item={item}
                  index={index}
                  length={petData.length}
                  maxVisibleItem={MAXITEM}
                  currentIndex={currentIndex}
                  animatedValue={animatedValue}
                  setCurrentIndex={setCurrentIndex}
                  setDataPet={setDataPet}
                  dataPet={dataPet}
                />
              );
            })}
          </View>
        </View>
        <RowComponent gap={16}>
          <CardVertical styles={[{justifyContent: 'space-between'}]}>
            <View>
              <TextComponent
                title
                text="Share profile"
                color={colors['grey-800']}
                size={16}
              />
              <TextComponent
                text="Easily share your pet’s profile or add a new one"
                color={colors['grey-600']}
                size={12}
              />
            </View>
            <View style={{alignItems: 'flex-end', padding: 9}}>
              <ArrowRight />
            </View>
          </CardVertical>
          <CardVertical
            styles={{
              position: 'relative',
              justifyContent: 'flex-end',
            }}>
            <CircleComponent
              size={122}
              color="transparent"
              styles={{
                borderWidth: 1,
                borderColor: colors['grey-150'],
                position: 'absolute',
                top: -24,
                right: 15,
                left: 15,
              }}>
              <CircleComponent
                size={80}
                color={colors['orange-100']}
                styles={{position: 'relative'}}>
                <Image
                  source={require('../../../assets/imgs/Nutrition.png')}
                  style={{
                    width: 64,
                    height: 74,
                    position: 'absolute',
                    bottom: -14,
                  }}
                />
              </CircleComponent>
            </CircleComponent>
            <TextComponent
              title
              text="Nutrition"
              color={colors['grey-800']}
              size={16}
            />
          </CardVertical>
          <CardVertical
            styles={{
              position: 'relative',
              justifyContent: 'flex-end',
            }}>
            <CircleComponent
              size={122}
              color="transparent"
              styles={{
                borderWidth: 1,
                borderColor: colors['grey-150'],
                position: 'absolute',
                top: -24,
                right: 15,
                left: 15,
                overflow: 'hidden',
              }}>
              <CircleComponent
                size={80}
                color={colors['lightGreen-100']}
                styles={{position: 'relative'}}>
                <Image
                  source={require('../../../assets/imgs/HealthCard.png')}
                  style={{
                    width: 88,
                    height: 90,
                    position: 'absolute',
                    objectFit: 'cover',
                    bottom: -19,
                  }}
                />
              </CircleComponent>
            </CircleComponent>
            <TextComponent
              title
              text="Health Card"
              color={colors['grey-800']}
              size={16}
            />
          </CardVertical>
          <CardVertical
            styles={{
              position: 'relative',
              justifyContent: 'flex-end',
            }}>
            <CircleComponent
              size={122}
              color="transparent"
              styles={{
                borderWidth: 1,
                borderColor: colors['grey-150'],
                position: 'absolute',
                top: -24,
                right: 15,
                left: 15,
              }}>
              <CircleComponent
                size={80}
                color={colors['purple-100']}
                styles={{position: 'relative'}}>
                <Image
                  source={require('../../../assets/imgs/Activities.png')}
                  style={{
                    width: 88,
                    height: 78,
                    position: 'absolute',
                    bottom: -14,
                  }}
                />
              </CircleComponent>
            </CircleComponent>
            <TextComponent
              title
              text="Activities"
              color={colors['grey-800']}
              size={16}
            />
          </CardVertical>
        </RowComponent>
      </View>
    </ScrollView>
  );
};

export default withBaseComponent(Profile);

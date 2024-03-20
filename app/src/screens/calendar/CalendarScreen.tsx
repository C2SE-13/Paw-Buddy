import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {HeaderTitle, SpaceComponent, TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';

const fakeData = [
  {
    service: 'Microchip Implantation',
    dateString: '2024-03-01',
    time: '09:00',
    address: '123 Lý Thường Kiệt, Huế',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: true,
    med: true,
  },
  {
    service: 'Dental Care',
    dateString: '2024-03-03',
    time: '09:00',
    address: '789 Lê Lợi, Đà Nẵng',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: true,
    med: false,
  },
  {
    service: 'Annual Check-Up',
    dateString: '2024-03-10',
    time: '09:00',
    address: '123 Nguyễn Trãi, Hà Nội',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: false,
  },
  {
    service: 'Lab Tests',
    dateString: '2024-03-05',
    time: '09:00',
    address: '678 Lê Văn Sỹ, Sài Gòn',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: false,
  },
  {
    service: 'Vaccination Clinic',
    dateString: '2024-03-04',
    time: '09:00',
    address: '456 Nguyễn Du, Sài Gòn',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: true,
  },
  {
    service: 'Surgery',
    dateString: '2024-03-06',
    time: '09:00',
    address: '101 Nam Kỳ Khởi Nghĩa, Cần Thơ',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: false,
  },
  {
    service: 'Emergency Services',
    dateString: '2024-03-07',
    time: '09:00',
    address: '234 Nguyễn Bỉnh Khiêm, Hải Phòng',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: false,
  },
  {
    service: 'Nutrition and Diet Counseling',
    dateString: '2024-03-08',
    time: '09:00',
    address: '345 Kim Mã, Hà Nội',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: true,
  },
  {
    service: 'Senior Pet Care',
    dateString: '2024-03-09',
    time: '09:00',
    address: '456 Nguyễn Thái Học, Tuyên Quang',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: true,
    med: false,
  },
  {
    service: 'Parasite Control',
    dateString: '2024-03-12',
    time: '09:00',
    address: '456 Trần Hưng Đạo, Đà Lạt',
    pet_img:
      'https://lolipet.net/wp-content/uploads/70f1d4c4eb7a0bed2820c4b3e6b987cc.jpg',
    spa: false,
    med: false,
  },
];

type MarkedDateEntry = {
  selected?: boolean;
  selectedColor?: string;
  dots?: {key: string; color: string; selectedDotColor: string}[];
};

const CalendarScreen = () => {
  const [selected, setSelected] = useState<string>('');

  const processDate = () => {
    const spa = {
      key: 'spa',
      color: colors['fill-red'],
      selectedDotColor: colors['fill-red'],
    };
    const med = {
      key: 'med',
      color: colors['fill-green'],
      selectedDotColor: colors['fill-green'],
    };

    const markedDates: Record<string, MarkedDateEntry> = {
      [selected]: {
        selected: true,
        selectedColor: colors['primary-100'],
      },
    };

    fakeData.forEach(event => {
      const dots: {key: string; color: string; selectedDotColor: string}[] = [];
      if (event.spa) dots.push(spa);
      if (event.med) dots.push(med);

      if (markedDates[event.dateString]) {
        markedDates[event.dateString] = {
          ...markedDates[event.dateString],
          dots: [...(markedDates[event.dateString].dots || []), ...dots],
        };
      } else {
        markedDates[event.dateString] = {dots};
      }
    });
    return markedDates;
  };

  return (
    <View style={{height: '100%', flexDirection: 'column'}}>
      <View style={styles.calendarContainer}>
        <HeaderTitle
          title="Calender"
          font={fontFamilies['inter-bold']}
          size={20}
          color={colors['text-100']}
        />
        <Calendar
          onDayPress={day => setSelected(day.dateString)}
          markingType="multi-dot"
          markedDates={processDate()}
        />
      </View>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <TextComponent
          text="Upcoming events"
          size={16}
          font={fontFamilies['inter-bold']}
          styles={{paddingBottom: 10, paddingTop: 20}}
          color={colors['text-100']}
        />
        <ScrollView>
          {fakeData.map((data, i) => {
            return (
              <View key={i}>
                <SpaceComponent height={10} />
                <TouchableOpacity style={styles.eventContainer}>
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={{uri: data.pet_img}}
                      width={45}
                      height={45}
                      style={styles.petAvt}
                    />
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 10}}>
                    <TextComponent
                      text={data.service}
                      size={14}
                      font={fontFamilies['inter-semibold']}
                      color={colors['text-100']}
                    />
                    <SpaceComponent height={5} />
                    <TextComponent
                      text={data.address}
                      size={12}
                      font={fontFamilies['inter-medium']}
                      color={colors['text-60']}
                    />
                  </View>
                  <View>
                    <TextComponent
                      text={data.time}
                      size={12}
                      font={fontFamilies['inter-medium']}
                      color={colors['text-100']}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <SpaceComponent height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 20,
    backgroundColor: colors['background-white'],
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  eventContainer: {
    backgroundColor: colors['background-white'],
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
  },
  petAvt: {
    borderRadius: 1000,
    borderColor: colors['primary-60'],
    borderWidth: 2,
  },
});

export default CalendarScreen;

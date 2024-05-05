import {Modal, View} from 'react-native';
import {ButtonComponent, SpaceComponent, TextComponent} from '..';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

type IProps = {
  text: string;
  visible: boolean;
  handleSubmit: () => void;
  setVisible: (value: boolean) => void;
};

const ModalComponent: React.FC<IProps> = ({
  visible,
  text,
  handleSubmit,
  setVisible,
}) => {
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: colors['grey-1000'],
            opacity: 0.6,
            position: 'absolute',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <SpaceComponent width={10} />
          <View
            style={{
              backgroundColor: colors['background-white'],
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
              flex: 1,
            }}>
            <SpaceComponent height={10} />
            <TextComponent
              text={text}
              font={fontFamilies['inter-bold']}
              size={20}
              color={colors['text-100']}
            />
            <SpaceComponent height={20} />
            <ButtonComponent
              text="Update"
              type="primary"
              size={'large'}
              onPress={handleSubmit}
            />
            <SpaceComponent height={10} />
            <ButtonComponent
              text="Cancel"
              type="secondary"
              size={'large'}
              onPress={() => setVisible(false)}
            />
          </View>
          <SpaceComponent width={10} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

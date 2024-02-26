import React, { useEffect } from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { colors, dWidth } from '@/constants';
import CustomCardCarousel from '@/components/home/CustomCardCarousel';
import logoImage from '@/assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotionsThunk, getTagsThunk } from '@/store/reducers';
import { FlatList } from 'react-native';
import { RootState } from '@/store';
import { IPromotionList, ITag } from '@/types/dataTypes';
import Icon from '@/components/shared/Icons';


const HomeScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const tagList: ITag[] = useSelector((state: RootState) => state.globalReducer.tagList);
  const promotionList: IPromotionList[] = useSelector((state: RootState) => state.globalReducer.promotionList);

  useEffect(() => {
    getTags();
    getPromotions();
  }, []);

  const getTags = () => {
    dispatch<any>(getTagsThunk());
  }
  const getPromotions = () => {
    dispatch<any>(getPromotionsThunk());
  }



  const rightComponent = () => {
    return (
      <GenericView flexDirection='row'>
        <GenericView center >
          <GenericTouchableOpacity
            onPress={() => { }}
            borderRadius={30}
            backgroundColor={'red'}
            padding={dWidth * .025}
          >
            <GenericText color={colors.white} bold>Giriş Yap</GenericText>
          </GenericTouchableOpacity>
        </GenericView>
        <GenericView center >
          <Icon name='person-circle' size={40} type='Ionicons' color={colors.black} />
        </GenericView>
      </GenericView>
    )
  }

  const leftComponent = () => {
    return (
      <GenericView>
        <GenericImage source={logoImage} width={dWidth * .3} height={dWidth * .3} resizeMode='contain' />
      </GenericView>
    )
  }

  return (
    <SafeAreaWrapper>
      <AppHeader rightComponent={rightComponent()} leftComponent={leftComponent()} />
      <GenericView flex={1} >
        <GenericView marginTop={dWidth * .025} marginBottom={dWidth * .025} >
          {/* tag list */}
          <FlatList
            horizontal
            data={tagList}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item, index }) => (
              <GenericView flexDirection='row' borderWidth={2}
                borderColor={index === 1 ? 'red' : colors.gray}
                borderRadius={10} padding={dWidth * .0125} margin={dWidth * .0125} center>
                <GenericView>
                  <GenericImage borderRadius={12} source={{ uri: item.IconUrl }} width={dWidth * .08} height={dWidth * .08} />
                </GenericView>
                <GenericView center marginLeft={dWidth * .025} marginRight={dWidth * .025}>
                  <GenericText>{item.Name}</GenericText>
                </GenericView>
              </GenericView>
            )}
          />
        </GenericView>
        <GenericView marginTop={dWidth * .025} >
          {/* carousel */}
          <CustomCardCarousel
            data={promotionList}
            autoPlay={true}
            pagination={true}
            navigation={navigation}
          />
        </GenericView>

      </GenericView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen; 
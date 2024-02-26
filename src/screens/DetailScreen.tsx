import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { IPromotion } from '@/types/dataTypes';
import { colors, dHeight, dWidth } from '@/constants';
import Icon from '@/components/shared/Icons';



const DetailScreen: React.FC = ({ navigation }: any) => {

    const promotionDetail: IPromotion = useSelector((state: RootState) => state.globalReducer.promotionDetail);


    return (
        <SafeAreaWrapper>
            <GenericView flex={1} >
                <GenericView>
                    <GenericImage
                        source={{ uri: promotionDetail.ImageUrl }}
                        width={dWidth}
                        height={dHeight * .4}
                        resizeMode='cover'
                        borderBottomLeftRadius={80}
                    />
                </GenericView>
                <GenericView padding={dWidth * .025}>
                    <GenericView style={{ marginVertical: dHeight * .025 }} >
                        <GenericText bold fontSize={20}>{promotionDetail.Title.replace(/<\/?[^>]+(>|$)/g, "")}</GenericText>
                    </GenericView>
                    <GenericText>{promotionDetail.Description.replace(/<\/?[^>]+(>|$)/g, "")}</GenericText>
                </GenericView>

                {/* geri düğmesi */}
                <GenericTouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#1d1e1c',
                        borderRadius: 30,
                        padding: 10,
                    }}
                >
                    <Icon name='arrow-back' size={30} type='Ionicons' color={colors.white} />
                </GenericTouchableOpacity>
                {/* icon */}
                <GenericView
                    style={{
                        position: 'absolute',
                        height: 60,
                        width: 60,
                        top: dWidth * .55,
                        left: 5,
                        backgroundColor: 'white',
                        padding: 5,
                        borderRadius: 30,
                    }}
                >
                    <GenericImage
                        borderRadius={12}
                        source={{ uri: promotionDetail.BrandIconUrl }}
                        width={50}
                        height={50}
                    />
                </GenericView>
                {/* tag */}
                <GenericView
                    style={{
                        position: 'absolute',
                        top: dWidth * .6,
                        right: 5,
                        backgroundColor: '#1d1e1c',
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        borderRadius: 30,
                    }}
                    center
                >
                    <GenericText color={colors.white} >son 12 gün</GenericText>
                </GenericView>
                <GenericView
                    position='absolute'
                    style={{
                        bottom: 10,
                    }}
                    marginLeft={dWidth * .025}

                >
                    <GenericTouchableOpacity
                        backgroundColor='red'
                        width={dWidth * .95}
                        borderRadius={30}
                        padding={dWidth * .05}
                        center
                    >
                        <GenericText color={colors.white} bold>Hemen Katıl</GenericText>
                    </GenericTouchableOpacity>
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default DetailScreen; 
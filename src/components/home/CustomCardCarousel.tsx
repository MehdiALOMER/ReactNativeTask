import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, useWindowDimensions, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';
import Pagination from './Pagination';
import { IPromotionList } from '@/types/dataTypes';
import { useDispatch } from 'react-redux';
import { getPromotionDetailThunk } from '@/store/reducers';
import { colors, dWidth } from '@/constants';



// Define the props for the component
interface CustomCardCarouselProps {
    data: IPromotionList[];
    autoPlay: boolean;
    pagination: boolean;
    navigation?: any;
}
interface IPromotionListWithKey extends IPromotionList {
    key: string;
}

const CustomCardCarousel: React.FC<CustomCardCarouselProps> = ({
    data,
    autoPlay,
    pagination,
    navigation,
}) => {
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
    const interval = useRef<number | undefined>(undefined);
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const [newData] = useState<IPromotionListWithKey[]>([
        { key: 'spacer-left' } as IPromotionListWithKey,
        ...data.map(item => ({ ...item, key: `item-${item.Id}` })),
        { key: 'spacer-right' } as IPromotionListWithKey,
    ]);
    const { width } = useWindowDimensions();
    const SIZE = width * 0.7;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        if (isAutoPlay) {
            let _offSet = offSet.value;
            // Explicitly cast the return value of setInterval to number
            interval.current = setInterval(() => {
                if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
                    _offSet = 0;
                } else {
                    _offSet = Math.floor(_offSet + SIZE);
                }
                scrollViewRef.current?.scrollTo({ x: _offSet, animated: true });
            }, 2000) as unknown as number; // Casting to unknown first, then to number
        } else {
            if (interval.current !== undefined) clearInterval(interval.current as unknown as NodeJS.Timeout); // Similarly cast for clearInterval
        }

        return () => {
            if (interval.current !== undefined) clearInterval(interval.current as unknown as NodeJS.Timeout);
        };
    }, [SIZE, isAutoPlay, data.length, offSet.value, scrollViewRef]);

    const dispatch = useDispatch();

    const getPromotionDetail = (id: number) => {
        dispatch<any>(getPromotionDetailThunk({ id, navigation, dispatch }));
    }

    return (
        <View>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onMomentumScrollEnd={(e) => {
                    offSet.value = e.nativeEvent.contentOffset.x;
                    setIsAutoPlay(autoPlay);
                }}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SIZE}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
            >
                {newData.map((item, index) => {
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.8, 1, 0.8],
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });

                    if (!item.ImageUrl) {
                        // Render spacer if there's no image
                        return <View style={{ width: SPACER }} key={item.key} />;
                    }

                    // Render the image and its description
                    return (
                        <View style={{ width: SIZE }} key={item.key}>
                            <Animated.View style={[styles.container, style]}>
                                <Image source={{ uri: item.ImageUrl }} style={styles.image} />
                                {item.SeoName && <Text style={styles.description}>{item.SeoName}</Text>}
                                <Text style={styles.detail}
                                    onPress={() => {
                                        getPromotionDetail(item.Id);
                                    }}
                                >Daha Daha</Text>
                                <View style={styles.icon}>
                                    <Image
                                        source={{ uri: item.BrandIconUrl }}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </View>
                                {/* tag */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: dWidth * .6,
                                        right: 10,
                                        backgroundColor: '#1d1e1c',
                                        paddingVertical: 3,
                                        paddingHorizontal: 9,
                                        borderRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}

                                >
                                    <Text style={{ color: colors.white }} >son 12 gün</Text>
                                </View>
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
            {pagination && <Pagination data={data} x={x} size={SIZE} />}
        </View>
    );
};

export default CustomCardCarousel;

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#edeeef',
        alignItems: 'center',
    },
    image: {
        width: '95%',
        height: undefined,
        top: 5,
        aspectRatio: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 80

    },
    description: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    detail: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    icon: {
        position: 'absolute',
        height: 60,
        width: 60,
        top: 195,
        left: 5,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 30,
    },
});

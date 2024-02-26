import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericView } from '@/assets/css';



const TabScreen: React.FC = ({ navigation }: any) => {
    return (
        <SafeAreaWrapper>
            <GenericView center>
                <GenericText>DAHA CÜZDAN</GenericText>

            </GenericView>
        </SafeAreaWrapper>
    );
};
export default TabScreen; 
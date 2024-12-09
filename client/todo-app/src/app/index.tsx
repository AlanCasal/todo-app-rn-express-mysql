import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from '@/src/components/Loader';

const StartPage = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Loader size={hp(10)} />
		</View>
	);
};

export default StartPage;

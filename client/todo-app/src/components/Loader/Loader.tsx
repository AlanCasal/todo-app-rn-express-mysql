import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Loader = ({ size: height = hp(10) }: { size?: number }) => {
	return (
		<View style={{ height, aspectRatio: 1 }}>
			<LottieView
				style={{ flex: 1 }}
				source={require('@/assets/animations/loadingSpinner.json')}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Loader;

import { jsx as _jsx } from "react/jsx-runtime";
import Animated, { interpolate, useAnimatedProps, } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
const AnimatedSlice = Animated.createAnimatedComponent(Circle);
const AnimatedPieSlice = ({ id, color, progress, outerRadius, innerRadius = 0, startAngle, endAngle, onPress, }) => {
    const radius = outerRadius + innerRadius;
    const circunference = radius * Math.PI;
    const handlePress = () => {
        onPress && id && onPress(id);
    };
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: interpolate(progress.value, [0, 1], [circunference, circunference * (1 - (endAngle - startAngle) / 360)]),
        transform: [
            { translateX: outerRadius * 2 },
            { translateY: outerRadius * 2 },
            { rotate: `${interpolate(progress.value, [0, 1], [0, startAngle])}deg` },
            { translateX: -outerRadius },
            { translateY: -outerRadius },
        ],
    }));
    return (_jsx(AnimatedSlice, { cy: outerRadius, cx: outerRadius, r: radius / 2, fill: 'transparent', stroke: color, strokeWidth: outerRadius - innerRadius, strokeDasharray: circunference, animatedProps: animatedProps, originX: outerRadius, originY: outerRadius, 
        // rotation={startAngle}
        onPress: handlePress }));
};
export default AnimatedPieSlice;

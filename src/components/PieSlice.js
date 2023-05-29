import { jsx as _jsx } from "react/jsx-runtime";
import { Circle } from 'react-native-svg';
const PieSlice = ({ id, color, outerRadius, innerRadius = 0, startAngle, endAngle, onPress, }) => {
    const radius = outerRadius + innerRadius;
    const circunference = radius * Math.PI;
    const handlePress = () => {
        onPress && id && onPress(id);
    };
    return (_jsx(Circle, { cy: outerRadius, cx: outerRadius, r: radius / 2, fill: 'transparent', stroke: color, strokeWidth: outerRadius - innerRadius, strokeDasharray: circunference, strokeDashoffset: circunference * (1 - (endAngle - startAngle) / 360), rotation: startAngle, originX: outerRadius, originY: outerRadius, onPress: onPress ? handlePress : undefined }));
};
export default PieSlice;

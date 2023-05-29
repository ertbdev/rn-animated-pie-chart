import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Svg } from 'react-native-svg';
import PieSlice from './PieSlice';
import { colors as colorArr } from '../constanst/colors';
const PieChart = ({ data, colors = colorArr, size = 100, startAngle = 0, endAngle, holeSize = 0, }) => {
    const [chartData, setChartData] = useState([
        { color: colorArr[0] || 'red', startAngle: 0, endAngle: 360 },
    ]);
    const radius = size / 2;
    const _endAngle = endAngle
        ? endAngle < startAngle
            ? endAngle + 360
            : endAngle
        : startAngle + 360;
    const getPieChartData = (values) => {
        let angle = startAngle;
        const totalValue = values.reduce((acc, item) => acc + item, 0);
        const pieChartData = [];
        values.forEach((item, index) => {
            const itemPercentage = item / totalValue;
            pieChartData.push({
                color: colors[index % colors.length] || 'red',
                startAngle: angle,
                endAngle: angle + itemPercentage * (_endAngle - startAngle),
            });
            angle += itemPercentage * (_endAngle - startAngle);
        });
        return pieChartData;
    };
    useEffect(() => {
        if (data && data.length > 0) {
            setChartData(getPieChartData(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return (_jsx(Svg, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, fill: "none", children: chartData.map((item, index) => (_jsx(PieSlice, { color: item.color, outerRadius: radius, innerRadius: holeSize, startAngle: item.startAngle, endAngle: item.endAngle }, index))) }));
};
export default PieChart;

import { useEffect, useState } from 'react';
import { Svg } from 'react-native-svg';
import { colors as colorArr } from '../constanst/colors';
import AnimatedPieSlice from './AnimatedPieSlice';
import { useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  /** An array of the data entries, each value must be a number
   * @required
   */
  data: number[];
  /** An array of colors, it should have the same length as the data */
  colors?: string[];
  /** The chart size in pixels */
  size?: number;
  /** The size of the doughnut hole in pixels
   * @default 0
   */
  holeSize?: number;
  /** The background color of the pie*/
  bg?: string;
  /** The start angle in degrees of the entire pie */
  startAngle?: number;
  /** The end angle in degrees of the entire pie */
  endAngle?: number;
  /** The angle between the slices */
  padAngle?: number;
};

const AnimatedPieChart = ({
  data,
  colors = colorArr,
  size = 100,
  startAngle = 0,
  endAngle,
  holeSize = 0,
}: Props) => {
  const [chartData, setChartData] = useState([
    { color: colorArr[0] || 'red', startAngle: 0, endAngle: 360 },
  ]);

  const radius = size / 2;
  const _endAngle = endAngle
    ? endAngle < startAngle
      ? endAngle + 360
      : endAngle
    : startAngle + 360;

  const progress = useSharedValue(0);

  const getPieChartData = (values: number[]) => {
    let angle = startAngle;
    const totalValue = values.reduce((acc, item) => acc + item, 0);
    const pieChartData: {
      color: string;
      startAngle: number;
      endAngle: number;
    }[] = [];

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

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      if (progress.value > 0) {
        progress.value = withTiming(0, { duration: 500 }, (isFinished) => {
          if (isFinished) {
            progress.value = withTiming(1, { duration: 1500 });
          }
        });
      } else {
        progress.value = withTiming(1, { duration: 1500 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {chartData.map((item, index) => (
        <AnimatedPieSlice
          key={index}
          color={item.color}
          outerRadius={radius}
          innerRadius={holeSize}
          startAngle={item.startAngle}
          endAngle={item.endAngle}
          progress={progress}
        />
      ))}
    </Svg>
  );
};

export default AnimatedPieChart;

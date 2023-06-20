import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import SelectDropdown from 'react-native-select-dropdown';

export const Charts = () => {
  const [labels, setLabels] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [base, setBase] = useState('USD');
  const [data, setData] = useState([1]);
  const [currency, setCurrency] = useState('EGP');

  const requestURL =
    'https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-01-09&symbols=USD';

  const getExchangeRateByWeek = async () => {
    const end_date = new Date();
    const start_date = new Date(end_date.getTime());
    start_date.setDate(end_date.getDate() - 6);

    const response = await fetch(
      `https://api.exchangerate.host/timeseries?start_date=${start_date.toLocaleDateString(
        'en-CA',
      )}&end_date=${end_date.toLocaleDateString(
        'en-CA',
      )}&base=${base}&symbols=${currency},`,
    );
    const jsonData = await response.json();

    console.log(jsonData.rates);
    console.log(Object.keys(jsonData.rates));
    const arr = Object.keys(jsonData.rates);
    val = arr.map(i => {
      if (jsonData.rates[i]) {
        console.log(jsonData.rates[i][currency], 'val');
        return jsonData.rates[i][currency];
      }
    });
    setLabels(() =>
      arr.map(i => {
        var date = new Date(i);
        return date.toString().split(' ')[0];
      }),
    );
    setData(val);
    return jsonData;
  };

  const getExchangeRateByThreeMonths = async () => {
    const end_date = new Date();
    const start_date = new Date();
    start_date.setDate(1);
    start_date.setMonth(start_date.getMonth() - 2);
    console.log(start_date);
    const response = await fetch(
      `https://api.exchangerate.host/timeseries?start_date=${start_date.toLocaleDateString(
        'en-CA',
      )}&end_date=${end_date.toLocaleDateString(
        'en-CA',
      )}&base=${base}&symbols=${currency},`,
    );
    const jsonData = await response.json();

    console.log(jsonData.rates);
    console.log(Object.keys(jsonData.rates));
    const arr = Object.keys(jsonData.rates).filter(item => {
      return item.split('-')[2] == 1;
    });

    val = arr.map(i => {
      if (jsonData.rates[i]) {
        // console.log(jsonData.rates[i][currency], 'val');
        return jsonData.rates[i][currency];
      }
    });
    setLabels(arr);
    setData(val);
    return jsonData;
  };

  const getExchangeRateByOneYear = async () => {
    const end_date = new Date();
    const start_date = new Date();
    start_date.setDate(1);
    start_date.setMonth(start_date.getMonth() - 11);
    console.log(start_date);
    const response = await fetch(
      `https://api.exchangerate.host/timeseries?start_date=${start_date.toLocaleDateString(
        'en-CA',
      )}&end_date=${end_date.toLocaleDateString(
        'en-CA',
      )}&base=${base}&symbols=${currency},`,
    );
    const jsonData = await response.json();

    const arr = Object.keys(jsonData.rates).filter(item => {
      return item.split('-')[2] == 1;
    });

    val = arr.map(i => {
      if (jsonData.rates[i]) {
        console.log(jsonData.rates[i][currency], 'val');
        return jsonData.rates[i][currency];
      }
    });
    setLabels(
      arr.map(i => {
        let date = new Date(i);
        return date.toString().split(' ')[1];
      }),
    );
    setData(val);
    return jsonData;
  };

  const Getsymbols = async () => {
    const response = await fetch(`https://api.exchangerate.host/symbols`);
    const jsonData = await response.json();
    // console.log(Object.keys(jsonData.symbols), 'de');
    setSymbols(Object.keys(jsonData.symbols));
  };

  useEffect(() => {
    getExchangeRateByWeek();
    Getsymbols();
  }, [base, currency]);
  console.log(data, 'data');
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <SelectDropdown
          data={symbols}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setBase(selectedItem);
          }}
          defaultButtonText={base}
        />
        <SelectDropdown
          data={symbols}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem);
            setCurrency(selectedItem);
          }}
          defaultButtonText={currency}
        />
      </View>
      <LineChart
        data={{
          labels: [...labels],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={420}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={getExchangeRateByWeek} style={styles.button}>
          <Text style={{color: 'white'}}>w</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={getExchangeRateByThreeMonths}
          style={styles.button}>
          <Text style={{color: 'white'}}>m</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={getExchangeRateByOneYear}
          style={styles.button}>
          <Text style={{color: 'white'}}>1y</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgb(24, 28, 105)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  btnContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTrend } from './PollutionTrend';

const mapWithConcurrencyLimit = async (array, limit, asyncCallback) => {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => asyncCallback(item));
    ret.push(p);

    if (limit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
};


const PollutionData = ({ stationsData, onCombinedDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (stationsData && stationsData.length > 0 && !dataFetched) {

      const fetchPollutionData = async () => {
        try {
          const limit = 30; //limit dla jednoczesnych żądań

          const fetchSensorsForStation = async (station) => {
            const sensorsResponse = await axios.get(`http://localhost:5000/api/station/sensors/${station.id}`);
            const sensorsData = sensorsResponse.data;

            const sensorsWithMeasurements = await mapWithConcurrencyLimit(
              sensorsData,
              limit,
              async (sensor) => {
                const measurementsResponse = await axios.get(`http://localhost:5000/api/data/getData/${sensor.id}`);
                const measurementsData = measurementsResponse.data;
                
                const latestMeasurement = measurementsData.values.find(v => v.value !== null);
                const trend = calculateTrend(measurementsData.values, sensor.id);
                
                return { ...sensor, latestMeasurement, trend, measurements: measurementsData };
              }
            );

            return { ...station, sensors: sensorsWithMeasurements };
          };

          const stationsWithSensors = await mapWithConcurrencyLimit(
            stationsData,
            limit,
            fetchSensorsForStation
          );

          onCombinedDataFetch(stationsWithSensors);
          setDataFetched(true);

        } catch (error) {
          console.error('Błąd przy pobieraniu danych:', error);
        }
      };

      fetchPollutionData();
    }
  }, [dataFetched, onCombinedDataFetch, stationsData]);

  return null;
};

export default PollutionData;

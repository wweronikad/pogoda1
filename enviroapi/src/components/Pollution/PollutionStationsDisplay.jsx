import React from 'react';
import PollutionStationsData from './PollutionStationsData';
import PollutionData from './PollutionData';

const PollutionStations = ({ onDataFetch }) => {
  const handlePollutionDataFetch = (data) => onDataFetch(data);
  const handleCombinedPollutionDataFetch = (combinedData) => onDataFetch(prevData => [...prevData, ...combinedData]);

  return (
    <>
      <PollutionStationsData onDataFetch={handlePollutionDataFetch} />
      <PollutionData onCombinedDataFetch={handleCombinedPollutionDataFetch} />
    </>
  );
};

export default PollutionStations;

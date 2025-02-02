import { Button } from "@nextui-org/react";
import './LocationButton.css';

const LocationButton = ({ onClick }) => (
  <div className="location-button-container">
    <Button onClick={onClick} className="location-button">
      Użyj mojej lokalizacji...
    </Button>
  </div>
);

export default LocationButton;

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface IColorToggleButton {
  alignment: string;
  setAlignment: (item: FuzzyOperationList) => void;
}

export enum FuzzyOperationList{
    sum = "sum",
    subtracion = "subtracion",
    multiplication = "multiplication",
    division = "division"
}
 
export const ToggleTabsFuzzyOperation: React.FC<IColorToggleButton> = ({
  alignment,
  setAlignment
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: FuzzyOperationList
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
          <ToggleButton value={`${FuzzyOperationList.sum}`}>{`${FuzzyOperationList.sum}`}</ToggleButton>
          <ToggleButton value={`${FuzzyOperationList.subtracion}`}>{`${FuzzyOperationList.subtracion}`}</ToggleButton>
           <ToggleButton value={`${FuzzyOperationList.multiplication}`}>{`${FuzzyOperationList.multiplication}`}</ToggleButton>
      <ToggleButton value={`${FuzzyOperationList.division}`}>{`${FuzzyOperationList.division}`}</ToggleButton>
    </ToggleButtonGroup>
  );
};

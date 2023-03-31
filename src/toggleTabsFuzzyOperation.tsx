import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { FuzzyOperationList } from "./fuzzy/FuzzyOperaion";

interface IColorToggleButton {
  alignment: string;
  setAlignment: (item: FuzzyOperationList) => void;
}

export const ToggleTabsFuzzyOperation: React.FC<IColorToggleButton> = ({
  alignment,
  setAlignment,
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
      <ToggleButton
        value={`${FuzzyOperationList.sum}`}
      >{`${FuzzyOperationList.sum}`}</ToggleButton>
      <ToggleButton
        value={`${FuzzyOperationList.subtracion}`}
      >{`${FuzzyOperationList.subtracion}`}</ToggleButton>
      <ToggleButton
        value={`${FuzzyOperationList.multiplication}`}
      >{`${FuzzyOperationList.multiplication}`}</ToggleButton>
      <ToggleButton
        value={`${FuzzyOperationList.division}`}
      >{`${FuzzyOperationList.division}`}</ToggleButton>
    </ToggleButtonGroup>
  );
};

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";

interface IColorToggleButton {
  alignment: string;
  setAlignment: (item: ToogleView) => void;
}

export enum ToogleView {
  OneChart = "One Chart",
  All = "All",
}

export const ColorToggleButton: React.FC<IColorToggleButton> = ({
  alignment,
  setAlignment,
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: ToogleView
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
      <ToggleButton value="One Chart">One Chart</ToggleButton>
      <ToggleButton value="All">All</ToggleButton>
    </ToggleButtonGroup>
  );
};

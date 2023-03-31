import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";

interface IToggleTabsGrapthMatrix {
  alignment: string;
  setAlignment: (item: ApplicationModeState) => void;
}

export enum ApplicationModeList {
  Graphs = "Graphs",
  Matrix = "Matrix",
}

export type ApplicationModeState =
  | ApplicationModeList.Graphs
  | ApplicationModeList.Matrix;

export const ToggleTabsGrapthMatrix: React.FC<IToggleTabsGrapthMatrix> = ({
  alignment,
  setAlignment,
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: ApplicationModeList
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
        value={`${ApplicationModeList.Graphs}`}
      >{`${ApplicationModeList.Graphs}`}</ToggleButton>
      <ToggleButton
        value={`${ApplicationModeList.Matrix}`}
      >{`${ApplicationModeList.Matrix}`}</ToggleButton>
    </ToggleButtonGroup>
  );
};

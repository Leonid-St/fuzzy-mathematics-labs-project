import Check from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ListItemIcon } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { IPointService } from "../PointService";
import { RenderLineChart } from "../RenderLineChart";
import { StyledMenu } from "../StyledMenu";
import { FuzzyClass } from "./FuzzuClass";
import { GraphName, SelectedGrapth } from "./ProtocolFuzy";

export const SelectGraph: React.FC = () => {
  return <></>;
};

interface IGraphMenu {
  fuzzyClass: FuzzyClass;
  selectedGraph: SelectedGrapth | undefined;
  setSelectedGraph: (selectedGrapth: SelectedGrapth) => void;
  PointStorage: IPointService;
}
export const GraphMenu: React.FC<IGraphMenu> = ({
  fuzzyClass,
  selectedGraph,
  setSelectedGraph,
  PointStorage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);



  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Select Graph
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/** Graph.S*/}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.S);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.S ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}

          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.S}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphS}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/** Graph.Mountain */}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.Mountain);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.Mountain ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.Mountain}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphMountain}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/** Graph.Triangle */}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.Triangle);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.Triangle ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.Triangle}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphTriangle}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/** Graph.BackS */}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.BackS);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.BackS ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.BackS}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphBackS}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/** Graph.Trapeze*/}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.Trapeze);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.Trapeze ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.Trapeze}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphTrapeze}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/** Graph.Gaussian */}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.Gaussian);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.Gaussian ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.Gaussian}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphGaussian}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/** Graph.Sigmoid */}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.Sigmoid);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.Sigmoid ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.Sigmoid}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphSigmoid}
              />
            </Grid>
          </Stack>
        </MenuItem>

        {/** Graph.RoughMountain */}
        <MenuItem
          onClick={(e) => {
            setSelectedGraph(GraphName.RoughMountain);
            handleClose();
          }}
          disableRipple
        >
          {selectedGraph === GraphName.RoughMountain ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : null}
          <Stack spacing={2} direction={"column"}>
            <Grid item sm={1}>{` - ${GraphName.RoughMountain}`}</Grid>
            <Grid item sm={11}>
              <RenderLineChart
                width={300}
                height={100}
                data={PointStorage.pointsGraphRoughMountain}
              />
            </Grid>
          </Stack>
        </MenuItem>
        {/* <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
};

import React, { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation } from "react-router-dom";

export default function LabelBottomNavigation() {
    const location = useLocation()
  const [value, setValue] = React.useState<string | null>(
    null,
  );

  const handleChange = (
    e: React.SyntheticEvent,
    newValue: string,
  ) => {
    e.stopPropagation();
    setValue(newValue);
  };

  useEffect(() => {
    setValue(null);
  }, [location]);

  return (
    <BottomNavigation
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}

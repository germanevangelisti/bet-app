import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const BasicList = ({ items, teamClass, onClick }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "white" }}>
      <nav aria-label="teams clasification">
        <List>
          <p>Current {teamClass} Teams</p>
          {items?.length &&
            items.map((item) => (
              <ListItem
                disablePadding
                key={item.code}
                onClick={() => onClick(item)}
                sx={{ borderTop: 1 }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={item.logo}
                      alt={item.logo}
                      width="45px"
                      height="45px"
                    ></img>
                  </ListItemIcon>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ListItemText primary={`${item.name} (${item.record})`} />
                    <ListItemText
                      primary={`Conf-Rank: ${item.conferenceRank} | Streak: ${item.streak}`}
                    />
                    <ListItemText primary={`.${item.winningPerc}%`} />
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>
    </Box>
  );
};

export default BasicList;

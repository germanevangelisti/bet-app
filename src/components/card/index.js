import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BasicCard = ({
  header,
  title,
  subtitle,
  body,
  isPivot,
  buttonText,
  onClick,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275, margin: 1, borderColor: isPivot ? "red" : "black" }}
    >
      <CardContent sx={{ backgroundColor: isPivot ? "gold" : "white" }}>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {header}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2" sx={{ color: isPivot ? "red" : "black" }}>
          {body}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" onClick={() => onClick()}>
          {buttonText}
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default BasicCard;

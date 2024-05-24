import { Box, Typography } from "@mui/material";

const Button = ({
  handleClick,
  buttonText,
}: {
  handleClick: () => void;
  buttonText: string;
}) => {
  return (
    <div>
      <Box
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        sx={{
          bgcolor: "#000000",
          fontSize: "12px",
          margin: "20px 0px",
          "@media screen and (max-width:767px)": {
            width: "150px",
          },
          "@media screen and (min-width:768px)": {
            width: "200px",
          },
        }}
      >
        <Typography
          color={"#FFFFFF"}
          textAlign={"center"}
          paddingX={"12px"}
          paddingY={"12px"}
        >
          {buttonText}
        </Typography>
      </Box>
    </div>
  );
};

export default Button;

import { Box, Typography } from "@mui/material";
import Form from "../components/Form";

const Login = () => {
  return (
    <Box>
      <Box bgcolor={"#ccc9c2"} minHeight={"100vh"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          paddingTop={"50px"}
          width={"90%"}
          marginX={"auto"}
          sx={{
            "@media screen and (min-width:767px)": {
              paddingTop: "100px",
              width: "50%",
            },
          }}
        >
          <Typography
            textAlign={"center"}
            color={"#DC143C"}
            fontSize={"20px"}
            fontWeight={500}
            marginBottom={"40px"}
            sx={{
              "@media screen and (min-width:767px)": {
                fontSize: "32px",
              },
            }}
          >
            {" "}
            tailwebs.{" "}
          </Typography>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

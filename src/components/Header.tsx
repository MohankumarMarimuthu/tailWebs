import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../redux/user/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    toast.success("user logged out!");
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(signOutUserSuccess());
    navigate("/");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0px 20px",
          boxSizing: "border-box",
          "@media screen and (min-width:1440px)": {
            maxWidth: "1340px",
            padding: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              textAlign: "center",
              color: "#DC143C",
              fontWeight: 500,
              "@media screen and (min-width:767px)": {
                fontSize: "32px",
              },
            }}
          >
            {" "}
            tailwebs.
          </Typography>
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#3c3d40",
                  fontSize: "12px",
                  fontWeight: 400,
                  "@media screen and (min-width:767px)": {
                    fontSize: "20px",
                  },
                }}
              >
                Home
              </Typography>
            </Link>
            <Typography
              sx={{
                color: "#3c3d40",
                fontSize: "12px",
                fontWeight: 400,
                cursor: "pointer",
                "@media screen and (min-width:767px)": {
                  fontSize: "20px",
                },
              }}
              onClick={handleLogOut}
            >
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

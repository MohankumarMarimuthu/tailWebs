import {
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ChangeEvent, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { IoLockOpenOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { loginData } from "../types/TypeHelpers";
import { validateEmail, validatePassword } from "../helpers/utils";

const Form = () => {
  const users = [
    { username: "tailwebs@gmail.com", password: "admin@123" },
    // { username: "venki@gmail.com", password: "venki@123" },
  ];

  const [formData, setFormData] = useState<loginData>({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "email") {
      const isValid = validateEmail(value);
      setIsEmailValid(isValid);
    } else {
      const isValidd = validatePassword(value);
      setIsPasswordValid(isValidd);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (formData.email.trim() !== "" && formData.password.trim() !== "") {
        handleSignIn();
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onForgotPassword = () => {
    toast.error("forgot password functionality is not implemented");
  };

  const handleSignIn = async () => {
    dispatch(signInStart());
    if (formData.email !== "" && formData.password !== "") {
      const checkingMail = validateEmail(formData.email);
      const checkingPwd = validatePassword(formData.email);

      setIsEmailValid(checkingMail);
      setIsPasswordValid(checkingPwd);

      if (isEmailValid && isPasswordValid) {
        const user = users.find(
          (user) =>
            user.username === formData.email &&
            user.password === formData.password
        );
        if (user) {
          toast.success("Successfully loggedIn!");
          dispatch(signInSuccess(formData));
          await new Promise((resolve) => setTimeout(resolve, 500));
          setFormData({
            email: "",
            password: "",
          });
          navigate("/");
        } else {
          toast.error("Invalid username or password");
          dispatch(signInFailure("Invalid username or password"));
        }
      }
    }
  };

  return (
    <Box>
      <Box>
        <Box
          bgcolor={"#FFFFFF"}
          padding={"10%"}
          sx={{
            paddingY: "40px",
            "@media screen and (min-width:768px)": {
              padding: "10% 20%",
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              color={"#333333"}
              variant="detailBold"
              sx={{ marginBottom: "4px" }}
            >
              Userame
            </Typography>
            <TextField
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              error={!isEmailValid}
              onKeyDown={handleKeyPress}
              helperText={
                !isEmailValid ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <IoIosWarning style={{ color: "C61341" }} />
                    Enter a valid email address
                  </span>
                ) : (
                  ""
                )
              }
              sx={{
                marginBottom: "8px",
                ".MuiInputBase-input": {
                  color: "#333333",
                  paddingX: "8px",
                  paddingY: "8px",
                  fontSize: "14px",
                  fontWeight: "400",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #D2D2D0",
                },
                ".css-3j0wgu-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid #C61341",
                  },
                "& .css-5ifmys-MuiFormHelperText-root.Mui-error": {
                  color: "#181A20",
                },
                "& .css-5ifmys-MuiFormHelperText-root": {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CiUser
                      style={{
                        borderRight: "1px solid #D2D2D0",
                        paddingRight: "14px",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              color={"#333333"}
              variant="detailBold"
              sx={{ marginBottom: "4px" }}
            >
              Password
            </Typography>
            <TextField
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              error={!isPasswordValid}
              onKeyDown={handleKeyPress}
              helperText={
                !isPasswordValid ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <IoIosWarning style={{ color: "C61341" }} />
                    Enter a valid Password
                  </span>
                ) : (
                  ""
                )
              }
              sx={{
                marginBottom: "8px",
                ".MuiInputBase-input": {
                  color: "#333333",
                  paddingX: "8px",
                  paddingY: "8px",
                  fontSize: "14px",
                  fontWeight: "400",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #D2D2D0",
                },
                ".css-3j0wgu-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid #C61341",
                  },
                "& .css-5ifmys-MuiFormHelperText-root.Mui-error": {
                  color: "#181A20",
                },
                "& .css-5ifmys-MuiFormHelperText-root": {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoLockOpenOutline
                      style={{
                        borderRight: "1px solid #D2D2D0",
                        paddingRight: "14px",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Link
              underline="none"
              component={"button"}
              sx={{
                color: "#1976d2",
                fontSize: "12px",
                fontWeight: 600,
                marginTop: "20px",
                "@media screen and (max-width:767px)": {
                  marginLeft: "60%",
                },
                "@media screen and (min-width:768px)": {
                  marginLeft: "75%",
                },
              }}
              onClick={onForgotPassword}
            >
              Forgot password?
            </Link>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button buttonText={"Login"} handleClick={handleSignIn} />
          </Box>
        </Box>
        <Toaster position="top-center" />
      </Box>
    </Box>
  );
};

export default Form;

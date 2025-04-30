import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Avatar,
  Checkbox,
  FormControlLabel,
  Link,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ShoppingCart as ShoppingCartIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "6px",
    background: "linear-gradient(90deg, #FF6B6B, #6B66FF, #66D9FF)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  margin: "0 auto 16px",
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const SocialButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: color,
  color: "#fff",
  margin: theme.spacing(0, 1),
  "&:hover": {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "test@gmail.com" && formData.password === "12345678") {
      setAlertMessage("Login successful! Redirecting to home page...");
      setAlertSeverity("success");
      setAlertOpen(true);
      
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setAlertMessage("Invalid email or password. Please try again.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6B66FF 0%, #4834DF 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={0} sx={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)" }}>
          {/* Left side - Login Form */}
          <Grid item xs={12} md={6}>
            <LoginPaper elevation={0} sx={{ height: "100%" }}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <StyledAvatar>
                  <ShoppingCartIcon fontSize="large" />
                </StyledAvatar>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#333" }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Sign in to continue to Flipcart
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1 }}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                  <Link href="#" variant="body2" underline="hover" sx={{ color: theme.palette.primary.main }}>
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    background: "linear-gradient(90deg, #6B66FF, #4834DF)",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(107, 102, 255, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #5A55EE, #3723CE)",
                      boxShadow: "0 6px 20px rgba(107, 102, 255, 0.6)",
                    },
                  }}
                >
                  Sign In
                </Button>
              </form>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Sign in with
                </Typography>

                <Box>
                  <SocialButton color="#3b5998" aria-label="facebook">
                    <FacebookIcon />
                  </SocialButton>
                  <SocialButton color="#db4437" aria-label="google">
                    <GoogleIcon />
                  </SocialButton>
                  <SocialButton color="#1da1f2" aria-label="twitter">
                    <TwitterIcon />
                  </SocialButton>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{" "}
                    <Link href="#" underline="hover" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </LoginPaper>
          </Grid>

          {/* Right side - Image */}
          {!isMobile && (
            <Grid
              item
              md={6}
              sx={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Flipcart
              </Typography>
              <Typography variant="h5" gutterBottom>
                Online Shopping Made Easy
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 400, mb: 4 }}>
                Discover amazing products at unbeatable prices. Shop now and enjoy exclusive deals!
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  borderRadius: 2,
                  borderWidth: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  px: 4,
                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Learn More
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;


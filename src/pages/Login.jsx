import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      resetForm();
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Email no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        setErrors({ password: "Contraseña incorrecta" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 caracteres")
      .required("Contraseña requerida"),
  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://vinculotic.com/wp-content/uploads/2021/07/atencion-medica-remota-01-1021x580.jpg")',

            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
            <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography
                component="h1"
                variant="h5"
            >
                Login
            </Typography>

            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                handleChange,
                handleSubmit,
                values,
                isSubmitting,
                errors,
                touched,
                handleBlur,
                }) => (
                <Box
                    onSubmit={handleSubmit}
                    component="form"
                    sx={{ mt: 1 }}
                >
                    <TextField
                    type="text"
                    placeholder="test@example.com"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    onBlur={handleBlur}
                    id="email"
                    label="Ingrese email"
                    fullWidth
                    sx={{ mb: 3 }}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    />

                    <TextField
                    type="password"
                    placeholder="Ingrese contraseña"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    onBlur={handleBlur}
                    id="password"
                    label="Ingrese contraseña"
                    fullWidth
                    sx={{ mb: 3 }}
                    error={errors.password && touched.password}
                    helperText={
                        errors.password && touched.password && errors.password
                    }
                    />

                    <LoadingButton
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    variant="contained"
                    fullWidth
                    sx={{ mb: 3 }}
                    >
                    Iniciar Sesión
                    </LoadingButton>

                    <Button
                    component={Link}
                    to="/register"
                    fullWidth
                    >
                    ¿No tienes cuenta? Regístrate
                    </Button>
                </Box>
                )}
            </Formik>
            </Box>
        </Grid>
    </Grid>
  );
};

export default Login;
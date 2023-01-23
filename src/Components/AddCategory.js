import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./logo.css";
import Button from "@mui/material/Button";

const theme = createTheme();

function AddCategory() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: "",
    subcategory: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("https://dnsstore.online/addNewCategory", {
        category: inputs.category,
        subcategory: inputs.subcategory,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //send http request
    sendRequest().then(() => alert("Category Added Successfully!!"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="Logo"
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "17px",
          width: "500px",
        }}
      >
        <img className="logoImg" src="\logo.png" alt="logo" />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 500,
            marginLeft: "15px",
            gap: "60px",
            marginTop: "10px",
          }}
        >
           <Typography sx={{cursor:"pointer"}} href="#" variant="body2" onClick={() => navigate("/")}>
            Home
          </Typography>
          <Typography
          sx={{cursor:"pointer"}}
            href="#"
            variant="body2"
            onClick={() => navigate("/addproduct")}
          >
            Add Product
          </Typography>
          <Typography
          sx={{cursor:"pointer"}}
            href="#"
            variant="body2"
            onClick={() => navigate("/addcategory")}
          >
            Add Category
          </Typography>
          <Typography sx={{cursor:"pointer"}} href="#" variant="body2" onClick={() => navigate("/products")}>
            {" "}
            Product
          </Typography>
        </Grid>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "62px",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Category
        </Typography>
      </Grid>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 300,
            height: 200,
            outline: "auto",
            backgroundColor: "inherit",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  name="category"
                  label="Category"
                  value={inputs.category}
                  onChange={handleChange}
                  maxRows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  name="subcategory"
                  label="Sub-Category"
                  value={inputs.subcategory}
                  onChange={handleChange}
                  maxRows={4}
                />
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate("/addmore")}
                >
                  +Add More
                </Link>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                ADD CATEGORY
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddCategory;

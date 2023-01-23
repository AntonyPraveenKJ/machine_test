import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./logo.css";
import Button from "@mui/material/Button";

const theme = createTheme();

function AddProduct() {
  const navigate = useNavigate();

  const [proName, setProName] = useState("");
  const [sub, setSub] = useState([]);
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");

  const getCategory = async () => {
    await axios.get("https://dnsstore.online/getCategory").then((response) => {
      setCategories(response.data.message);
      console.log(categories, "categories");
    });
  };

  const handleSub = async (input) => {
    setCategory(input);
    console.log(input);
    await axios
      .post("https://dnsstore.online/getSub", { category: input })
      .then((response) => {
        setSub(response.data.message[0].subCategories);
        console.log(sub, "subcat");
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const sendRequest = async () => {
    await axios
      .post("https://dnsstore.online/addNewProduct", {
        proName: proName,
        category: category,
        subcategory: subcategory,
        price: price,
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //send http request
    sendRequest().then(() => alert("Product added Successfully!!"));
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
          Add Product
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
                  label="Product Name"
                  name="productName"
                  value={proName}
                  onChange={(e) => setProName(e.target.value)}
                  multiline
                  maxRows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  name="category"
                  value={category}
                  label="Category"
                  defaultValue="None"
                  helperText="Please select the category"
                  onChange={(e) => {
                    handleSub(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  name="subcategory"
                  value={subcategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  label="Sub-Category"
                  defaultValue="None"
                  helperText="Please select the sub-category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {sub.map((item) => {
                    console.log(item);
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  multiline
                  maxRows={4}
                />
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                ADD PRODUCT
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddProduct;

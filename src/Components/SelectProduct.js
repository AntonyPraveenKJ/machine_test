import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./logo.css";

const theme = createTheme();

function SelectProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // sub category
  const [subcategory, setSubCategory] = useState();
  const [catProducts, setCatProducts] = useState();
  //catename
  const [cateName, setCateName] = useState();

  //box display
  const [box, setBox] = useState(false);

  const rows = async () => {
    await axios.get("http://localhost:5000/getProducts").then((response) => {
      setProducts(response.data.message);
    });
  };

  const getCategory = async () => {
    await axios.get("http://localhost:5000/getCategory").then((response) => {
      setCategories(response.data.message);
      console.log(response.data.message);
    });
  };

  const handleSub = async (id, category) => {
    setSubCategory(categories[id].subCategories);
    console.log(categories[id].subCategories);
    setCateName(category);
    await axios
      .post("http://localhost:5000/getCatProducts", { category: category })
      .then((response) => {
        setCatProducts(response.data.message);
        console.log(response.data.message);
      });
  };
  const handleProduct = (name) => {
    setBox(true);
    console.log(name);
    setCateName(name);
    setCatProducts(
      catProducts.filter((item) => {
        return item.subcategory === name;
      })
    );
  };

  useEffect(() => {
    getCategory();
    rows();
  }, []);

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
        {cateName ? (
          <Typography component="h1" variant="h5">
            {cateName}({box?catProducts.length:subcategory.length})
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Categories({categories.length})
          </Typography>
        )}
      </Grid>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {box ? (
          ""
        ) : (
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 300,
              height: 400,
              outline: "auto",
              backgroundColor: "inherit",
              // '&:hover': {
              //   backgroundColor: 'primary.main',
              //   opacity: [0.9, 0.8, 0.7],
              // },
            }}
          >
            <Grid>
              {subcategory
                ? subcategory.map((item, index) => {
                    return (
                      <h4
                        key={item._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleProduct(item.name);
                        }}
                      >
                        {item.name}({item.productCount})
                      </h4>
                    );
                  })
                : categories.map((item, index) => {
                    return (
                      <h4
                        key={item._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleSub(index, item.name);
                        }}
                      >
                        {item.name}({item.productCount})
                      </h4>
                    );
                  })}
            </Grid>
          </Box>
        )}
      </Container>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 100, marginTop: "10px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT NAME</TableCell>
              <TableCell align="right">CATEGORY</TableCell>
              <TableCell align="right">SUB-CATEGORY</TableCell>
              <TableCell align="right">PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catProducts
              ? catProducts.map((row) => {
                  return (
                    <TableRow
                      key={row.productName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.productName}
                      </TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.subcategory}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                  );
                })
              : products.map((row) => (
                  <TableRow
                    key={row.productName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.productName}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.subcategory}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default SelectProduct;

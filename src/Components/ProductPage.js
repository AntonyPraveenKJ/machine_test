import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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

function ProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const rows = async () => {
    await axios.get("http://localhost:5000/getProducts").then((response) => {
      setProducts(response.data.message);
    });
  };

  useEffect(() => {
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
        <Typography component="h1" variant="h5">
          All Products
        </Typography>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT NAME</TableCell>
              <TableCell align="right">CATEGORY</TableCell>
              <TableCell align="right">SUB-CATEGORY</TableCell>
              <TableCell align="right">PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
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

export default ProductPage;

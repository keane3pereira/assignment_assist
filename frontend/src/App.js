import BASE_URL from "./constants";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";


function App() {
  let [products, setProducts] = useState([]);

  let [newProductModal, setNewProductModal] = useState(false);
  let [newProductName, setNewProductName] = useState(null);
  let [newProductPrice, setNewProductPrice] = useState(null);
  let [newProductQuantity, setNewProductQuantity] = useState(null);

  let [editProductModal, setEditProductModal] = useState(false);
  let [editProductId, setEditProductId] = useState(-1);

  let [searchProduct, setSearchProduct] = useState("")

  const Product = (data) => {
    return (
      <TableRow>
        <TableCell>{data.data.id}</TableCell>
        <TableCell>{data.data.product_name}</TableCell>
        <TableCell>{data.data.price}</TableCell>
        <TableCell>{data.data.quantity}</TableCell>
        <TableCell>
          <Button
            variant="outlined"
            onClick={() => {
              initEditProductDetails(data.data.id);
            }}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const getProducts = async () => {
    let params = {};
    if (searchProduct !== "") {
      params = {params: {product_name: searchProduct}}
    }
    await axios
      .get(BASE_URL, params)
      .then((res) => {
        setProducts(res.data);
        // console.log(products)
      })
      .catch((err) => console.log(err));
  };

  const resetProduct = () => {
    setNewProductName(null);
    setNewProductPrice(null);
    setNewProductQuantity(null);
    setNewProductModal(false);
    setEditProductId(-1)
    setEditProductModal(false)
    getProducts();
  }

  const insertNewProduct = async () => {
    let newProduct = {
      product_name: newProductName,
      price: newProductPrice,
      quantity: newProductQuantity,
    };
    console.log(newProduct);

    await axios
      .post(BASE_URL + "/new", newProduct)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));

    resetProduct()
  };

  const initEditProductDetails = (product_id) => {
    let currentProduct = products[product_id - 1];
    setNewProductName(currentProduct.product_name);
    setNewProductPrice(currentProduct.price);
    setNewProductQuantity(currentProduct.quantity);
    setEditProductId(product_id);
    setEditProductModal(true);
  };

  const editProductDetails = async () => {
    let editedProduct = {
      id: editProductId,
      product_name: newProductName,
      price: newProductPrice,
      quantity: newProductQuantity,
    };
    // console.log(editedProduct);

    await axios
      .post(BASE_URL + "/update", editedProduct)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));

    resetProduct()
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <Container>
        <h1>Products</h1>

        <div>
          <Button variant="contained" onClick={() => setNewProductModal(true)}>
            New Product
          </Button>

          <Modal
            open={newProductModal}
            onClose={() => setNewProductModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                border: "2px solid #000",
                boxShadow: 24,
                backgroundColor: "white",
                padding: 10,
              }}
            >
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  insertNewProduct();
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Insert New Product
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={newProductName}
                  onChange={(e) => {
                    setNewProductName(e.target.value);
                  }}
                  name="product_name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  inputProps={{
                    step: "0.01",
                  }}
                  value={newProductPrice}
                  onChange={(e) => {
                    setNewProductPrice(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="number"
                  id="quantity"
                  value={newProductQuantity}
                  onChange={(e) => {
                    setNewProductQuantity(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Insert
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>

        {/* Search Bar */}
        <Box style={{margin: 20}}>
        <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="search"
                  label="Search for products"
                  type="text"
                  id="search"
                  value={searchProduct}
                  onChange={(e) => {
                    setSearchProduct(e.target.value);
                    getProducts()
                  }}
                />
        </Box>

        <Box style={{margin:20}}>
          <Table component={Paper} variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((data) => {
                return <Product key={data.id} data={data} />;
              })}
            </TableBody>
          </Table>
        </Box>

        <div>
          <Modal
            open={editProductModal}
            onClose={() => setEditProductModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                border: "2px solid #000",
                boxShadow: 24,
                backgroundColor: "white",
                padding: 10,
              }}
            >
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  editProductDetails();
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Product Details
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={newProductName}
                  onChange={(e) => {
                    setNewProductName(e.target.value);
                  }}
                  name="product_name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  inputProps={{
                    step: "0.01",
                  }}
                  value={newProductPrice}
                  onChange={(e) => {
                    setNewProductPrice(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="number"
                  id="quantity"
                  value={newProductQuantity}
                  onChange={(e) => {
                    setNewProductQuantity(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

export default App;

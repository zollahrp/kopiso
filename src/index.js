const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')


dotenv.config()

const app = express()
const PORT = 5000
const prisma = new PrismaClient()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ROLE_KEY
)

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

// register
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name },
    email_confirm: false,
  });

  if (error) return res.status(400).json({ message: error.message });

  const user = await prisma.user.create({
    data: {
      id: data.user.id,
      email,
      name
    }
  });

  res.json({ message: 'Berhasil register', user });
});

// produk
app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

// tambah produk
app.post('/products', async (req,res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
      image: newProductData.image,
      category: newProductData.category,
      stock: newProductData.stock
    }
  })
  res.status(201).json({
    message: 'Produk berhasil ditambahkan',
    product
  })
})

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.delete({
    where: {
      id: parseInt(productId)
    }
  });

  res.json({
    message: 'Produk berhasil dihapus',
    product
  });
});

// update produk
app.put('/products/:id', async (req, res)=> {
  const productId = req.params.id;
  const updateProduct = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId)
    }, 
    data: {
      name: updateProduct.name,
      description: updateProduct.description,
      price: updateProduct.price,
      image: updateProduct.image,
      category: updateProduct.category,
      stock: updateProduct.stock
    }
  })

  res.status(200).json ({
    message: 'Produk berhasil diupdate',
    product
  })
})


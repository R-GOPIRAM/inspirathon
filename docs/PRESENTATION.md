# T-ele Santhai (Inspirathon)

T-ele Santhai is an e-commerce web application with:
- **Backend:** Node.js + Express + MongoDB
- **Frontend:** HTML + CSS + Vanilla JavaScript (served from `public/`)

## Features implemented

- User authentication (`signup`, `login`, `logout`, `me`) with hashed passwords.
- Product APIs with CRUD + search/filter + pagination.
- Role-based authorization (`customer`, `seller`, `admin`).
- Seller registration endpoint with document uploads (`multer`).
- MongoDB schema validation for core fields.
- Frontend pages:
  - `index.html` product grid and search/filter UI
  - `product.html` product detail page
  - `login.html` / `signup.html`
  - `seller.html` seller registration + product management dashboard

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Set environment variables in `.env` (example):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tele_santhai
JWT_SECRET=change-this-secret
CORS_ORIGIN=*
```

3. Start API server:

```bash
npm run server
```

4. Open in browser:

- `http://localhost:5000/index.html`

## API quick examples

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Seller One","email":"seller@example.com","password":"pass1234","role":"seller"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@example.com","password":"pass1234"}'

# Create product (replace TOKEN)
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smart Watch","price":3499,"category":"Electronics","description":"Fitness smart watch with heart rate monitor","images":["https://picsum.photos/200"]}'

# Search products
curl "http://localhost:5000/api/products?search=watch&category=Electronics"
```

## Presentation checklist

Before demoing:
- Ensure MongoDB is running and `.env` is configured.
- Create one seller and add 2-3 sample products.
- Keep one customer account ready for browse/search demo.
- Keep sample image URLs ready for faster product creation.

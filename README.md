# Invoice Management System

A Node.js application for processing and validating invoice data from CSV files with comprehensive error handling and multi-line invoice support.

## 📋 Table of Contents

- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Validation Rules](#validation-rules)
- [Invoice Generation](#invoice-generation)
- [API Documentation](#api-documentation)

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/US7103/InvoicUpload-ValidationRefrens.git
cd 
npm install
```

##  Running the Application

```bash
# Start the server with nodemon (development)
npm run dev

# Start the server with Node.js (production)
npm start

# Run validation service tests
npm test
```

## ✅ Validation Rules

The application enforces the following validation rules:

### Date Format
- **Accepted formats:**
  - Standard format: `YYYY-MM-DD`
  - Excel-based date format (numeric serial date)
- Any other format will be flagged as invalid

### Numeric Fields
The following fields must contain numeric values only:
- Item Quantity
- Item Price
- Item Total
- Total Amount

Non-numeric values in these fields will result in validation errors.

### Invoice Number
- Must be **unique** across all invoices
- **Multi-line support:** If the same invoice number appears with different item descriptions, the system will:
  - Recognize them as line items of the same invoice
  - Consolidate them into a single invoice with multiple line items
  - Generate the invoice properly with all items grouped together

## 📄 Invoice Generation - Mock Creation Example

Below is an example of invoice generation output displayed in the console/terminal:

### Invoice INV001
```json
Creating Invoice: INV001
{
  "id": "dbd2dd95-4b78-4398-9023-d56b673f4edc",
  "invoiceNumber": "INV001",
  "date": 46037.22928240741,
  "customerName": "ABC Corp",
  "lineItems": [
    {
      "description": "Item A",
      "quantity": 2,
      "price": 10,
      "total": 20
    },
    {
      "description": "Item B",
      "quantity": 1,
      "price": 20,
      "total": 20
    }
  ],
  "totalAmount": 40
}
```

### Invoice INV002
```json
Creating Invoice: INV002
{
  "id": "8e4123a3-f4d8-458d-82fb-59d03e0479b7",
  "invoiceNumber": "INV002",
  "date": 46038.22928240741,
  "customerName": "XYZ Ltd",
  "lineItems": [
    {
      "description": "Item C",
      "quantity": 3,
      "price": 15,
      "total": 45
    }
  ],
  "totalAmount": 45
}
```

### Invoice INV006
```json
Creating Invoice: INV006
{
  "id": "566a9598-5f3e-4733-9ca2-f38e01e2fd9f",
  "invoiceNumber": "INV006",
  "date": 46041.22928240741,
  "customerName": "UVW Ltd",
  "lineItems": [
    {
      "description": "Item G",
      "quantity": 1,
      "price": 100,
      "total": 100
    },
    {
      "description": "Item H",
      "quantity": 2,
      "price": 150,
      "total": 300
    }
  ],
  "totalAmount": 400
}
```

## 🔌 API Documentation

### Postman Collection Structure

```
Postman Collection
 ├── Request: Validate Invoices
 │   ├── Method: POST
 │   ├── Endpoint: /upload
 │   ├── Headers:
 │   │     Content-Type: multipart/form-data
 │   ├── Body:
 │   │     file: sample_invoices.csv
 │   └── Tests:
 │         expect status 200
```

### Endpoint: POST /upload

**Description:** Upload and validate invoice CSV files

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body:**
```
file: sample_invoices.csv (multipart/form-data)
```

**Response Example:**
```json
{
  "totalRows": 8,
  "validInvoice": 3,
  "rowsWithErrors": 3,
  "errorRows": [
    {
      "Invoice Number": "INV003",
      "Date": 46039.22928240741,
      "Customer Name": "LMN Inc",
      "Item Description": "Item D",
      "Item Quantity": 5,
      "Errors": "Item Price is required"
    },
    {
      "Invoice Number": "INV004",
      "Date": 46040.22928240741,
      "Customer Name": "OPQ Co",
      "Item Description": "Item E",
      "Item Quantity": "two",
      "Item Price": 30,
      "Errors": "Item Quantity must be numeric"
    },
    {
      "Invoice Number": "INV005",
      "Date": "2026-31-01",
      "Customer Name": "RST Corp",
      "Item Description": "Item F",
      "Item Quantity": 1,
      "Item Price": 50,
      "Errors": "Invalid Date format"
    }
  ]
}
```

**Response Fields:**
- `totalRows`: Total number of rows processed
- `validInvoice`: Number of valid invoices created
- `rowsWithErrors`: Number of rows containing validation errors
- `errorRows`: Array of rows with detailed error information

---

## 📝 Notes

- Ensure your CSV file follows the expected format with proper column headers
- Multi-line invoices are automatically consolidated based on invoice number
- All validation errors are returned with detailed information for easy debugging
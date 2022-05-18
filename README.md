# Shopify Backend Developer Challenge

**CONTENTS**

- [Objective](#objective)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Routes](#api-routes)
- [About the Developer](#about-the-developer)

## Objective

Build an inventory tracking web application for a logistics company, with the following requirements:

Basic CRUD Functionalities:

- Create inventory items
- Edit inventory items
- Delete inventory items
- View a list of inventory items

Additional Feature:

- When deleting, allow deletion comments and undeletion

I chose to use Flask, a lightweight web framework that is flexible and simple to implement, to create API endpoints. For the database, I used postgreSQL as it is a commonly used relational database and allows for scalability, such as adding product information tables, warehouse storage information tables, etc. I used SQLAlchemy to incorporate Flask and postrgresQL with Python.

Python unittests were added to ensure the API endpoints returned the correct JSON response.

View the app on Replit: [replit](https://replit.com/@jenniferlei/shopify-backend-developer-challenge#main.py) | [site](https://shopify-backend-developer-challenge.jenniferlei.repl.co/)

## Tech Stack

**Backend:** Python3, Flask, SQLAlchemy
**Frontend:** JavaScript (React), HTML5, CSS3, Bootstrap
**Database:** PostgreSQL

## Installation

### Requirements:

- [PostgreSQL](https://www.postgresql.org/)
- [Python 3.7+](https://www.python.org/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

To run Shopify Coding Challenge on your local machine, follow the instructions below:

Clone repository:

```
$ git clone https://github.com/jenniferlei/shopify-backend-developer-challenge.git
```

Create and activate a virtual environment inside your project directory:

```
$ pip3 install virtualenv
$ virtualenv env (Mac OS)
$ virtualenv env --always-copy (Windows OS)
$ source env/bin/activate
```

Install the dependencies:

```
(env) pip3 install -r requirements.txt
```

(Optionally) Seed the database:

```
(env) python3 seed.py
```

Note: if you do not run `seed.py`, make sure you create a database named
inventory:
`createdb inventory`.

Create a secrets.sh file to assign a value to APP_SECRET_KEY and run it:

```
export APP_SECRET_KEY="<your_secret_key>"
```

```
(env) source secrets.sh
```

Run the app:

```
(env) python3 server.py
```

You can now navigate to `localhost:5000/` to start tracking inventory!

## API Routes

### Add an inventory item

HTTP POST `/api/create_inventory`

<details>
  <summary>Request</summary>
  <strong>warehouseId</strong>&emsp;&emsp;warehouse id | integer | required
  <br><strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;stock keeping unit | alphanumeric string (max 8 char) | required
  <br><strong>quantity</strong>&emsp;&emsp;&emsp;&emsp;&nbsp;stock quantity | integer | required
  <br><strong>description</strong>&emsp;&emsp;&emsp;stock description | string
</details>

<details>
  <summary>Response 200</summary>
<strong>data</strong>
<br>
&emsp;<strong>inventory_id</strong>&emsp;&ensp;&nbsp;inventory id | integer | required
  <br>
&emsp;<strong>warehouse_id</strong>&emsp;warehouse id | integer | required
  <br>&emsp;<strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;stock keeping unit | alphanumeric string (max 8 char) | required
  <br>&emsp;<strong>quantity</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;stock quantity | integer | required
  <br>&emsp;<strong>description</strong>&emsp;&emsp;&nbsp;stock description | string
  <br>&emsp;<strong>created</strong>&emsp;&emsp;&emsp;&emsp;creation datetime | datetime | required | defaults to current datetime
  <br>&emsp;<strong>updated</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;updated datetime | datetime | required | defaults to current datetime
  <br>&emsp;<strong>deleted</strong>&emsp;&emsp;&emsp;&emsp;deletion status | boolean | required | defaults to false
  <br>&emsp;<strong>comments</strong>&emsp;&emsp;&ensp;&nbsp;deletion comments | text | defaults to none
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>200</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

<details>
  <summary>Response 400</summary>
<strong>data</strong>
<br>
&emsp;<strong>error message</strong> &emsp;short description of the cause of the error | string
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>400</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

#### Example : `http://localhost:5000/api/create_inventory`

```
{
    "data": {
        "comments": null,
        "created": "05/10/2022, 18:51:24",
        "deleted": false,
        "description": "Test",
        "inventory_id": 7,
        "quantity": 10,
        "sku": "66BI8PMZ",
        "updated": "05/10/2022, 18:51:24",
        "warehouse_id": 1
    },
    "status": 200
}
```

### View list of inventory items

HTTP GET `/api/inventory`

View a list of all inventory items

<details>
  <summary>Response</summary>
<strong>data</strong>
<br>&emsp;<strong>inventory_id</strong>&emsp;&ensp;&nbsp;inventory id | integer | required
<br>
&emsp;<strong>warehouse_id</strong>&emsp;warehouse id | integer | required
<br>&emsp;<strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;stock keeping unit | alphanumeric string (max 8 char) | required
<br>&emsp;<strong>quantity</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;stock quantity | integer | required
<br>&emsp;<strong>description</strong>&emsp;&emsp;&nbsp;stock description | string
<br>&emsp;<strong>created</strong>&emsp;&emsp;&emsp;&emsp;creation datetime | datetime | required
<br>&emsp;<strong>updated</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;updated datetime | datetime | required
<br>&emsp;<strong>deleted</strong>&emsp;&emsp;&emsp;&emsp;deletion status | boolean | required
<br>&emsp;<strong>comments</strong>&emsp;&emsp;&ensp;&nbsp;deletion comments | text

</details>

#### Example : `http://localhost:5000/api/inventory`

```
{
  "data": [
    {
      "comments": "expired",
      "created": "05/10/2022, 22:40:30",
      "deleted": true,
      "description": "Small Batch",
      "inventory_id": 1,
      "quantity": 5,
      "sku": "66BI8PMZ",
      "updated": "05/11/2022, 12:58:57",
      "warehouse_id": 2
    },
    {
      "comments": "",
      "created": "05/11/2022, 10:20:31",
      "deleted": false,
      "description": "",
      "inventory_id": 2,
      "quantity": 30,
      "sku": "21TZ4RWZ",
      "updated": "05/11/2022, 12:53:55",
      "warehouse_id": 2
    },
    ...
  ]
}
```

### View list of inventory items given deletion status

HTTP GET `/api/inventory/status:<status>`

View a list of inventory items given deletion status

where `<status>` is deletion status 0 = false, 1 = true

<details>
  <summary>Request</summary>
  <strong>deleted</strong>&emsp;&emsp;deletion status | boolean | required
</details>

<details>
  <summary>Response</summary>
<strong>data</strong>
<br>&emsp;<strong>inventory_id</strong>&emsp;&ensp;&nbsp;inventory id | integer | required
<br>
&emsp;<strong>warehouse_id</strong>&emsp;warehouse id | integer | required
<br>&emsp;<strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;stock keeping unit | alphanumeric string (max 8 char) | required
<br>&emsp;<strong>quantity</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;stock quantity | integer | required
<br>&emsp;<strong>description</strong>&emsp;&emsp;&nbsp;stock description | string
<br>&emsp;<strong>created</strong>&emsp;&emsp;&emsp;&emsp;creation datetime | datetime | required
<br>&emsp;<strong>updated</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;updated datetime | datetime | required
<br>&emsp;<strong>deleted</strong>&emsp;&emsp;&emsp;&emsp;deletion status | boolean | required
<br>&emsp;<strong>comments</strong>&emsp;&emsp;&ensp;&nbsp;deletion comments | text

</details>

#### Example : `http://localhost:5000/api/inventory/status:0`

```
{
  "data": [
    {
      "comments": "expired",
      "created": "05/10/2022, 22:40:30",
      "deleted": false,
      "description": "Small Batch",
      "inventory_id": 1,
      "quantity": 5,
      "sku": "66BI8PMZ",
      "updated": "05/11/2022, 12:58:57",
      "warehouse_id": 2
    },
    {
      "comments": "",
      "created": "05/11/2022, 10:20:31",
      "deleted": false,
      "description": "",
      "inventory_id": 2,
      "quantity": 30,
      "sku": "21TZ4RWZ",
      "updated": "05/11/2022, 12:53:55",
      "warehouse_id": 2
    },
    ...
  ]
}
```

### Update an inventory item

HTTP PUT `/api/update_inventory/id:<inventory_id>`

where `<inventory_id>` is the ID of the inventory to update

<details>
  <summary>Request</summary>
  <strong>inventory_id</strong>&emsp;&emsp;&ensp;inventory id | integer | required
  <br><strong>warehouseId</strong>&emsp;&emsp;warehouse id | integer | required
  <br><strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;stock keeping unit | alphanumeric string (max 8 char) | required
  <br><strong>quantity</strong>&emsp;&emsp;&emsp;&emsp;&nbsp;stock quantity | integer | required
  <br><strong>description</strong>&emsp;&emsp;&emsp;stock description | string
</details>

<details>
  <summary>Response 200</summary>
<strong>data</strong>
<br>
&emsp;<strong>inventory_id</strong>&emsp;&ensp;&nbsp;inventory id | integer | required
  <br>
&emsp;<strong>warehouse_id</strong>&emsp;warehouse id | integer | required
  <br>&emsp;<strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;stock keeping unit | alphanumeric string (max 8 char) | required
  <br>&emsp;<strong>quantity</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;stock quantity | integer | required
  <br>&emsp;<strong>description</strong>&emsp;&emsp;&nbsp;stock description | string
  <br>&emsp;<strong>created</strong>&emsp;&emsp;&emsp;&emsp;creation datetime | datetime | required
  <br>&emsp;<strong>updated</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;updated datetime | datetime | required | defaults to current datetime
  <br>&emsp;<strong>deleted</strong>&emsp;&emsp;&emsp;&emsp;deletion status | boolean (false) | required
  <br>&emsp;<strong>comments</strong>&emsp;&emsp;&ensp;&nbsp;deletion comments | text
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>200</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

<details>
  <summary>Response 400</summary>
<strong>data</strong>
<br>
&emsp;<strong>error message</strong> &emsp;short description of the cause of the error | string
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>400</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

#### Example : `http://localhost:5000/api/update_inventory/id:<inventory_id>`

```
{
    "data": {
        "comments": null,
        "created": "05/10/2022, 17:44:37",
        "deleted": false,
        "description": null,
        "inventory_id": 1,
        "quantity": 70,
        "sku": "92JD1VKP",
        "updated": "05/10/2022, 19:05:29",
        "warehouse_id": 1
    },
    "status": 200
}
```

### Delete an inventory item

HTTP PUT `/api/delete_inventory/id:<inventory_id>`

where `<inventory_id>` is the ID of the inventory to delete

<details>
  <summary>Request</summary>
    <strong>inventory_id</strong>&emsp;&emsp;&ensp;inventory id | integer | required
  <br><strong>comments</strong>&emsp;&emsp;&emsp;&nbsp;deletion comments | text
</details>

<details>
  <summary>Response 200</summary>
<strong>data</strong>
<br>
&emsp;<strong>inventory_id</strong>&emsp;&ensp;&nbsp;inventory id | integer | required
  <br>
&emsp;<strong>warehouse_id</strong>&emsp;warehouse id | integer | required
  <br>&emsp;<strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;stock keeping unit | alphanumeric string (max 8 char) | required
  <br>&emsp;<strong>quantity</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;stock quantity | integer | required
  <br>&emsp;<strong>description</strong>&emsp;&emsp;&nbsp;stock description | string
  <br>&emsp;<strong>created</strong>&emsp;&emsp;&emsp;&emsp;creation datetime | datetime | required
  <br>&emsp;<strong>updated</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;updated datetime | datetime | required | defaults to current datetime
  <br>&emsp;<strong>deleted</strong>&emsp;&emsp;&emsp;&emsp;deletion status | boolean | required | defaults to true
  <br>&emsp;<strong>comments</strong>&emsp;&emsp;&ensp;&nbsp;deletion comments | text
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>200</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

<details>
  <summary>Response 400</summary>
<strong>data</strong>
<br>
&emsp;<strong>error message</strong> &emsp;short description of the cause of the error | string
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>400</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

#### Example : `http://localhost:5000/api/delete_inventory/id:<inventory_id>`

```
{
    "data": {
        "comments": "expired",
        "created": "05/10/2022, 18:51:24",
        "deleted": true,
        "description": "",
        "inventory_id": 8,
        "quantity": 10,
        "sku": "66BI8PMZ",
        "updated": "05/10/2022, 19:08:56",
        "warehouse_id": 1
    },
    "status": 200
}
```

### Undelete/restore an inventory item

HTTP PUT `/api/restore_inventory/id:<inventory_id>`

where `<inventory_id>` is the ID of the inventory to restore

<details>
  <summary>Request</summary>
  <strong>inventory_id</strong>&emsp;&emsp;warehouse id | integer | required
</details>

<details>
  <summary>Response 200</summary>
<strong>data</strong>
<br>
&emsp;<strong>inventory_id</strong>&emsp;&ensp;&nbsp;inventory id | integer | required
  <br>
&emsp;<strong>warehouse_id</strong>&emsp;warehouse id | integer | required
  <br>&emsp;<strong>sku</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;stock keeping unit | alphanumeric string (max 8 char) | required
  <br>&emsp;<strong>quantity</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;stock quantity | integer | required
  <br>&emsp;<strong>description</strong>&emsp;&emsp;&nbsp;stock description | string
  <br>&emsp;<strong>created</strong>&emsp;&emsp;&emsp;&emsp;creation datetime | datetime | required
  <br>&emsp;<strong>updated</strong>&emsp;&emsp;&emsp;&ensp;&nbsp;updated datetime | datetime | required | defaults to current datetime
  <br>&emsp;<strong>deleted</strong>&emsp;&emsp;&emsp;&emsp;deletion status | boolean | required | defaults to false
  <br>&emsp;<strong>comments</strong>&emsp;&emsp;&ensp;&nbsp;deletion comments | text
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>200</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

<details>
  <summary>Response 400</summary>
<strong>data</strong>
<br>
&emsp;<strong>error message</strong> &emsp;short description of the cause of the error | string
<br>
    <strong>status</strong> 
<br>
&emsp;<strong>400</strong>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;http status code | integer
  <br>
</details>

#### Example : `http://localhost:5000/api/restore_inventory/id:<inventory_id>`

```
{
    "data": {
        "comments": "expired",
        "created": "05/10/2022, 18:51:24",
        "deleted": false,
        "description": "",
        "inventory_id": 9,
        "quantity": 20,
        "sku": "21TZ4RWZ",
        "updated": "05/10/2022, 19:09:19",
        "warehouse_id": 3
    },
    "status": 200
}
```

## About the Developer

Jennifer Lei is a software engineer in the Greater Los Angeles Area. She previously worked in multiple fields, such as B2B tech sales, finance and e-commerce. After a layoff, she decided to follow her dream and pivoted to software engineering. She has enjoyed every minute of it since!

<p><a href="https://www.linkedin.com/in/jenniferlei/">
  <img
    alt="LinkedIn"
    src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"
  />
</a>
<a href="https://twitter.com/JenniferLei_">
  <img
    alt="Twitter"
    src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white"
  />
</a></p>

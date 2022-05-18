"""Script to seed database."""

import os

from model import connect_to_db, db, Inventory
import server

# Run dropdb and createdb to re-create database
os.system("dropdb inventory --if-exists")
os.system("createdb inventory")

# Connect to the database and call db.create_all
connect_to_db(server.app)
db.create_all()

inventory1 = Inventory.create_inventory("San Francisco", "53HA4DWH", 50)
inventory2 = Inventory.create_inventory("Los Angeles", "65SH4FGF", 50)
inventory3 = Inventory.create_inventory("San Jose", "69DI1HCU", 50)
inventory4 = Inventory.create_inventory("Long Beach", "84QZ3GVS", 75)

inventory5 = Inventory.create_inventory("Irvine", "53HA4DWH", 10, deleted=True, comments="This batch went bad")

db.session.add_all([inventory1, inventory2, inventory3, inventory4, inventory5])
db.session.commit()

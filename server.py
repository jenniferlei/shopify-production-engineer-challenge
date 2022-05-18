"""Server for Inventory app."""

from flask import Flask, render_template, jsonify, request
import os
from datetime import datetime
import requests

from model import connect_to_db, db, Inventory

app = Flask(__name__)

app.secret_key = os.environ["APP_SECRET_KEY"]


def validate_fields(city="Los Angeles", sku="1", quantity=1):
    """Form fields error handling"""
    if not str(sku).isalnum() or \
       len(str(sku)) > 8 or \
       not str(quantity).isnumeric() or \
       city == "" or \
       sku == "" or \
       quantity == "" or \
       int(quantity) < 0 or \
       int(quantity) > 2147483647:
        return False
    return True


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("index.html")


@app.route("/api/create_inventory", methods=["POST"])
def create_inventory():
    """Create an inventory row and return a JSON response of inventories"""

    city = request.get_json().get("city")
    sku = request.get_json().get("sku")
    quantity = request.get_json().get("quantity")
    description = request.get_json().get("description")

    if not validate_fields(city, sku, quantity):
        return jsonify(data="invalid input", status=400)

    inventory_row = Inventory.create_inventory(city, sku, int(quantity), description)
    db.session.add(inventory_row)
    db.session.commit()
    
    inventory_json = inventory_row.to_dict()

    return jsonify(data=inventory_json, status=200)


@app.route("/api/inventory", methods=["GET"])
def view_inventory():
    """Return a JSON response of inventory rows"""

    inventory_rows = Inventory.retrieve_inventory()
    inventory_json = [i.to_dict() for i in inventory_rows]
    
    return jsonify(data=inventory_json)


@app.route("/api/inventory/status:<status>", methods=["GET"])
def view_inventory_by_status(status):
    """Return a JSON response of inventory rows given deletion status"""
    
    if status == "0":
        status = False
    if status == "1":
        status = True

    inventory_rows = Inventory.retrieve_inventory_by_status(status)
    inventory_json = [i.to_dict() for i in inventory_rows]
    
    return jsonify(data=inventory_json)


@app.route("/api/update_inventory/id:<inventory_id>", methods=["PUT"])
def update_inventory(inventory_id):
    """Update and return a JSON response of inventories"""

    city = request.get_json().get("city")
    sku = request.get_json().get("sku")
    quantity = request.get_json().get("quantity")
    description = request.get_json().get("description")

    if not validate_fields(city, sku, quantity):
        return jsonify(data="invalid input", status=400)

    inventory_row = Inventory.retrieve_inventory_by_inventory_id(inventory_id)

    if not inventory_row:
        return jsonify(data="item does not exist", status=400)
    
    if inventory_row.deleted:
        return jsonify(data="cannot update deleted item", status=400)

    inventory_row.city = city
    inventory_row.sku = sku
    inventory_row.quantity = int(quantity)
    inventory_row.description = description
    inventory_row.updated = datetime.now()
    db.session.commit()
    
    inventory_json = inventory_row.to_dict()

    return jsonify(data=inventory_json, status=200)


@app.route("/api/delete_inventory/id:<inventory_id>", methods=["PUT"])
def delete_inventory(inventory_id):
    """Delete an inventory row"""

    inventory_row = Inventory.retrieve_inventory_by_inventory_id(inventory_id)

    if not inventory_row:
        return jsonify(data="item does not exist", status=400)

    if inventory_row.deleted:
        return jsonify(data="item is already deleted", status=400)

    inventory_row.comments = request.get_json().get("comments")
    inventory_row.deleted = True
    inventory_row.updated = datetime.now()
    db.session.commit()
    
    inventory_json = inventory_row.to_dict()

    return jsonify(data=inventory_json, status=200)


@app.route("/api/restore_inventory/id:<inventory_id>", methods=["PUT"])
def restore_inventory(inventory_id):
    """Restore a deleted inventory row"""

    inventory_row = Inventory.retrieve_inventory_by_inventory_id(inventory_id)

    if not inventory_row:
        return jsonify(data="item does not exist", status=400)

    if not inventory_row.deleted:
        return jsonify(data="item is already active", status=400)

    inventory_row.deleted = False
    inventory_row.updated = datetime.now()
    db.session.commit()
    
    inventory_json = inventory_row.to_dict()
    
    return jsonify(data=inventory_json, status=200)


@app.route("/weather", methods=["GET"])
def get_weather():
    """Get current weather for city."""
    
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    url = f"http://api.openweathermap.org/data/2.5/weather"
    payload = {"lat": lat,
               "lon": lon,
               "units": "imperial",
               "appid": os.environ["OPEN_WEATHER_KEY"]}
    res = requests.get(url, params=payload)
    weather = res.json()

    return jsonify(weather=weather)


if __name__ == "__main__":
    # DebugToolbarExtension(app)
    os.system("createdb inventory")
    connect_to_db(app)
    db.create_all()
    app.run(host="0.0.0.0", debug=True)

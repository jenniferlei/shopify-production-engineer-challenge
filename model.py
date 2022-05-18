"""Models for Inventory app."""

from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

db = SQLAlchemy()

class Inventory(db.Model):
    """A product inventory."""

    __tablename__ = "inventories"

    inventory_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    warehouse_id = db.Column(db.Integer, nullable=False) # Can add a table for warehouse storage info and change this to a foreign key
    sku = db.Column(db.String(8), nullable=False) # Can add a table for product info and change this to a foreign key
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String)
    created = db.Column(db.DateTime, nullable=False)
    updated = db.Column(db.DateTime, nullable=False)
    deleted = db.Column(db.Boolean, nullable=False, default=False)
    comments = db.Column(db.Text, default=None)

    def __repr__(self):
        return f"<Inventory id={self.inventory_id} sku={self.sku} qty={self.quantity}>"

    def to_dict(self):
        return {
            "inventory_id": self.inventory_id,
            "warehouse_id": self.warehouse_id,
            "sku": self.sku,
            "quantity": self.quantity,
            "description": self.description,
            "created": self.created.strftime("%m/%d/%Y, %H:%M:%S"),
            "updated": self.updated.strftime("%m/%d/%Y, %H:%M:%S"),
            "deleted": self.deleted,
            "comments": self.comments,
        }

    @classmethod
    def create_inventory(cls, warehouse_id, sku, quantity, description=None,
        created=datetime.now(), updated=datetime.now(), deleted=False, comments=None):
        """Create inventory"""

        inventory = cls(warehouse_id=warehouse_id, sku=sku, quantity=quantity,
            description=description, created=created, updated=updated, deleted=deleted, comments=comments)

        return inventory

    @classmethod
    def retrieve_inventory(cls):
        """Retrieve all inventory rows"""

        return (db.session.query(cls)
                          .order_by(cls.inventory_id.asc())
                          .all())

    @classmethod
    def retrieve_inventory_by_status(cls, status):
        """Retrieve inventory rows by deletion status"""

        return (db.session.query(cls)
                          .filter_by(deleted=status)
                          .order_by(cls.inventory_id.asc())
                          .all())

    @classmethod
    def retrieve_inventory_by_inventory_id(cls, inventory_id):
        """Retrieve inventory row by inventory_id"""

        return db.session.query(cls).get(inventory_id)


def connect_to_db(flask_app, db_uri="postgresql:///inventory", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


def example_data():
    """Create example data for the test database."""
    
    inventory1 = Inventory.create_inventory(1, "53HA4DWH", 50)
    inventory2 = Inventory.create_inventory(1, "65SH4FGF", 50)
    inventory3 = Inventory.create_inventory(1, "69DI1HCU", 50)
    inventory4 = Inventory.create_inventory(1, "84QZ3GVS", 75)

    inventory5 = Inventory.create_inventory(1, "53HA4DWH", 10, deleted=True, comments="This batch went bad")

    db.session.add_all([inventory1, inventory2, inventory3, inventory4, inventory5])
    db.session.commit()


if __name__ == "__main__":
    from server import app

    connect_to_db(app)

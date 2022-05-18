"use strict";

const PRODUCTS = [
  { sku: "66BI8PMZ", productName: "Ai Yu Jelly", unit: "carton" },
  { sku: "47LS3QEJ", productName: "Almond Jelly", unit: "carton" },
  { sku: "21TZ4RWZ", productName: "Almond Milk Tea", unit: "box" },
  { sku: "92JD1VKP", productName: "Aloe", unit: "carton" },
  { sku: "81LN5TUG", productName: "Black Tea", unit: "box" },
  { sku: "87OQ4BZR", productName: "Boba", unit: "carton" },
  { sku: "01XM0TPK", productName: "Chai Tea", unit: "box" },
  { sku: "35WC3SHH", productName: "Coconut Jelly", unit: "carton" },
  { sku: "28OC1KQP", productName: "Coffee Jelly", unit: "carton" },
  { sku: "14RJ1RKR", productName: "Egg Pudding", unit: "carton" },
  { sku: "39RS4OCT", productName: "Grass Jelly", unit: "carton" },
  { sku: "65SH4FGF", productName: "Honey Milk Tea", unit: "box" },
  { sku: "09VI7CCV", productName: "Honeydew Tea", unit: "box" },
  { sku: "22BC8VMW", productName: "Jasmine Green Tea", unit: "box" },
  { sku: "84QZ3GVS", productName: "Kiwi Tea", unit: "box" },
  { sku: "69IO7VUW", productName: "Lychee Tea", unit: "box" },
  { sku: "51KT1PSU", productName: "Mango Tea", unit: "box" },
  { sku: "53HA4DWH", productName: "Matcha Tea", unit: "box" },
  { sku: "52KN0DZE", productName: "Milk Tea", unit: "box" },
  { sku: "30SU8TVC", productName: "Mint Tea", unit: "box" },
  { sku: "01UG9SDM", productName: "Mochi", unit: "carton" },
  { sku: "15DB9AGF", productName: "Oolong Tea", unit: "box" },
  { sku: "17GX0VAR", productName: "Passion Fruit Tea", unit: "box" },
  { sku: "69DI1HCU", productName: "Peach Tea", unit: "box" },
  { sku: "45NF0QOB", productName: "Popping Boba", unit: "carton" },
  { sku: "91WM3ILX", productName: "Red Bean", unit: "carton" },
  { sku: "79FW3YBZ", productName: "Roasted Brown Sugar Tea", unit: "box" },
  { sku: "22KQ4DTO", productName: "Rose Tea", unit: "box" },
  { sku: "20PV6SQJ", productName: "Taro Tea", unit: "box" },
  { sku: "56VI2RWA", productName: "Thai Tea", unit: "box" },
];

const getProductName = (sku) => {
  const product = PRODUCTS.find((item) => item.sku === sku);
  return [product.productName, product.unit];
};

const validateForm = (warehouseId, sku, qty) => {
  if (
    warehouseId === "" ||
    sku === "" ||
    qty === "" ||
    Number(qty) < 0 ||
    Number(qty) > 2147483647 ||
    !Number.isInteger(Number(qty)) ||
    isNaN(Number(qty))
  ) {
    return false;
  }
  return true;
};

const UpdateInventoryModal = (props) => {
  const [warehouseId, setWarehouseId] = React.useState(props.warehouseId);
  const [sku, setSku] = React.useState(props.sku);
  const [quantity, setQuantity] = React.useState(props.quantity);
  const [description, setDescription] = React.useState(props.description);
  const [productName, unit] = getProductName(props.sku);

  const validateUpdateForm = () => {
    if (validateForm(warehouseId, sku, quantity)) {
      updateExistingInventory();
    } else {
      alert("Please enter valid input");
    }
  };

  const updateExistingInventory = () => {
    fetch(`/api/update_inventory/id:${props.inventoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        warehouseId,
        sku,
        quantity,
        description,
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (props.view === "active") {
          props.getActiveInventory();
        } else {
          props.getAllInventory();
        }
      });
  };

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id={`modal-update-inventory-${props.inventoryId}`}
        tabIndex="-1"
        aria-labelledby={`modal-update-inventory-${props.inventoryId}-label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`modal-update-inventory-${props.inventoryId}-label`}
              >
                Update Inventory Row
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="warehouseId">
                  Warehouse ID <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Select Warehouse ID"
                  id="warehouse-id"
                  onChange={(event) => setWarehouseId(event.target.value)}
                >
                  <option value={props.warehouseId} selected>
                    {props.warehouseId}
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((wh) => (
                    <option value={wh}>{wh}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="sku">
                  SKU <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Select SKU"
                  id="sku"
                  onChange={(event) => setSku(event.target.value)}
                >
                  <option value={props.sku} selected>
                    {props.sku} {productName}
                  </option>
                  {PRODUCTS.map((x) => (
                    <option value={x.sku}>
                      {x.sku} {x.productName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="body"
                  rows="2"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="totalTimeInput">
                  Quantity <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <small className="text-muted">
                  Please enter a qty between 0 and 2147483647
                </small>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="form-control input-lg"
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-dark btn-block"
                  type="submit"
                  data-bs-dismiss="modal"
                  onClick={validateUpdateForm}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary btn-block"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const DeleteInventoryModal = (props) => {
  const [comments, setComments] = React.useState("");

  const deleteExistingInventory = () => {
    fetch(`/api/delete_inventory/id:${props.inventoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        comments,
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (props.view === "active") {
          props.getActiveInventory();
        } else {
          props.getAllInventory();
        }
      });
  };

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id={`modal-delete-inventory-${props.inventoryId}`}
        tabIndex="-1"
        aria-labelledby={`modal-delete-inventory-${props.inventoryId}-label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`modal-delete-inventory-${props.inventoryId}-label`}
              >
                Delete Inventory Row
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="comment">Deletion Comments</label>
                <textarea
                  className="form-control"
                  name="body"
                  rows="2"
                  onChange={(event) => setComments(event.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-dark btn-block"
                  type="submit"
                  data-bs-dismiss="modal"
                  onClick={deleteExistingInventory}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary btn-block"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const InventoryTableRow = (props) => {
  const [productName, unit] = getProductName(props.sku);

  const restoreInventory = () => {
    fetch(`/api/restore_inventory/id:${props.inventoryId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (props.view === "deleted") {
          props.getDeletedInventory();
        } else {
          props.getAllInventory();
        }
      });
  };
  return (
    <tr>
      <td>
        <span>
          <small>{props.inventoryId}</small>
        </span>
      </td>
      <td>
        <span>
          <small>{props.warehouseId}</small>
        </span>
      </td>
      <td>
        <span>
          <small>{props.sku}</small>
        </span>
      </td>
      <td>
        <span>
          <small>{productName}</small>
        </span>
      </td>
      <td>
        <span>
          <small>{props.description}</small>
        </span>
      </td>
      <td>
        <span>
          <small>{props.quantity}</small>
        </span>
      </td>
      <td>
        <span>
          <small>{unit}</small>
        </span>
      </td>
      {props.view === "active" ? (
        <React.Fragment>
          <td>
            <span>
              <a
                href=""
                className="btn btn-sm btn-outline-dark edit-btn"
                data-bs-toggle="modal"
                data-bs-target={`#modal-update-inventory-${props.inventoryId}`}
              >
                <small>
                  <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="update inventory"
                    className="bi bi-pencil"
                  ></i>
                </small>
              </a>
            </span>
          </td>
          <td>
            <span>
              <a
                href=""
                className="btn btn-sm btn-outline-dark delete-btn"
                data-bs-toggle="modal"
                data-bs-target={`#modal-delete-inventory-${props.inventoryId}`}
              >
                <small>
                  <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="delete inventory"
                    className="bi bi-x"
                  ></i>
                </small>
              </a>
            </span>
          </td>
        </React.Fragment>
      ) : props.view === "deleted" ? (
        <React.Fragment>
          <td>
            <span>
              <small>{props.comments}</small>
            </span>
          </td>
          <td>
            <span>
              <button
                className="btn btn-sm btn-outline-dark delete-btn"
                onClick={restoreInventory}
              >
                <small>
                  <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="restore inventory"
                    className="bi bi-plus"
                  ></i>
                </small>
              </button>
            </span>
          </td>
        </React.Fragment>
      ) : props.deleted === false ? (
        <React.Fragment>
          <td>
            <small>Active</small>
          </td>
          <td></td>
          <td>
            <span>
              <a
                href=""
                className="btn btn-sm btn-outline-dark edit-btn"
                data-bs-toggle="modal"
                data-bs-target={`#modal-update-inventory-${props.inventoryId}`}
              >
                <small>
                  <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="update inventory"
                    className="bi bi-pencil"
                  ></i>
                </small>
              </a>
            </span>
            <span>
              <a
                href=""
                className="btn btn-sm btn-outline-dark delete-btn"
                data-bs-toggle="modal"
                data-bs-target={`#modal-delete-inventory-${props.inventoryId}`}
              >
                <small>
                  <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="delete inventory"
                    className="bi bi-x"
                  ></i>
                </small>
              </a>
            </span>
          </td>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <td>
            <small>Deleted</small>
          </td>
          <td>
            <span>
              <small>{props.comments}</small>
            </span>
          </td>
          <td>
            <span>
              <button
                className="btn btn-sm btn-outline-dark delete-btn"
                onClick={restoreInventory}
              >
                <small>
                  <i
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="restore inventory"
                    className="bi bi-plus"
                  ></i>
                </small>
              </button>
            </span>
          </td>
        </React.Fragment>
      )}
    </tr>
  );
};

const InventoryContainer = () => {
  const [view, setView] = React.useState("active");
  const [inventories, setInventories] = React.useState([]);
  const [warehouseId, setWarehouseId] = React.useState("");
  const [sku, setSku] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    getActiveInventory();
  }, []);

  const getActiveInventory = () => {
    fetch("/api/inventory/status:0")
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setInventories(jsonResponse.data);
        setView("active");
      });
  };

  const getDeletedInventory = () => {
    fetch("/api/inventory/status:1")
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setInventories(jsonResponse.data);
        setView("deleted");
      });
  };

  const getAllInventory = () => {
    fetch("/api/inventory")
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setInventories(jsonResponse.data);
        setView("all");
      });
  };

  const validateAddForm = () => {
    if (validateForm(warehouseId, sku, quantity)) {
      addInventoryRow();
    } else {
      alert("Please enter valid input");
    }
  };

  const addInventoryRow = () => {
    fetch("/api/create_inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        warehouseId,
        sku,
        quantity,
        description,
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (view === "active") {
          getActiveInventory();
        } else {
          getAllInventory();
        }
      });
  };

  const allInventoryRows = [];
  const allUpdateInventoryRow = [];
  const allDeleteInventoryRow = [];

  for (const inventoryRow of inventories) {
    allInventoryRows.push(
      <InventoryTableRow
        key={inventoryRow.inventory_id}
        inventoryId={inventoryRow.inventory_id}
        warehouseId={inventoryRow.warehouse_id}
        sku={inventoryRow.sku}
        description={inventoryRow.description}
        quantity={inventoryRow.quantity}
        comments={inventoryRow.comments}
        deleted={inventoryRow.deleted}
        view={view}
        getActiveInventory={getActiveInventory}
        getDeletedInventory={getDeletedInventory}
        getAllInventory={getAllInventory}
      />
    );

    allUpdateInventoryRow.push(
      <UpdateInventoryModal
        key={inventoryRow.inventory_id}
        inventoryId={inventoryRow.inventory_id}
        warehouseId={inventoryRow.warehouse_id}
        sku={inventoryRow.sku}
        description={inventoryRow.description}
        quantity={inventoryRow.quantity}
        view={view}
        getActiveInventory={getActiveInventory}
        getAllInventory={getAllInventory}
      />
    );

    allDeleteInventoryRow.push(
      <DeleteInventoryModal
        key={inventoryRow.inventory_id}
        inventoryId={inventoryRow.inventory_id}
        warehouseId={inventoryRow.warehouse_id}
        sku={inventoryRow.sku}
        description={inventoryRow.description}
        quantity={inventoryRow.quantity}
        view={view}
        getActiveInventory={getActiveInventory}
        getAllInventory={getAllInventory}
      />
    );
  }

  return (
    <React.Fragment>
      {allUpdateInventoryRow}
      {allDeleteInventoryRow}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            BOBA Logistics - Inventory Tracking
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link btn" onClick={getActiveInventory}>
                  View Active
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn" onClick={getDeletedInventory}>
                  View Deleted
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn" onClick={getAllInventory}>
                  View All
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn"
                  target="_blank"
                  href="https://github.com/jenniferlei/shopify-backend-developer-challenge"
                >
                  Github
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn"
                  target="_blank"
                  href="https://shopify-backend-developer-challenge.jenniferlei.repl.co"
                >
                  Replit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row" style={{ width: "100vw" }}>
        <div className="col-3">
          <div className="card ms-2">
            <div className="card-header">
              <h6 className="mt-2">Add Inventory</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="warehouseId">
                  Warehouse ID <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Select Warehouse ID"
                  onChange={(event) => setWarehouseId(event.target.value)}
                >
                  <option value="" selected></option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((wh) => (
                    <option value={wh}>{wh}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="sku">
                  SKU <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Select SKU"
                  id="sku"
                  onChange={(event) => setSku(event.target.value)}
                >
                  <option value="" selected></option>
                  {PRODUCTS.map((x) => (
                    <option value={x.sku}>
                      {x.sku} {x.productName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="body"
                  rows="2"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="quantity">
                  Quantity <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <small className="text-muted">
                  Please enter a qty between 0 and 2147483647
                </small>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="form-control input-lg"
                />
              </div>

              <button
                className="btn btn-sm btn-outline-dark btn-block"
                type="submit"
                onClick={validateAddForm}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="card">
            <div className="card-header">
              <h6 className="mt-2">
                {view === "active" ? (
                  <React.Fragment>Active Inventory</React.Fragment>
                ) : view === "deleted" ? (
                  <React.Fragment>Deleted Inventory</React.Fragment>
                ) : (
                  <React.Fragment>All Inventory</React.Fragment>
                )}
              </h6>
            </div>
            <div className="card-body me-2">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th role="columnheader">ID</th>
                    <th role="columnheader">Warehouse</th>
                    <th role="columnheader">SKU</th>
                    <th role="columnheader">Product Name</th>
                    <th role="columnheader">Description</th>
                    <th role="columnheader">Quantity</th>
                    <th role="columnheader">Unit</th>
                    {view === "active" ? (
                      <React.Fragment>
                        <th role="columnheader">Edit</th>
                        <th role="columnheader">Delete</th>
                      </React.Fragment>
                    ) : view === "deleted" ? (
                      <React.Fragment>
                        <th role="columnheader">Comments</th>
                        <th role="columnheader">Restore</th>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <th role="columnheader">Status</th>
                        <th role="columnheader">
                          Comments <small>(Deleted)</small>
                        </th>
                        <th role="columnheader">Actions</th>
                      </React.Fragment>
                    )}
                  </tr>
                </thead>

                <tbody>{allInventoryRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<InventoryContainer />, document.getElementById("root"));

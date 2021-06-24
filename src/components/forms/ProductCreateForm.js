import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleCategoryChange,
  handleChange,
  values,
  subOptions,
  showSub,
  setValues,
  sub,
}) => {
  // destructure
  const {
    title,
    description,

    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    sizes,
    variants,
    size,
    variant,
  } = values;

  return (
    <div className="container-bright col-md-10">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="The Pomfret"
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            placeholder="The slightly pricey SEA favourite."
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select an option:</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            placeholder="input quantity in stock"
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Size</label>
          <select name="size" className="form-control" onChange={handleChange}>
            <option>Please select an option:</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Variant</label>
          <select
            name="variant"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select an option:</option>
            {variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Tag selected category in the dropdown</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {showSub && (
          <>
            <label>tags</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="please select..."
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </>
        )}
        <button className="btn btn-outline-info">save</button>
      </form>
    </div>
  );
};

export default ProductCreateForm;

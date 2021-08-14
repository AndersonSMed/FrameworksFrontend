import './ProductForm.css';

export default function ProductForm() {
  return (
    <form className="product-form">
      <label>
        Title
        <input
          placeholder="Smart Watch"
          required
        />
      </label>
      <label>
        Description
        <textarea
          placeholder="This is a nice smart watch used to monitor your life"
          required
        />
      </label>
      <label>
        Price
        <input
          type="number"
          placeholder="99.99"
          required
        />
      </label>
      <label>
        Image URL
        <input
          type="url"
          placeholder="http://image.jpg"
        />
      </label>
      <button type="submit">
        Save Changes
      </button>
    </form>
  );
}
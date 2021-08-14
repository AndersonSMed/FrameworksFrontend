import { useState, useEffect } from 'react'; 
import './ProductForm.css';
import { useYup } from './validators';

export default function ProductForm() {
  const schema = useYup({
    title: {
      type: 'text',
      required: true 
    },
    description: {
      type: 'text',
      required: true 
    },
    price: {
      type: 'number',
      required: true 
    },
    imageSrc: { type: 'url' }
  });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    imageSrc: ''
  });
  const [error, setError] = useState(null);

  const getError = field =>
    (error && error.startsWith(field))
      ? error.split(' ').slice(1).join(' ')
      : null;
  const getField = field => formData[field];
  const setField = field => event =>
    setFormData(previousForm => ({ ...previousForm, [field]: event.target.value }));

  useEffect(() => {
    schema
      .validate(formData)
      .then(() => setError(null))
      .catch((err) => setError(err && err.message));
  }, [schema, formData]);

  return (
    <form className="product-form">
      <label>
        Title
        <input
          value={getField('title')}
          onChange={setField('title')}
          placeholder="Smart Watch"
        />
        {
          getError('title') && (
            <span className="product-form__error-message">
              {getError('title')}
            </span>
          )
        }
      </label>
      <label>
        Description
        <textarea
          value={getField('description')}
          onChange={setField('description')}
          placeholder="This is a nice smart watch used to monitor your life"
        />
        {
          getError('description') && (
            <span className="product-form__error-message">
              {getError('description')}
            </span>
          )
        }
      </label>
      <label>
        Price
        <input
          value={getField('price')}
          onChange={setField('price')}
          type="number"
          placeholder="99.99"
        />
        {
          getError('price') && (
            <span className="product-form__error-message">
              {getError('price')}
            </span>
          )
        }
      </label>
      <label>
        Image URL
        <input
          value={getField('imageSrc')}
          onChange={setField('imageSrc')}
          type="url"
          placeholder="http://image.jpg"
        />
        {
          getError('imageSrc') && (
            <span className="product-form__error-message">
              {getError('imageSrc')}
            </span>
          )
        }
      </label>
      <button type="submit" disabled={!!error}>
        Save Changes
      </button>
    </form>
  );
}
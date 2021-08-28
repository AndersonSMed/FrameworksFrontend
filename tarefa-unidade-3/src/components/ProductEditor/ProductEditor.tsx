import { Button, Checkbox, Modal, TextareaAutosize, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { ProductInterface } from "../interfaces";
import './ProductEditor.scss';

export interface ProductEditorProps {
  title: string;
  initialValues?: ProductInterface;
  onSubmit?: (data: ProductInterface) => void;
}

export function ProductEditor({ title, initialValues, onSubmit }: ProductEditorProps) {
  const defaultIntialValues = {
    title: '',
    description: '',
    price: 0.00,
    imageSrc: '',
    imageLabel: '',
    outOfStock: false
  };

  return (
    <div className="product-editor">
      {title && <div className="product-editor__title">{title}</div>}
      <Formik
        initialValues={initialValues || defaultIntialValues}
        onSubmit={values => {
          if(onSubmit) onSubmit(values);
        }}
        validate={values => {
          let errors = {};
          if (!values.title) errors = { ...errors, title: 'Title is Required' };
          if (!values.description) errors = { ...errors, description: 'Description is Required' };
          if (!values.price) errors = { ...errors, price: 'Price is Required' };

          return errors;
        }}
        validateOnMount
      >
        {({ errors, values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label className="product-editor__label">
              Title
              <TextField
                type="text"
                name="title"
                placeholder="Smart Watch"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                required
              />
            </label>
            <label className="product-editor__label">
              Description
              <TextareaAutosize
                placeholder="This is a Cool Smart Watch"
                name="description"
                minRows={10}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                required
              />
            </label>
            <label className="product-editor__label">
              Price
              <TextField
                placeholder="100.0"
                type="number"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                required
              />
            </label>
            <label className="product-editor__label">
              Image URL
              <TextField
                placeholder="https://smartwatch.jpg"
                type="url"
                name="imageSrc"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.imageSrc}
              />
            </label>
            <label className="product-editor__label">
              Image Description
              <TextField
                placeholder="Smart Watch floating over the screen"
                type="text"
                name="imageLabel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.imageLabel}
              />
            </label>
            <label className="product-editor__label product-editor__label--inline">
              Is Out of Stock?
              <Checkbox
                name="outOfStock"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={Boolean(values.outOfStock)}
              />
            </label>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="product-editor__submit-button"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Confirm
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

ProductEditor.defaultProps = Object.freeze({
  title: ''
});

function ModalProductEditor() {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open
    >
      <ProductEditor />
    </Modal>
  );
}

export default ModalProductEditor;
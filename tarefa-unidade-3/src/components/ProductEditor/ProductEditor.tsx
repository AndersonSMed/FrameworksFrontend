import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IProduct } from '../../interfaces';
import './ProductEditor.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { hasErrorsFromKey } from '../../common';

export interface ProductEditorProps {
  initialValues?: IProduct;
  onSubmit?: (data: IProduct) => void;
}

export interface ModalProductEditorProps extends ProductEditorProps {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const defaultIntialValues = Object.freeze({
  title: '',
  description: '',
  price: 0.0,
  imageSrc: '',
  imageLabel: '',
  outOfStock: false,
});

const valuesSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(0),
  imageSrc: yup.string().url(),
  imageLabel: yup.string(),
  outOfStock: yup.bool().default(false),
});

function ProductEditor({ initialValues, onSubmit }: ProductEditorProps): JSX.Element {
  return (
    <Formik
      initialValues={initialValues || defaultIntialValues}
      onSubmit={(values) => {
        if (onSubmit) onSubmit(values);
      }}
      validate={(values) => {
        try {
          valuesSchema.validateSync(values);
          return [];
        } catch ({ errors }) {
          return errors as Array<string>;
        }
      }}
      validateOnMount
    >
      {({ errors, values, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
        const parsedErrors =
          typeof errors === 'object' ? Object.values(errors) : (errors as Array<string>);
        const hasErrors = parsedErrors.length > 0;

        return (
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
                error={hasErrorsFromKey('title', parsedErrors)}
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
                error={hasErrorsFromKey('price', parsedErrors)}
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
                error={hasErrorsFromKey('imageSrc', parsedErrors)}
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
                error={hasErrorsFromKey('imageLabel', parsedErrors)}
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
            {hasErrors && <ErrorMessage message={parsedErrors[0]} />}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="product-editor__submit-button"
              disabled={isSubmitting || hasErrors}
            >
              Confirm
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

function ModalProductEditor({
  title,
  isOpen,
  onClose,
  ...restOfProps
}: ModalProductEditorProps): JSX.Element {
  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  return (
    <Dialog disableEnforceFocus disableAutoFocus open={!!isOpen} onClose={handleCloseModal}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent className="product-editor">
        <IconButton onClick={handleCloseModal} aria-label="Close Editor">
          <CloseIcon />
        </IconButton>
        <ProductEditor {...restOfProps} />
      </DialogContent>
    </Dialog>
  );
}

ModalProductEditor.defaultProps = Object.freeze({
  title: '',
});

export default ModalProductEditor;

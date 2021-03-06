import { useState } from 'react';
import {
  TableCell,
  TableHead,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import CheckedIcon from '@material-ui/icons/CheckBox';
import UncheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { formatPrice, getProductWithoutId } from '../../common';
import { IProduct, IProductWithKey } from '../../interfaces';
import './ProductsTable.scss';
import ProductEditor from '../ProductEditor/ProductEditor';
import Spinner from '../Spinner/Spinner';

export interface ProductsTableProps {
  items: IProductWithKey[];
  isLoading: boolean;
  onDelete?: (productId: string) => void;
  onEdit?: (productId: string, productData: IProduct) => void;
}

export interface IEditorModal {
  isOpen: boolean;
  product?: IProductWithKey;
}

// TODO: Add a confirmation dialog when clicking on delete product
function ProductsTable({ items, isLoading, onEdit, onDelete }: ProductsTableProps): JSX.Element {
  const [editorModal, setEditorModal] = useState<IEditorModal>({
    isOpen: false,
  });
  const editorInitialValues = editorModal.product
    ? getProductWithoutId(editorModal.product)
    : undefined;

  const openProductEditor = (product: IProductWithKey) => () => {
    setEditorModal({ isOpen: true, product });
  };
  const closeProductEditor = () => {
    setEditorModal((previousData) => ({ ...previousData, isOpen: false }));
  };

  const handleProductDelete = (product: IProductWithKey) => () => {
    if (onDelete) onDelete(product.productId);
  };
  const handleEditProduct = (product: IProduct) => {
    if (onEdit) onEdit(editorModal.product?.productId || '', product);
    closeProductEditor();
  };

  return (
    <div className="products-table">
      <TableContainer component={Paper}>
        <Table aria-label="Products table">
          <TableHead>
            <TableRow>
              <TableCell className="products-table__table-header">Title</TableCell>
              <TableCell className="products-table__table-header">Description</TableCell>
              <TableCell className="products-table__table-header">Price</TableCell>
              <TableCell className="products-table__table-header">Image URL</TableCell>
              <TableCell className="products-table__table-header">Image Description</TableCell>
              <TableCell className="products-table__table-header" align="center">
                Out of Stock
              </TableCell>
              <TableCell className="products-table__table-header" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {items.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      {product.imageSrc ? (
                        <a
                          href={product.imageSrc}
                          target="_blank"
                          rel="noreferrer"
                          className="products-table__image-src"
                        >
                          {product.imageSrc}
                        </a>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>{product.imageLabel}</TableCell>
                    <TableCell align="center">
                      {product.outOfStock ? (
                        <CheckedIcon
                          aria-hidden={false}
                          role="img"
                          aria-label={`Product ${product.title} is out of stock`}
                        />
                      ) : (
                        <UncheckedIcon
                          aria-hidden={false}
                          role="img"
                          aria-label={`Product ${product.title} is not out of stock`}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="products-table__actions-wrapper">
                        <Tooltip title={`Edit ${product.title}`}>
                          <span>
                            <IconButton
                              aria-label={`Edit ${product.title}`}
                              onClick={openProductEditor(product)}
                            >
                              <EditIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title={`Delete ${product.title}`}>
                          <span>
                            <IconButton
                              aria-label={`Delete ${product.title}`}
                              onClick={handleProductDelete(product)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No products were found
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductEditor
        isOpen={editorModal.isOpen}
        title={editorModal.product ? `Editing ${editorModal.product.title}` : ''}
        initialValues={editorInitialValues}
        onClose={closeProductEditor}
        onSubmit={handleEditProduct}
      />
    </div>
  );
}

ProductsTable.defaultProps = Object.freeze({
  items: [],
  isLoading: false,
});

export default ProductsTable;

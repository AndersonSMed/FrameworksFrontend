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
import { formatPrice } from '../../common';
import { IProductWithKey } from '../../interfaces';
import './ProductsTable.scss';
import ProductEditor from '../ProductEditor/ProductEditor';

export interface ProductsTableProps {
  items: IProductWithKey[];
}

export interface IEditorModal {
  isOpen: boolean;
  product?: IProductWithKey;
}

function ProductsTable({ items }: ProductsTableProps): JSX.Element {
  const [editorModal, setEditorModal] = useState<IEditorModal>({
    isOpen: false,
  });

  const handleProductEdition = (product: IProductWithKey) => () => {
    setEditorModal({ isOpen: true, product });
  };
  const handleProductRemove = (product: IProductWithKey) => () => {};
  const handleCloseModal = () => {
    setEditorModal((previousData) => ({ ...previousData, isOpen: false }));
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
            {items.map((product) => (
              <TableRow key={product.uuid}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  {product.imageSrc ? (
                    <a href={product.imageSrc} target="_blank" rel="noreferrer">
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
                <TableCell align="center">
                  <div className="products-table__table-actions">
                    <Tooltip title={`Edit ${product.title}`}>
                      <span>
                        <IconButton
                          aria-label={`Edit ${product.title}`}
                          onClick={handleProductEdition(product)}
                        >
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title={`Delete ${product.title}`}>
                      <span>
                        <IconButton
                          aria-label={`Delete ${product.title}`}
                          onClick={handleProductRemove(product)}
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
          </TableBody>
        </Table>
      </TableContainer>
      <ProductEditor
        isOpen={editorModal.isOpen}
        title={editorModal.product ? `Editing ${editorModal.product.title}` : ''}
        initialValues={editorModal.product ? editorModal.product : undefined}
        onClose={handleCloseModal}
        onSubmit={() => {}}
      />
    </div>
  );
}

ProductsTable.defaultProps = Object.freeze({
  items: [],
});

export default ProductsTable;

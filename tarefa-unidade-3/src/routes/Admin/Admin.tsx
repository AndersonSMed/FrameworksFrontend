import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ProductEditor, ProductsTable } from '../../components';
import { RootState } from '../../store';
import {
  createAdminProduct,
  deleteAdminProduct,
  loadAdminProducts,
  updateAdminProduct,
} from '../../store/thunks/adminThunk';
import './Admin.scss';
import { IProduct } from '../../interfaces';

function Admin(): JSX.Element {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state: RootState) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductEdition = (productId: string, productData: IProduct) => {
    dispatch(updateAdminProduct(productId, productData));
  };

  const handleProductDeletion = (productId: string) => {
    dispatch(deleteAdminProduct(productId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitModal = (newProduct: IProduct) => {
    dispatch(createAdminProduct(newProduct));
    handleCloseModal();
  };

  useEffect(() => {
    dispatch(loadAdminProducts());
  }, []);

  return (
    <div className="admin">
      <Header />
      <div className="admin__wrapper">
        <h1 className="admin__title">
          Managing Products
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setIsModalOpen(true);
            }}
            disabled={isLoading}
          >
            New Product
          </Button>
        </h1>
        <ProductsTable
          items={products}
          isLoading={isLoading}
          onEdit={handleProductEdition}
          onDelete={handleProductDeletion}
        />
        <ProductEditor
          isOpen={isModalOpen}
          title="Creating New Product"
          onSubmit={handleSubmitModal}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default Admin;

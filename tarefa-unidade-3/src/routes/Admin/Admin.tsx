import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ProductEditor, ProductsTable } from '../../components';
import { RootState } from '../../store';
import { createAdminProduct, loadAdminProducts } from '../../store/thunks/adminThunk';
import './Admin.scss';
import { IProduct } from '../../interfaces';

// TODO: Add loader when products are loading
// TODO: Enable product edition
// TODO: Enable product remotion
function Admin(): JSX.Element {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.admin.products);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductEdition = (productId: string, productData: IProduct) => {};

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
          >
            New Product
          </Button>
        </h1>
        <ProductsTable items={products} onEdit={handleProductEdition} />
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

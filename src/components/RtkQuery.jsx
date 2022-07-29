import React, { useState } from 'react';
import {
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} from '../redux';

const RtkQuery = () => {
  const [newProduct, setNewProduct] = useState('');
  const [catchProduct, setCatchProduct] = useState('');
  // mutations
  const { data = [], isError, isLoading } = useGetProductQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editProduct] = useEditProductMutation();

  const handleAddProduct = async () => {
    if (newProduct !== '') {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    // console.log(id);
  };
  const handleEditProduct = (itemId) => {
    if (catchProduct !== '') {
      editProduct({ main: catchProduct, id: itemId });
    }

    setCatchProduct('');
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong. Check the console</h1>;

  return (
    <>
      <div className='add-user'>
        <h1>Rtk Query example</h1>
        <div>
          <input
            type='text'
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
          <button onClick={handleAddProduct}>Add product</button>
        </div>
      </div>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index} className='user-item'>
              <div className='user-name'>
                <h3 style={{ marginRight: '10px' }}>{item.name}</h3>
                <h3></h3>
              </div>
              <div className='user-process'>
                <input
                  onChange={(e) => setCatchProduct(e.target.value)}
                  type='text'
                  placeholder='update product...'
                  value={catchProduct}
                />
                <button onClick={() => handleEditProduct(item.id)}>
                  Update product
                </button>
                <button
                  onClick={() => handleDeleteProduct(item.id)}
                  className='delete-user'
                >
                  Delete product
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default RtkQuery;

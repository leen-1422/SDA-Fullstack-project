// import React, { ChangeEvent, FormEvent, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router';
// import { AppDispatch, RootState } from '../redux/store';
// import { Product } from '../redux/slices/products/productSlice';
// import { ProductForm } from './ProductForm';
// import { NewProductWrapper } from './NewProductWrapper';
// import {
//   editProducts
// } from '../redux/slices/products/productSlice'
// import { Link } from 'react-router-dom';


// const initialProductState: Product = {
//   id: 0,
//   name:  '',
//   image: '',
//   description: '',
//   categories: [],
//   variants: [],
//   sizes: [],
//   categoryId: null,
  
  
  
// }




// export default function EditProduct() {

//   const inputStyle =
//     'w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-400'
//   const labelStyle = 'block text-sm font-medium text-gray-600'

//     const { id } = useParams();
//     const dispatch = useDispatch<AppDispatch>()
//     const products = useSelector((state: RootState) => state.products.items);
//     const nav= useNavigate()

//     const selectedProduct = products.find((product: Product) => product.id === Number(id));
//     console.log(selectedProduct)

//     // const {name,image,description,categories,variants,sizes } = selectedProduct[0]

//     const [product, setProduct] = useState<Product>(initialProductState)

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//       // Update the product state based on the input change
//       setProduct({
//         ...product,
//         [e.target.name]: e.target.value,
//       });
//     };

//     const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//       setProduct({
//         ...product,
//         [e.target.name]: e.target.value,
//       });
//     };



//     const handleSubmit = (e: FormEvent) => {
//       e.preventDefault()
//       dispatch(editProducts({
//         id: id,
//         name: product.name,
//         image:product.image,
//         description:product.description,
//         categories:product.categories,
//         variants:product.variants,
//         sizes:product.sizes


//       }))
//       nav('/admin')



//     }
    





//   return (

//   <div>

// <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
//       <div className="mb-4">
//         <label htmlFor="name" >
//           Name:
//         </label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={product.name}
//           className={inputStyle}
//           onChange={handleChange}

//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="image" >
//           Image URL:
//         </label>
//         <input
//           type="text"
//           name="image"
//           id="image"
//           value={product.image}
//           className={inputStyle}
//           onChange={handleChange}
     
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" >
//           Description:
//         </label>
//         <textarea
//           name="description"
//           id="description"
//           value={product.description}
//           className={inputStyle}
//           onChange={handleTextareaChange}

          
      
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="categories" >
//           Categories: (use comma , to create multiple)
//         </label>
//         <input
//           type="text"
//           name="categories"
//           id="categories"
//           value={Array.isArray(product.categories) ? product.categories.join(',') : ''}
//           className={inputStyle}
//           onChange={handleChange}
  
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="variants" >
//           Variants: (use comma , to create multiple)
//         </label>
//         <input
//           type="text"
//           name="variants"
//           id="variants"
//           value={Array.isArray(product.variants) ? product.variants.join(',') : ''}
//           className={inputStyle}
//           onChange={handleChange}

          
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="sizes" >
//           Sizes: (use comma , to create multiple)
//         </label>
//         <input
//           type="text"
//           name="sizes"
//           id="sizes"
//           value={Array.isArray(product.sizes) ? product.sizes.join(',') : ''}
//           className={inputStyle}
//           onChange={handleChange}
          
          
//         />
//       </div>
//       {/* <Link to="/admin"> */}
//       <button
//         type="submit"
//         className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
//         Update Product
//       </button>
//       {/* </Link> */}
      
//     </form>
//   </div>
//   )
// }

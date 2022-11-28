import { useCreateAdminProductApi } from "@/entities/product/api";
import { useImageUploadApi } from "@/shared/api/useImageUploadApi";
import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import baseURL from "@/shared/config/baseURL";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import currencyNumberToString from "@/shared/utils/currencyNumberToString";
import currencyStringToNumber from "@/shared/utils/currencyStringToNumber";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const createAdminProductApi = useCreateAdminProductApi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    img: "",
    price: "",
    brand: "adidas",
    color: "black",
    description: "",
  });

  const [save, setSave] = useState(false);
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSave(true);
    const elemName = e.target.name;
    const value = elemName === "price" ? currencyNumberToString(currencyStringToNumber(e.target.value) || 0) : e.target.value;
    setProductData((prev) => ({ ...prev, [elemName]: value }));
  };

  const [newImg, setNewImg] = useState<File>();
  const imgData = new FormData();
  const imageUploadApi = useImageUploadApi();
  const uploadImage = useMutation({
    mutationFn: imageUploadApi,
    onSuccess: (data) => {
      setProductData((prev) => ({ ...prev, img: data.secure_url }));
      setNewImg(undefined);
    },
  });

  const handleNewImg = (e: ChangeEvent<HTMLInputElement>) => {
    setSave(true);
    const imageFile = e.target.files?.[0];
    imageFile && setNewImg(imageFile);
  };

  const handleImgUpload = (e: MouseEvent) => {
    e.preventDefault();
    imgData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    imgData.append("folder", "shoeshop");
    newImg && imgData.append("file", newImg);
    uploadImage.mutate(imgData);
  };

  const mutation = useMutation({
    mutationFn: createAdminProductApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully adding product" }));
      dispatch(setModalDisplay(true));
      navigate("/admin/products");
    },
  });

  const handleUpdateProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(productData);
  };

  return (
    <form onSubmit={handleUpdateProduct} className="mx-auto max-w-2xl">
      <div>
        <label className="ml-1 block">id</label>
        <input
          value={productData._id}
          onChange={handleFormChange}
          disabled
          type="text"
          name="_id"
          id="admin_product_id"
          className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200"
        />
      </div>
      <div>
        <label className="ml-1 block">image url</label>
        <input
          value={productData.img}
          onChange={handleFormChange}
          disabled
          type="text"
          name="img"
          id="admin_product_img"
          className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200"
        />
        {productData.img && <img className="rounded-lg align-top" width={150} src={productData.img} title={productData.name} alt={productData.name} />}
        <input onChange={handleNewImg} multiple={false} required={productData.img ? false : true} type="file" accept=".jpg,.jpeg,.png,.webp" name="newImg" id="admin_product_newImg" className="mb-4 block" />
        {newImg && <img className="mt-2 rounded-md" width={100} src={URL.createObjectURL(newImg)} />}
        {newImg && (
          <button onClick={handleImgUpload} className={`rounded-md bg-green-500 px-2 py-1 text-center text-xs uppercase text-neutral-50 hover:bg-green-600`}>
            Upload this image
          </button>
        )}
      </div>
      <div>
        <label className="ml-1 block">name</label>
        <input value={productData.name} onChange={handleFormChange} required type="text" name="name" id="admin_product_name" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700" />
      </div>
      <div>
        <label className="ml-1 block">price</label>
        <input value={productData.price} onChange={handleFormChange} required type="text" name="price" id="admin_product_price" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700" />
      </div>
      <div>
        <label className="ml-1 block">brand</label>
        <select value={productData.brand} onChange={handleFormChange} required name="brand" id="admin_product_brand" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700">
          <option value="converse">Converse</option>
          <option value="adidas">Adidas</option>
          <option value="new_balance">New Balance</option>
          <option value="nike">Nike</option>
          <option value="puma">Puma</option>
          <option value="reebok">Reebok</option>
          <option value="vans">Vans</option>
        </select>
      </div>
      <div>
        <label className="ml-1 block">color</label>
        <select value={productData.color} onChange={handleFormChange} required name="color" id="admin_product_color" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700">
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="ml-1 block">description</label>
        <textarea
          value={productData.description}
          onChange={handleFormChange}
          required
          name="description"
          id="admin_product_description"
          className="h-20 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700"
        />
      </div>
      {mutation.isError || mutation.isPaused ? (
        <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">
          <ErrorMessage />
        </div>
      ) : (
        ""
      )}
      {mutation.isLoading ? (
        <div className="mx-auto -mt-2 mb-4 w-full text-sm text-red-500">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <input
        type="submit"
        value="save"
        disabled={!save}
        className={`mx-auto mt-8 block w-40 cursor-pointer rounded-md ${save ? `bg-green-500 hover:bg-green-600` : `bg-slate-300`} py-1 text-center font-semibold uppercase text-neutral-50`}
      />
    </form>
  );
};

export default AdminAddProduct;

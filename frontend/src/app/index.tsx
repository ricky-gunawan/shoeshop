import store from "@/app/store";
import AdminAddProductPage from "@/pages/AdminAddProductPage";
import AdminCartPage from "@/pages/AdminCartPage";
import AdminEditCartPage from "@/pages/AdminEditCartPage";
import AdminEditOrderPage from "@/pages/AdminEditOrderPage";
import AdminEditProductPage from "@/pages/AdminEditProductPage";
import AdminEditUserPage from "@/pages/AdminEditUserPage";
import AdminOrderPage from "@/pages/AdminOrderPage";
import AdminPageLayout from "@/pages/AdminPageLayout";
import AdminProductPage from "@/pages/AdminProductPage";
import AdminUserPage from "@/pages/AdminUserPage";
import CartPage from "@/pages/CartPage";
import CustomerPageLayout from "@/pages/CustomerPageLayout";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OrderPage from "@/pages/OrderPage";
import PersistLogin from "@/pages/PersistLogin";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductDisplayDetailPage from "@/pages/ProductDisplayDetailPage";
import ProductDisplayPage from "@/pages/ProductDisplayPage";
import ProductListPage from "@/pages/ProductListPage";
import PublicPageLayout from "@/pages/PublicPageLayout";
import SignupPage from "@/pages/SignupPage";
import AppContainer from "@/shared/components/AppContainer";
import GlobalModal from "@/shared/components/GlobalModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./styles.css";
import AdminProfilePage from "@/pages/AdminProfilePage";
import CustomerProfilePage from "@/pages/CustomerProfilePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppContainer>
          <GlobalModal />
          <Routes>
            {/* public routes */}
            <Route element={<PersistLogin />}>
              <Route element={<PublicPageLayout />}>
                <Route index element={<ProductDisplayPage />} />
                <Route path="products-display/:productDisplayId" element={<ProductDisplayDetailPage />} />
                <Route path="register" element={<SignupPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* customer routes */}
              <Route element={<CustomerPageLayout />}>
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/:productId" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="profile" element={<CustomerProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* admin routes */}
              <Route path="admin" element={<AdminPageLayout />}>
                <Route path="products" element={<AdminProductPage />} />
                <Route path="products/:productId" element={<AdminEditProductPage />} />
                <Route path="products/add-product" element={<AdminAddProductPage />} />
                <Route path="users" element={<AdminUserPage />} />
                <Route path="users/:userId" element={<AdminEditUserPage />} />
                <Route path="orders" element={<AdminOrderPage />} />
                <Route path="orders/:orderId" element={<AdminEditOrderPage />} />
                <Route path="carts" element={<AdminCartPage />} />
                <Route path="carts/:cartId" element={<AdminEditCartPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>

            {/* Not Found Page */}
          </Routes>
        </AppContainer>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

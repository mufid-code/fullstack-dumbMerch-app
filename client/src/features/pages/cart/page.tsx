import {
  getCart,
  removeCartItem,
  updateCartItem,
} from '@/app/stores/cart/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ICartItemDTO } from '@/types/cart';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // const [cartItems, setCartItems] = useState<CartItem[]>([
  //   {
  //     id: 1,
  //     name: 'Quantum Processor',
  //     price: 999.99,
  //     quantity: 1,
  //     image: '/placeholder.svg?height=80&width=80',
  //   },
  //   {
  //     id: 2,
  //     name: 'Holo Display',
  //     price: 599.99,
  //     quantity: 2,
  //     image: '/placeholder.svg?height=80&width=80',
  //   },
  //   {
  //     id: 3,
  //     name: 'Neural Interface',
  //     price: 1299.99,
  //     quantity: 1,
  //     image: '/placeholder.svg?height=80&width=80',
  //   },
  // ]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const updateQuantity = async (id: number, quantity: number) => {
    const data: ICartItemDTO = {
      id,
      quantity,
    };
    // setCartItems((items) =>
    //   items.map((item) =>
    //     item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    //   )
    // );
    await dispatch(updateCartItem(data));
    dispatch(getCart());
  };

  // const handleRemoveItem = (id: number) => {
  //   setCartItems((items) => items.filter((item) => item.id !== id));
  // };
  const handleRemoveItem = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(removeCartItem(id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        dispatch(getCart());
      }
    });
  };

  // const total = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  const total =
    cartItems?.cartItems?.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    ) ?? 0;
  return (
    <div className="min-h-screen bg-black  text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Header />
        <div className="space-y-4">
          {cartItems?.cartItems?.map((item) => (
            <motion.div
              key={item.cartId}
              layout
            >
              <Card className="bg-[#303030] border-gray-700">
                <CardContent className="p-4 flex items-center text-white justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        item.product?.images?.find(
                          (img) => img.productId === item.productId
                        )?.imageUrl || '/placeholder.svg'
                      }
                      alt={item.product.product_name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.product.product_name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        $
                        {item.price
                          ? parseFloat(item.price).toFixed(2)
                          : '0.00'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/20"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-[#303030] border-gray-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Checkout
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
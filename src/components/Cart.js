import { useContext, useEffect, useState } from "react";
import { Context } from "../reducer";
import { type } from "@testing-library/user-event/dist/type";

function Cart() {

    const { state, dispatch } = useContext(Context);
    const { cart, discount, subTotal, gst, finalAmount, shipping  } = state;

    //coupon
    const [coupon, setCoupon] = useState("");
    
    const applyCoupon = () => {
        dispatch({type:'APPLY_COUPON', payload:coupon});
    }

    const removeCoupon = () =>{
        dispatch({type:'REMOVE_COUPON'});
    }

    //CALCULATE_TOTALS
    useEffect(()=>{
        dispatch({type:'CALCULATE_TOTALS'});
    },[cart, discount, dispatch]);

    return (
        <>
            <div style={{ marginTop: '80px' }}>
                <div className="lg:grid grid-cols-2 gap-2">
                    <div className="p-2  bg-gray-200">
                        <div className='container'>
                            {cart.map((product) => (
                                <div key={product.id} className="p-2">
                                    <div className='flex justify-between'>
                                        <div style={{ width: '30%', height: '30%' }} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                                            <img
                                                alt="pic"
                                                src={product.thumbnail}
                                                className="object-center"
                                            />
                                        </div>
                                        <div style={{ width: '60%', height: '60%' }}>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className="text-black">
                                                        {product.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                </div>
                                                <h3 className="text-xl text-balck"><i class="fa-solid fa-rupee-sign"></i>. {product.price}</h3>
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div className='flex justify-between'>
                                                    <button onClick={()=> dispatch({type:'INCREMENT_QUANTITY',payload:product})} className="text-white bg-blue-500 p-2 mr-3 rounded ">+</button>
                                                    <p>Quantity - {product.quantity}</p>
                                                    <button onClick={()=> dispatch({type:'DECREMENT_QUANTITY',payload:product})} className="text-white bg-pink-500 p-2 ml-3 rounded ">-</button>
                                                </div>
                                            </div>
                                            <div className='flex justify-end my-2'>
                                                <button onClick={()=> dispatch({type:'REMOVE_FROM_CART', payload:product.id })} className="text-white bg-red-500 p-2 rounded ">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='flex justify-end my-2'>
                                <button onClick={()=> dispatch({type:'CLEAR_CART'})} className="w-full text-white bg-red-500 p-2 rounded" fullWidth>Remove Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 p-5">
                        <div className='container'>
                            <div className='container'>
                                <div className='flex justify-between'>
                                    <u><h1 className='text-3xl text-center'>Payment Summary</h1></u>
                                    <div className='coupon-div flex justify-end'>
                                        <input value={coupon} onChange={(e)=> setCoupon(e.target.value)} type='text' className='p-2' placeholder='Enter Coupon Code' />
                                        <button onClick={applyCoupon} className=" text-white bg-blue-500 p-2 rounded mx-1">Apply</button>
                                        <button onClick={removeCoupon} className=" text-white bg-red-500 p-2 rounded mx-1">Remove</button>
                                    </div>
                                </div>
                                <div className='flex p-5'>
                                    <h1 className='text-l'>SubTotal : </h1>
                                    <h1 className='ml-4 text-xl'><i class="fa-solid fa-rupee-sign"></i>. {subTotal} </h1>
                                </div>
                                <div className='flex p-5'>
                                    <h1 className='text-l'>GST (18%) : </h1>
                                    <h1 className='ml-4 text-xl'><i class="fa-solid fa-rupee-sign"></i>. {gst} </h1>
                                </div>
                                <div className='flex p-5'>
                                    <h1 className='text-l'>Shipping : </h1>
                                    <h1 className='ml-4 text-xl'><i class="fa-solid fa-rupee-sign"></i>. {shipping} </h1>
                                </div>
                                <div className='flex p-5'>
                                    <h1 className='text-l'>Discount : </h1>
                                    <h1 className='ml-4 text-xl'>- <i class="fa-solid fa-rupee-sign"></i>. {discount} </h1>
                                </div>
                                <div className='flex p-5'>
                                    <strong><h1 className='text-l'>Total Amount : </h1></strong>
                                    <strong><h1 className='ml-4 text-xl'><i class="fa-solid fa-rupee-sign"></i>. {finalAmount} </h1></strong>
                                </div>
                            </div>
                            <div className='my-2'>
                                <button className="w-full text-white bg-green-500 p-2 rounded ">Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;
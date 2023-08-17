import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import toast from 'react-hot-toast'
const SITE_URL = process.env.SITE_URL;

interface StateI {
    items: {
        id: number,
        user_id: string,
        product_id: string,
        quantity: number,

    }[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: undefined | string;
    totalPrice: number
}

const initialState: StateI = {
    items: [],
    status: 'idle',
    error: undefined,
    totalPrice: 0
}

export const addItem = createAsyncThunk('cart/addItem', async (initialPost: { product_id: string, quantity: number }) => {
    // console.log('item data:',initialPost)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(initialPost)
    });
    const data = await response.json()
    return data;
})

export const updateItem = createAsyncThunk('cat/updateItem', async ({ product_id, quantity }: { product_id: string, quantity: number }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/cart`, {
        method: 'PATCH',
        body: JSON.stringify({ product_id, quantity })
    })
    const data = await response.json();
    return data;
})

export const getCart = createAsyncThunk('cart/getCart', async () => {
    // const response = await fetch(`${SITE_URL}api/cart`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/cart`)
    const data = await response.json();
    return data;
})

export const deleteItem = createAsyncThunk('cart/deleteItem', async (id?: number) => {
    const endPoint = id ? `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?id=${String(id)}` : `${process.env.NEXT_PUBLIC_SITE_URL}api/cart`
    const response = await fetch(endPoint, {
        method: 'DELETE'
    })
    const data = await response.json();
    return data;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getTotalPrice: (state, action) => {
            console.log(state.totalPrice)
            console.log(action.payload)
            state.totalPrice = Number(state.totalPrice) + Number(action.payload);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addItem.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.items.some(item => item.id === action.payload.id)) {
                    state.items = state.items.filter(item => item.id !== action.payload.id)
                    state.items.push(action.payload);
                } else {
                    state.items.push(action.payload)
                }
                toast.success('Item added to cart.')
            })
            .addCase(getCart.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item.id !== action.payload.id)
                toast.success('Item removed from cart.')
            })
            .addCase(updateItem.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.items = state.items.filter(item => item.id !== action.payload.id)
                state.items = action.payload;
                toast.success('Cart updated successfuly.')
            })
    },
})

export const selectCart = (state: RootState) => state.cart.items;
export const getCartStatus = (state: RootState) => state.cart.status;
export const getCartError = (state: RootState) => state.cart.error;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const { getTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;


// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_SECRET;

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../stripe-session/route'
import { orderTable, orderDetailsTable, db } from '@/lib/drizzle';
// import * as Stripe from 'stripe';
// import { data } from 'autoprefixer';
// import { Stripe } from '@stripe/stripe-js';
import Stripe from 'stripe';


export async function POST(request: NextRequest) {
    // console.log(request.headers.get('stripe-signature'))
    const sig = request.headers.get('stripe-signature') as string;
    const body = await request.text();
    let event:Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        console.log('weebhook verified')
    } catch (err: any) {
        console.log('weebhook failed')
        NextResponse.json(`Webhook Error: ${err.message}`)
        return;
    }

    // Handle the event
    //   console.log('event ', event)
    console.log('type ', event.type)
    switch (event?.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        case "checkout.session.completed":
            const paymentIntentSucceede:any = event.data.object
            const { line_items } = await stripe.checkout.sessions.retrieve(paymentIntentSucceede.id, {
                expand: ["line_items"]
            })
            // console.log('hush')
            // console.log('EVENT OBJECT: ', paymentIntentSucceede)
            // console.log('CUSTOMER EMAIL: ', paymentIntentSucceede.customer_details.email)
            // console.log('ORDER AMOUNT: ', paymentIntentSucceede.amount_subtotal / 100)
            // console.log('SHIPPING COST: ', paymentIntentSucceede.shipping_cost.amount_total / 100)
            const cust:any = await stripe.customers.retrieve(paymentIntentSucceede.customer)
            // console.log('cust: ', cust)
            let user_id = cust.metadata.user_id;
            // .then(customer => {
            //     user_id = customer.metadata.user_id;
            //     console.log('1st CUSTOMER USER ID: ', customer.metadata.user_id)
            //     console.log('CART ', customer.metadata.cart)
            // }).catch(err => { console.log(err.message) })
            
            let order_date = String(new Date(paymentIntentSucceede.created * 1000).toISOString());
            // console.log('ORDER DATE: ', order_date)
          

            // console.log('ITEMS', line_items?.data.map(item => {
            //     return {
            //         name:item.description,
            //         quantity:item.quantity
            //     }
            // }))
            const product_ids: {
                name: string,
                product_id: string
            }[] = JSON.parse(paymentIntentSucceede.metadata.product_ids);

            const orderResponse = await db.insert(orderTable).values({
                user_id: user_id,
                customer_mail: paymentIntentSucceede.customer_details.email,
                order_date: new Date(order_date),
                order_amount: Number((paymentIntentSucceede.amount_subtotal / 100)),
                delivery_fee: Number(paymentIntentSucceede.shipping_cost.amount_total / 100),
              }).returning();

              const cart:any= line_items?.data.map(item => {
                const product = product_ids.filter(prod => prod.name === item.description);
                return {
                    // name: item.description,
                    quantity: item.quantity,
                    product_id: product[0].product_id,
                    order_id: orderResponse[0].order_id
                }
            })

            // console.log('CARRR: ', cart);

            // console.log('ORDER RESPONSE', orderResponse[0].order_id)
            const orderDetailsResponse = await db.insert(orderDetailsTable).values(cart).returning();


            // console.log('order details repponse', orderDetailsResponse);


            break;
        default:
            console.log(`Unhandled event type ${event?.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json('success');
}



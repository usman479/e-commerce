import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

export const stripe = new Stripe(key, {
    apiVersion: '2023-08-16'
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    // console.log('body: ', body);
    const myCookies = cookies();
    const user_id = myCookies.get('user_id')?.value as string
    if (!user_id) {
        return NextResponse.json({ message: 'failed' })
    }
    const ids =  body.map((item:any) => {
        return {
            name:item.name,
            product_id:item.product_id
        }
    });

    // console.log('ids: ', ids)
    const customer = await stripe.customers.create({
        metadata: {
            user_id,
            cart:JSON.stringify(ids)
        }
    })


    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1NjJu0CFdAMGhgbFAXCKDKUS' },
                { shipping_rate: 'shr_1NjJtMCFdAMGhgbFBPQmOwPn' }
            ],
            customer: customer.id,
            line_items: body.map((item: any) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [item.image],

                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,

                }
            }),
            success_url: `${req.headers.get("origin")}/?success=${user_id}`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
            metadata: {
                product_ids: JSON.stringify(ids)
            }

        });
        // console.log('paymentIntents: ', stripe.paymentIntents)

        // console.log('session: ' ,session)
        return NextResponse.json({ session })
        // res.redirect(303, session.url);
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json(err.message)
        // res.status(err.statusCode || 500).json(err.message);
    }
}



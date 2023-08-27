import { pgTable, varchar, integer, serial, date, timestamp,real } from 'drizzle-orm/pg-core';
import {drizzle} from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres';


export const cartTable = pgTable('cart', {
    id: serial("id"),
    user_id: varchar('user_id', {
        length: 255
    }).primaryKey(),
    product_id: varchar('product_id', {
        length: 255
    }).primaryKey(),
    quantity: integer('quantity').notNull(),

})

export const orderTable = pgTable('orders',{
    order_id: serial("order_id").primaryKey(),
    user_id: varchar("user_id",{
        length:255
    }).notNull(),
    customer_mail: varchar("customer_mail",{
        length:255
    }),
    order_date: timestamp("order_date").notNull(),
    order_amount: real('order_amount').notNull(),
    delivery_fee: real("delivery_fee").notNull()
});

export const orderDetailsTable = pgTable('order_details',{
    order_detail_id: serial("order_detail_id").primaryKey(),
    product_id: varchar("product_id",{
        length:255
    }).notNull(),
    quantity: integer("quantity").notNull(),
    order_id: integer("order_id").references(() => orderTable.order_id).notNull()
})

export const db = drizzle(sql);
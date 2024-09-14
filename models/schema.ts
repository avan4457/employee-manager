import { pgTable, bigint, text, timestamp } from 'drizzle-orm/pg-core'

export const employee = pgTable('employee', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email'),
  number: text('number'),
  gender: text('gender'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  photo: text('photo'),
})

/*
  Warnings:

  - A unique constraint covering the columns `[intent_id]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TicketPaid" AS ENUM ('NOT_PAID', 'PAID');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "intent_id" TEXT,
ADD COLUMN     "paid" "TicketPaid" NOT NULL DEFAULT 'NOT_PAID';

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_intent_id_key" ON "Ticket"("intent_id");

-- CreateIndex
CREATE INDEX "Ticket_intent_id_idx" ON "Ticket"("intent_id");

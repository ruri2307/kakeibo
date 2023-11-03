-- CreateTable
CREATE TABLE "PayOption" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,

    CONSTRAINT "PayOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayAmount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pey" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "payOptionId" INTEGER NOT NULL,

    CONSTRAINT "PayAmount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pey" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "payOptionId" INTEGER NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayAmount" ADD CONSTRAINT "PayAmount_payOptionId_fkey" FOREIGN KEY ("payOptionId") REFERENCES "PayOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_payOptionId_fkey" FOREIGN KEY ("payOptionId") REFERENCES "PayOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

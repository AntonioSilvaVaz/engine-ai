export {};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllDataFromSecurityList = async () => {
    const securityList = await prisma.security_data.findMany();
    return securityList;
};

const getDetailFromSecurityItem = async (ticker: string) => {
    const securityDetail = await prisma.security_data.findFirst({
        where: {
            ticker
        }
    });
    return securityDetail;
};

module.exports = {
    getAllDataFromSecurityList,
    getDetailFromSecurityItem,
}
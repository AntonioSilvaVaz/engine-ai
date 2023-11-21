export {};
import { NextFunction, Request, Response } from 'express';
const {getAllDataFromSecurityList, getDetailFromSecurityItem} = require('../models/SecurityModel');

const getAllSecurityList = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const securityList = await getAllDataFromSecurityList();
       res.status(200).json({Success: false, data: securityList});
    } catch (error) {
        res.status(500).json({Success: false, data: null});
    }
};

const getSecurityDetail = async (req:Request, res: Response, next: NextFunction) => {
    try {

        const { ticker } = req.params;
        if(!ticker) {
            res.status(400).json({Success: false, message: 'Missing information', data: null});
            return;
        }
        
        const securityList = await getDetailFromSecurityItem(ticker);
        if(!securityList){
            res.status(404).json({Success: false, message: 'Data not found', data: null});
            return;
        }
        
        res.status(200).json({Success: true, data: securityList});
    } catch (error) {
        res.status(500).json({Success: false, message: 'Server failed retrieving data', data: null});
    }
};

module.exports = {
    getAllSecurityList,
    getSecurityDetail,
}
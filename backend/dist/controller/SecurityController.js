"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { getAllDataFromSecurityList, getDetailFromSecurityItem } = require('../models/SecurityModel');
const getAllSecurityList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const securityList = yield getAllDataFromSecurityList();
        res.status(200).json({ Success: false, data: securityList });
    }
    catch (error) {
        res.status(500).json({ Success: false, data: null });
    }
});
const getSecurityDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticker } = req.params;
        if (!ticker) {
            res.status(400).json({ Success: false, message: 'Missing information', data: null });
            return;
        }
        const securityList = yield getDetailFromSecurityItem(ticker);
        if (!securityList) {
            res.status(404).json({ Success: false, message: 'Data not found', data: null });
            return;
        }
        res.status(200).json({ Success: true, data: securityList });
    }
    catch (error) {
        res.status(500).json({ Success: false, message: 'Server failed retrieving data', data: null });
    }
});
module.exports = {
    getAllSecurityList,
    getSecurityDetail,
};

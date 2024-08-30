import { AxiosResponse } from "axios";
import httpClient from "./base-service.ts";
import { IResponse } from "../utility/interfaces/Response";
import { StockInitialValue } from "../utility/interfaces/IRoute.ts";

const getStocks = async (): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.get<IResponse<{}>>(`getStocks`);

const getRandomStock = async (): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.get<IResponse<{}>>(`getRandomStock`);

const getStockById = async (id: number): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`getStockById`, { id });

const deleteStock = async (id: number): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`deletePost`, { id });

const deleteMultipleStocks = async (data: { id: number[] }): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>('deleteMultipleStocks', data);


const addNewStock = async (stockData: StockInitialValue): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`addNewStock`, stockData);

const editStock = async (stockData: StockInitialValue): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`editStock`, stockData);

const StockApi = {
    getStocks: getStocks,
    getStockById: getStockById,
    addNewStock: addNewStock,
    deleteStock: deleteStock,
    editStock: editStock,
    deleteMultipleStocks: deleteMultipleStocks,
    getRandomStock: getRandomStock
};

export default StockApi;
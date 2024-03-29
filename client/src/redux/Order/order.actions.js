import {
    CREATE_ORDER,
    FETCH_ORDERS,
    UPDATE_ORDER,
    DELETE_ORDER,
} from "./order.types";
import * as api from "../../redux/api/index";

export const createOrder = (userId, formData) => async (dispatch) => {
    try {
        const { data } = await api.createOrder(formData);
        await api.addUserOrder(userId, data._id);
        const clientData = await api.fetchClient(data.client);
        dispatch({
            type: CREATE_ORDER,
            payload: {
                order: data,
                clientName: `${clientData.data.nameFirst} ${clientData.data.nameLast}`,
                isTransfer: false,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchOrders = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchOrders(userId);
        dispatch({ type: FETCH_ORDERS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateOrder = (orderId, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateOrder(orderId, formData);
        const clientData = await api.fetchClient(data.client);
        dispatch({
            type: UPDATE_ORDER,
            payload: {
                order: data,
                clientName: `${clientData.data.nameFirst} ${clientData.data.nameLast}`,
                isTransfer: false,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrder = (userId, orderId) => async (dispatch) => {
    try {
        await api.deleteUserOrder(userId, orderId);
        dispatch({ type: DELETE_ORDER, payload: orderId });
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = (orderId, formData) => async (dispatch) => {
    try {
        const { data } = await api.addLineProduct(orderId, formData);
        const clientData = await api.fetchClient(data.client);
        dispatch({
            type: UPDATE_ORDER,
            payload: {
                order: data,
                clientName: `${clientData.data.nameFirst} ${clientData.data.nameLast}`,
                isTransfer: false,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct =
    (orderId, productId, formData) => async (dispatch) => {
        try {
            const { data } = await api.updateLineProduct(
                orderId,
                productId,
                formData
            );
            const clientData = await api.fetchClient(data.client);
            dispatch({
                type: UPDATE_ORDER,
                payload: {
                    order: data,
                    clientName: `${clientData.data.nameFirst} ${clientData.data.nameLast}`,
                    isTransfer: false,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

export const deleteProduct = (orderId, productId) => async (dispatch) => {
    try {
        const { data } = await api.deleteLineProduct(orderId, productId);
        const clientData = await api.fetchClient(data.client);
        dispatch({
            type: UPDATE_ORDER,
            payload: {
                order: data,
                clientName: `${clientData.data.nameFirst} ${clientData.data.nameLast}`,
                isTransfer: false,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const transferOrder =
    (userId, toUserId, orderIds) => async (dispatch) => {
        try {
            for (let i in orderIds) {
                await api.transferOrder(userId, toUserId, orderIds[i]);
                dispatch({ type: DELETE_ORDER, payload: orderIds[i] });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const acceptOrder = (userId, orderId) => async (dispatch) => {
    try {
        await api.acceptOrder(userId, orderId);
        const { data } = await api.fetchOrders(userId);
        dispatch({ type: FETCH_ORDERS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const declineOrder = (userId, orderId) => async (dispatch) => {
    try {
        await api.declineOrder(userId, orderId);
        const { data } = await api.fetchOrders(userId);
        dispatch({ type: FETCH_ORDERS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const addTransferClient =
    (userId, clientId, orderId) => async (dispatch) => {
        try {
            const newClient = await api.cloneClient(clientId);
            await api.addUserClient(userId, newClient.data._id);
            const order = await api.fetchOrder(orderId);
            await api.updateOrder(orderId, {
                ...order.data,
                client: newClient.data._id,
            });
            const { data } = await api.fetchOrders(userId);
            dispatch({ type: FETCH_ORDERS, payload: data });
        } catch (error) {
            console.log(error);
        }
    };

export const addLog = (userId, orderId, text) => async (dispatch) => {
    try {
        const { data } = await api.addLog(orderId, userId, text, Date.now());
        const clientData = await api.fetchClient(data.client);
        dispatch({
            type: UPDATE_ORDER,
            payload: {
                order: data,
                clientName: `${clientData.data.nameFirst} ${clientData.data.nameLast}`,
                isTransfer: false,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

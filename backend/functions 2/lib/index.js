"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onServiceRequest = exports.onBookingCreate = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const db = admin.firestore();
// When a new booking is created, charge the user's wallet
exports.onBookingCreate = (0, firestore_1.onDocumentCreated)('users/{userId}/bookings/{bookingId}', async (event) => {
    var _a;
    const booking = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    const userId = event.params.userId;
    try {
        // Get user's wallet balance
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        const userData = userDoc.data();
        const currentBalance = (userData === null || userData === void 0 ? void 0 : userData.walletBalance) || 0;
        const bookingAmount = booking.amount;
        if (currentBalance < bookingAmount) {
            throw new Error('Insufficient funds');
        }
        // Update wallet balance
        await userRef.update({
            walletBalance: currentBalance - bookingAmount,
        });
        // Record transaction
        await db.collection('transactions').add({
            userId,
            bookingId: event.params.bookingId,
            amount: bookingAmount,
            type: 'BOOKING_PAYMENT',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
    catch (error) {
        console.error('Error processing booking payment:', error);
        throw error;
    }
});
// When a service request is created, notify relevant parties
exports.onServiceRequest = (0, firestore_1.onDocumentCreated)('services/{serviceId}/requests/{requestId}', async (event) => {
    var _a;
    const request = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    // TODO: Implement notification logic
    console.log('New service request:', request);
    // Placeholder for future notification implementation
    return null;
});
//# sourceMappingURL=index.js.map
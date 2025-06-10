import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

interface BookingData {
  amount: number;
}

interface UserData {
  walletBalance?: number;
}

// When a new booking is created, charge the user's wallet
export const onBookingCreate = onDocumentCreated(
  'users/{userId}/bookings/{bookingId}',
  async (event) => {
    const booking = event.data?.data() as BookingData;
    const userId = event.params.userId;

    try {
      // Get user's wallet balance
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data() as UserData;
      const currentBalance = userData?.walletBalance || 0;
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

    } catch (error) {
      console.error('Error processing booking payment:', error);
      throw error;
    }
  }
);

// When a service request is created, notify relevant parties
export const onServiceRequest = onDocumentCreated(
  'services/{serviceId}/requests/{requestId}',
  async (event) => {
    const request = event.data?.data();
    
    // TODO: Implement notification logic
    console.log('New service request:', request);
    
    // Placeholder for future notification implementation
    return null;
  }
); 
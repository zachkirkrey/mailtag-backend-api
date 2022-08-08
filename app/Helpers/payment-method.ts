import { DateTime } from 'luxon'
import Stripe from 'stripe'

export const serializePaymentMethod = (PaymentMethod: Stripe.PaymentMethod) => {
  return {
    id: PaymentMethod.id,
    customerId: PaymentMethod.customer,
    cardBrand: PaymentMethod.card?.brand,
    cardCountry: PaymentMethod.card?.country,
    cardExpiryMonth: PaymentMethod.card?.exp_month,
    cardExpiryYear: PaymentMethod.card?.exp_year,
    cardLast4Digits: PaymentMethod.card?.last4,
    createdAt: DateTime.fromSeconds(PaymentMethod.created).toLocaleString(
      DateTime.DATETIME_MED_WITH_WEEKDAY
    ),
  }
}

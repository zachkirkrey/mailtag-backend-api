import { DateTime } from 'luxon'
import Stripe from 'stripe'

export const serializeInvoiceInfo = (invoice: Stripe.Invoice) => {
  return {
    id: invoice.id,
    accountCountry: invoice.account_country,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    stripeCustomerId: invoice.customer,
    stripeCustomerEmail: invoice.customer_email,
    createdAt: DateTime.fromSeconds(invoice.created).toLocaleString(
      DateTime.DATETIME_MED_WITH_WEEKDAY
    ),
    hostedInvoiceUrl: invoice.hosted_invoice_url,
    pdfUrl: invoice.invoice_pdf,
  }
}

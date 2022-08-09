import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import { serializeInvoiceInfo } from 'App/Helpers/invoice'
import GetInvoiceByIdValidator from 'App/Validators/GetInvoiceByIdValidator'

export default class InvoicesController {
  public async index({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!

    await user.load('subscription')

    const invoices = await Stripe.invoices.list({ customer: user.subscription.stripeCustomerId })

    return {
      data: {
        invoices: invoices.data.map((invoice) => serializeInvoiceInfo(invoice)),
      },
    }
  }

  public async show({ request }: HttpContextContract) {
    const { params } = await request.validate(GetInvoiceByIdValidator)

    const invoice = await Stripe.invoices.retrieve(params.id)

    return {
      data: {
        invoice: serializeInvoiceInfo(invoice),
      },
    }
  }
}

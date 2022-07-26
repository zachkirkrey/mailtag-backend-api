import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Coupon/CouponController.index')
  Route.get(':id', 'Coupon/CouponController.show')
  Route.post('', 'Coupon/CouponController.create')
  Route.patch(':id', 'Coupon/CouponController.update')
  Route.delete(':id', 'Coupon/CouponController.destroy')
})
  .prefix('coupons')
  .middleware('auth')
  .where('id', Route.matchers.uuid())

class PaymentController{
    constructor(subscriptionService){
        this.subscriptionService = subscriptionService
    }
    async getPymentLink(req, res){
        try {
          const productos = req.body.productos;
          const payment = await this.subscriptionService.createPayment(productos);
          res.json(payment)
        } catch (error) {
          console.log(error)
          return res.status(500).json({error:true, mesg:`failed to create payment: ${error.message}`})
        }
      }
      
    
}

module.exports = PaymentController
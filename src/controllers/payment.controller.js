const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: "TEST-1395300641881042-060816-177988a4c29773d08d3669478bf6ef0f-1394727360",
    });

    const resultado = await mercadopago.preferences.create({
        items: [
            {
                title: "Juego Spider-Man",
                unit_price: 399,
                currency_id: "MXN",
                quantity: 1,
            }
        ],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        },
        notification_url: "https://5ffa-2806-105e-15-92d6-108e-8078-6a72-e9a1.ngrok.io/webhook",
    });

    console.log(resultado);

    res.send(resultado.body);
};

const receiveWebhook =  async (req, res) => {
    const payment = req.query;

    try{
        if(payment.type == "payment"){
            const data = await mercadopago.payment.findById(payment["data.id"]);
            console.log(data);
            //Aqui se puede guardar en base de datos
        }
        res.sendStatus(204);
    }catch (error){
        console.log(error)
        return res.sendStatus(500).json({ error: error.message });
    }
};

module.exports = createOrder;
module.exports = receiveWebhook;
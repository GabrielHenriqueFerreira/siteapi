const { MercadoPagoConfig, Preference } = require('mercadopago');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-8224656275191841-030617-00bf8f8c39f06121cd8475367e142b18-1622250379', // Substitua pelo seu token
    options: { 
        trackingDisabled: true // Desativa rastreamentos
    }
});

const preference = new Preference(client);

// Rota para criar a preferência de pagamento
app.post('/api/create-preference', async (req, res) => {
    try {
        const { items, payer, freight } = req.body;

        // Formata os itens corretamente
        const formattedItems = items.map(item => ({
            title: item.nome.substring(0, 255),
            unit_price: parseFloat(item.preco),
            quantity: parseInt(item.quantidade),
            picture_url: item.imagem || ''
        }));

        // Adiciona frete como item se necessário
        if (freight > 0) {
            formattedItems.push({
                title: 'Frete',
                unit_price: freight,
                quantity: 1
            });
        }

        // Cria a preferência
        const response = await preference.create({
            body: {
                items: formattedItems,
                payer: {
                    name: payer.nome,
                    email: payer.email,
                    phone: {
                        number: payer.telefone
                    },
                    address: {
                        zip_code: payer.cep,
                        street_name: payer.rua,
                        street_number: payer.numero,
                        neighborhood: payer.bairro,
                        city: payer.cidade,
                        federal_unit: payer.estado
                    }
                },
                back_urls: {
                    success: `${req.headers.origin}/sucesso.html`,
                    failure: `${req.headers.origin}/erro.html`,
                    pending: `${req.headers.origin}/pendente.html`
                },
                auto_return: 'approved',
                binary_mode: true // Evita pagamentos pendentes
            }
        });

        res.json({
            id: response.id,
            init_point: response.init_point
        });

    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
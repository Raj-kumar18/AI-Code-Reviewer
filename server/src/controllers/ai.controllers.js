import aiServices from '../services/ai.services.js';


const getReview = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(400).json({ error: 'Code is required' });
        }

        const response = await aiServices(code);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getReview };
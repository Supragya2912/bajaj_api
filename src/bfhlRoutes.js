const express = require('express');
const {
    USER_ID,
    COLLEGE_EMAIL_ID,
    COLLEGE_ROLL_NUMBER
} = require('./constants');

const router = express.Router();

router.get('', (req, res) => {
    res.json({
        operation_code: 1
    });
});

router.post('', (req, res) => {
    const data = req.body && req.body.data;

    let is_success = true;

    if (!data || !Array.isArray(data)) {
        is_success = false;
        console.log(data)

        return res.json({
            is_success,
            user_id: USER_ID,
            email: COLLEGE_EMAIL_ID,
            roll_number: COLLEGE_ROLL_NUMBER,
            numbers: [],
            alphabets: [],
            highest_alphabet: []
        });
    }

    const numbers = [];
    const alphabets = [];
    let highest_alphabet = null;
    const errors = [];

    for (const item of data) {
        if (Number.isFinite(parseFloat(item))) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1 && item.toUpperCase() !== item.toLowerCase()) {
            alphabets.push(item);

            if (!highest_alphabet || item.toLowerCase() > highest_alphabet.toLowerCase()) {
                highest_alphabet = item;
            }
        } else {
            errors.push(item);
        }
    }

    if (errors.length > 0) {
        is_success = false;

        return res.json({
            is_success,
            user_id: USER_ID,
            email: COLLEGE_EMAIL_ID,
            roll_number: COLLEGE_ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highest_alphabet ? [highest_alphabet] : []
        });
    }

    res.json({
        is_success,
        user_id: USER_ID,
        email: COLLEGE_EMAIL_ID,
        roll_number: COLLEGE_ROLL_NUMBER,
        numbers,
        alphabets,
        highest_alphabet: highest_alphabet ? [highest_alphabet] : []
    });
});

module.exports = router;

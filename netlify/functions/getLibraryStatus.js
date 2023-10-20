// netlify/functions/getLibrary.js
import axios from 'axios';

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://seat.tpml.edu.tw/sm/service/getAllArea');
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch library status' }),
    };
  }
};

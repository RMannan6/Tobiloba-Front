import axios from "axios";

export const getDeals = async () =>
  await axios.get(`${process.env.REACT_APP_API}/deals`);

export const removeDeal = async (dealId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/deal/${dealId}`, {
    headers: {
      authtoken,
    },
  });

export const createDeal = async (deal, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/deal`,
    { deal },
    {
      headers: {
        authtoken,
      },
    }
  );

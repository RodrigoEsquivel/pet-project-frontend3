import axios from 'axios';
const generateFacebookAuth = async (code :string | (string | null)[]) => {
    const { data } = await axios({
        url: 'https://graph.facebook.com/v4.0/oauth/access_token',
        method: 'get',
        params: {
          client_id: process.env.REACT_APP_FB_ID,
          client_secret: process.env.REACT_APP_FB_SECRET,
          redirect_uri: 'http://localhost:3000/FacebookLogin',
          code,
        },
      });
      return data.access_token;
};

export const getFacebookUserData = async (code: string | (string|null)[]) => {
    const accessToken = await generateFacebookAuth(code);
    const { data } = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
          fields: ['id', 'email', 'first_name', 'last_name'].join(','),
          access_token: accessToken,
        },
      });
      return data;
};
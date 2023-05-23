require('dotenv').config();

export default async function handler(req, res) {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN}`,
        'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
    };
    const { username } = req.body;

    // Get User Id
    fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
        headers,
    })
        .then((result) => result.json())
        .then((result) => {
            // Check if the request stream was found
            if (result.data.length < 1) {
                res.status(404).send('No stream found.');
            } else {
                const stream = result.data[0];

                fetch(
                    `https://api.twitch.tv/helix/videos?id=${stream.user_id}`,
                    {
                        headers,
                    }
                )
                    .then((result) => result.json())
                    .then((result) => console.log('result: ', result))
                    .catch((error) =>
                        console.log(`${error.code} - ${error.message}`)
                    );
            }
        })
        .catch((error) => console.log(`${error.code} - ${error.message}`));

    res.status(200).send('Hello World');
}

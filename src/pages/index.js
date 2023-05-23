import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        fetch('/api/get-stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'aceu' }),
        }).catch((error) => console.error(error));
    }, []);

    return <div>Hello World</div>;
}

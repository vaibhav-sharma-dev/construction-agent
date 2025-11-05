// const serverUrl = "https://a0g37u1907.execute-api.ap-south-1.amazonaws.com";
const serverUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUserApi = async (email, password) => {
    try {
        const loginUserResponse = await fetch(`${serverUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            credentials: "include",
        })

        return await loginUserResponse.json();
    } catch (error) {
        console.error()
    }
}
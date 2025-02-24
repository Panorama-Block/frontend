import { useConnect } from '@particle-network/authkit';

const { connect, disconnect, connected } = useConnect();

// Handle user login
const handleLogin = async () => {
    if (!connected) {
        await connect({});
    }
};

// Logout user
const handleLogout = async () => {
    await disconnect();
};
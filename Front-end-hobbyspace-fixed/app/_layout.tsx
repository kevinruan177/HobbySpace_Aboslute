import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Rotas protegidas (exigem login)
const PROTECTED = ['home', 'community', 'profile', 'notifications', 'settings', 'chat'];

// Padrão idêntico ao MeetParrot — RouteGuard como componente separado dentro do provider
function RouteGuard() {
    const { isAuthenticated, isLoading } = useAuth();
    const segments = useSegments();
    const router   = useRouter();

    useEffect(() => {
        if (isLoading) return; // aguarda verificação de sessão terminar

        const root        = (segments[0] ?? '') as string;
        const isProtected = PROTECTED.includes(root);
        const isAuthPage  = root === 'auth';
        const isPublic    = !root || root === 'index';

        if (!isAuthenticated && isProtected) {
            router.replace('/');
        } else if (isAuthenticated && isAuthPage) {
            router.replace('/home');
        }
    }, [isAuthenticated, isLoading, segments]);

    return null;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RouteGuard />
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    );
}

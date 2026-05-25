import { StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        opacity: 0.6,
    },

    card: {
        width: '90%', 
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 24,
        padding: 20,

        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 6,
    },

    logo: {
        width: 120, 
        height: 120,
        marginBottom: -10,
        marginTop: 40,
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#5B21B6',
    },

        // LABEL
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 6,
        fontWeight: '500',
    },

    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center',
    },

    inputContainer: {
        width: '100%',
    },

    gradientButton: {
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 9,
        width: '100%',
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D1D5DB',
    },

    dividerText: {
        marginHorizontal: 10,
        color: '#6B7280',
        fontSize: 12,
    },


    googleButton: {
        width: '100%',
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        borderRadius: 999,
        alignItems: 'center',
        marginBottom: 5,

        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },

    googleText: {
        fontWeight: '600',
        color: '#374151',
        fontSize: 14,
    },

    // 🔽 Login
    loginText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 6, 
        textAlign: 'center',
    },

    link: {
        color: '#5B21B6',
        fontWeight: '600',
    },

    // 🔽 Checkbox area
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 6,
    },

    termsText: {
        fontSize: 14,
        color: '#6B7280',
    },

    termsLink: {
        color: '#5B21B6',
    },
});
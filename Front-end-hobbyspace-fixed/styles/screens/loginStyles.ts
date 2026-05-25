import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({

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

    // LOGO MANTIDA COMO VOCÊ PEDIU
    logo: {
        width: 180,
        height: 180,
        marginBottom: 5,
        marginTop: 60,
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#5B21B6',
    },

    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center',
    },

    // CARD IGUAL REGISTER
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

    // LABEL
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 6,
        marginTop: 10,
        fontWeight: '500',
    },

    // INPUT BOX NOVO PADRÃO
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',

        width: '100%',

        backgroundColor: '#F3F4F6',

        borderRadius: 999,

        paddingHorizontal: 16,
        paddingVertical: 13,

        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    input: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
    },

    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    forgot: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },

    // BOTÃO PRINCIPAL NO PADRÃO REGISTER
    mainButton: {
        backgroundColor: '#5B21B6',

        paddingVertical: 14,

        borderRadius: 999,

        alignItems: 'center',

        marginTop: 22,

        shadowColor: '#5B21B6',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },

    mainButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
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

    // DIVIDER
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
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

    // GOOGLE BUTTON PADRÃO REGISTER
    googleButton: {
        width: '100%',

        backgroundColor: '#F3F4F6',

        paddingVertical: 12,

        borderRadius: 999,

        alignItems: 'center',

        flexDirection: 'row',
        justifyContent: 'center',

        gap: 8,

        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    googleIcon: {
        width: 20,
        height: 20,
    },

    googleText: {
        fontWeight: '600',
        color: '#374151',
        fontSize: 14,
    },

    // FOOTER
    footerText: {
        marginTop: 18,
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },

    link: {
        color: '#5B21B6',
        fontWeight: '600',
    },

});
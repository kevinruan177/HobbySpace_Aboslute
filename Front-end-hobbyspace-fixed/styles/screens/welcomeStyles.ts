import { StyleSheet } from 'react-native';

export const welcomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        overflow: 'hidden',
    },

    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0, 
        opacity: 0.6,
    },

    logo: {
        width: '100%',  
        height: 350,    
        marginTop: -160,
        marginBottom: 10,
    },

    subtitle: {
        fontWeight: '500',
        fontSize: 18,
        color: '#777',
        marginBottom: 60,
    },

    mainButton: {
        width: '100%',
        backgroundColor: '#6A0DAD',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,

        shadowColor: '#6A0DAD',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 20,

        elevation: 8,
    },

    mainButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    rowButtons: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
        justifyContent: 'center',
    },

    smallButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 12,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 20,

        elevation: 6,
    },

    smallButtonText: {
        color: '#333',
        fontSize: 15,
        fontWeight: '700',
    },

    starLeft: {
        position: 'absolute',
        bottom: 140,
        left: 59,
        width: 50,
        height: 50,
    },

    starRight: {
        position: 'absolute',
        bottom: 100,
        right: 70,
        width: 70,
        height: 70,
    },

    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
});
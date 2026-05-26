import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const communityStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F1F8' },
    scroll: { flex: 1 },

    // ── BANNER ────────────────────────────────────────────
    bannerWrap: { width, height: 200, position: 'relative' },
    bannerImg: { width: '100%', height: '100%' },
    bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.42)',
        justifyContent: 'flex-end',
        padding: 18,
    },
    communityTitle: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
    communityDesc: { color: 'rgba(255,255,255,0.82)', fontSize: 12, marginTop: 4 },

    // ── INFO BAR ──────────────────────────────────────────
    infoBar: {
        backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 14,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        borderBottomWidth: 1, borderBottomColor: '#F0E8FB',
        shadowColor: '#5e17eb', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
    },
    infoStats: { flexDirection: 'row', gap: 20 },
    statItem: { alignItems: 'center' },
    statNum: { fontSize: 15, fontWeight: '800', color: '#1A1A2E' },
    statLabel: { fontSize: 10, color: '#9B8FBB', fontWeight: '600', marginTop: 1 },

    joinBtn: {
        paddingHorizontal: 20, paddingVertical: 9,
        borderRadius: 22, backgroundColor: '#5e17eb',
    },
    joinBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
    leaveBtn: {
        paddingHorizontal: 20, paddingVertical: 9,
        borderRadius: 22, backgroundColor: '#EDE9F8',
        borderWidth: 1.5, borderColor: '#5e17eb',
    },
    leaveBtnText: { color: '#5e17eb', fontWeight: '800', fontSize: 13 },

    // ── PROGRESSO DO USUÁRIO ──────────────────────────────
    progressSection: {
        backgroundColor: '#FAF5FF', marginHorizontal: 16, marginTop: 12,
        borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#DDD6F3',
    },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    progressTitle: { fontSize: 13, fontWeight: '700', color: '#553C9A' },
    progressXp: { fontSize: 12, fontWeight: '700', color: '#805AD5' },
    progressTrack: { height: 8, borderRadius: 4, backgroundColor: '#DDD6F3', overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4, backgroundColor: '#5e17eb' },
    progressFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
    progressLevel: { fontSize: 11, fontWeight: '700', color: '#553C9A' },
    progressStreak: { fontSize: 11, color: '#805AD5' },

    // ── POSTS ─────────────────────────────────────────────
    card: {
        backgroundColor: '#fff', marginHorizontal: 16, marginVertical: 6,
        borderRadius: 18, padding: 16,
        shadowColor: '#5e17eb', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    userInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDE9F8' },
    userMeta: { flex: 1 },
    username: { fontWeight: '700', color: '#1A1A2E', fontSize: 14 },
    time: { color: '#9B8FBB', fontSize: 11, marginTop: 1 },
    postText: { color: '#333', lineHeight: 22, fontSize: 14, marginBottom: 10 },
    postImage: { width: '100%', height: 220, borderRadius: 12, marginBottom: 10 },
    postImageRadius: { borderRadius: 12 },

    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
    leftActions: { flexDirection: 'row', gap: 16 },
    action: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    actionText: { color: '#666', fontSize: 13, fontWeight: '600' },

    // ── FLOAT BUTTON ─────────────────────────────────────
    floatingButton: {
        position: 'absolute', bottom: 90, right: 22,
        backgroundColor: '#5e17eb', width: 56, height: 56,
        borderRadius: 28, justifyContent: 'center', alignItems: 'center',
        shadowColor: '#5e17eb', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
    },
});

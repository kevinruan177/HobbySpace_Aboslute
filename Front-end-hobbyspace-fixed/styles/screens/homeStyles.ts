import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const COL_WIDTH = (width - 48) / 2;

export const homestyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F1F8' },
    scroll: { flex: 1, backgroundColor: '#F6F1F8' },

    // ── SEÇÃO HEADER ──────────────────────────────────────
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 20, marginTop: 18, marginBottom: 4,
    },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A2E', letterSpacing: -0.3 },
    verMais: { fontSize: 13, fontWeight: '700', color: '#5e17eb' },

    // ── PROGRESS CARDS (top) ──────────────────────────────
    progressScroll: { paddingHorizontal: 20, paddingVertical: 6 },
    emptyProgress: {
        marginHorizontal: 20, marginVertical: 10,
        backgroundColor: '#EDE9F8', borderRadius: 14, padding: 16,
        flexDirection: 'row', alignItems: 'center', gap: 10,
    },
    emptyProgressText: { color: '#5e17eb', fontSize: 13, fontWeight: '600', flex: 1 },

    // ── BUSCA ─────────────────────────────────────────────
    searchContainer: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', borderRadius: 14, marginHorizontal: 20,
        marginTop: 16, marginBottom: 4, paddingHorizontal: 14, paddingVertical: 10,
        shadowColor: '#6B3FE4', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#333' },

    // ── PINTEREST GRID ────────────────────────────────────
    gridContainer: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginTop: 8 },
    column: { flex: 1, gap: 12 },

    discoverCard: {
        width: '100%', borderRadius: 18, overflow: 'hidden',
        shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
    },
    discoverImg: { width: '100%', height: '100%', justifyContent: 'flex-end' },
    imageRadius: { borderRadius: 18 },
    cardOverlay: {
        padding: 12, paddingBottom: 14,
        backgroundColor: 'rgba(0,0,0,0.38)',
        borderBottomLeftRadius: 18, borderBottomRightRadius: 18,
    },
    cardTitle: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: -0.2 },
    cardSub: { color: 'rgba(255,255,255,0.82)', fontSize: 11, fontWeight: '600', marginTop: 2 },

    // ── HOBBY CARD (progresso no topo, versão antiga compatível) ─
    hobbyCard: {
        backgroundColor: '#fff', borderRadius: 18, padding: 16, marginHorizontal: 20,
        marginVertical: 6, shadowColor: '#6B3FE4',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08,
        shadowRadius: 8, elevation: 2,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    iconContainer: {
        width: 36, height: 36, borderRadius: 10, backgroundColor: '#F3E8FF',
        justifyContent: 'center', alignItems: 'center', marginRight: 10,
    },
    hobbyName: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
    levelBadge: {
        backgroundColor: '#5e17eb', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
    },
    levelText: { color: '#fff', fontWeight: '800', fontSize: 12 },
    progressContainer: { gap: 4 },
    progressBar: {
        height: 7, borderRadius: 4, backgroundColor: '#EDE9F8', overflow: 'hidden',
    },
    progressFill: { height: '100%', borderRadius: 4, backgroundColor: '#5e17eb' },
    progressInfo: { flexDirection: 'row', justifyContent: 'space-between' },
    progressLabel: { fontSize: 11, color: '#888' },
    progressValue: { fontSize: 11, fontWeight: '700', color: '#5e17eb' },
});

import { StyleSheet } from 'react-native';

export const hobbiesStyles = StyleSheet.create({

  // ================= CONTAINER =================
  container: {
    flex: 1,
    backgroundColor: '#FFF',

    paddingTop: 60,
  },

  // ================= HEADER =================
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,

    marginBottom: 30,
  },

  // TÍTULO
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',

    color: '#4B0082',

    marginLeft: 15,
  },

  // ================= CONTEÚDO =================
  content: {
    paddingHorizontal: 20,
  },

  // TEXTO
  subtitle: {
    fontSize: 15,
    fontWeight: '500',

    color: '#333',

    lineHeight: 22,

    marginBottom: 10,
  },

  // ÍCONE INFO
  infoContainer: {
    alignItems: 'flex-end',

    marginBottom: 15,
  },

  // ================= CARD =================
  hobbyCard: {
    backgroundColor: '#FFF',

    borderRadius: 20,

    padding: 20,

    marginBottom: 20,

    // SOMBRA ANDROID
    elevation: 4,

    // SOMBRA IOS
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.1,

    shadowRadius: 6,

    // SOMBRA WEB
    boxShadow: '0px 2px 10px rgba(0,0,0,0.08)',
  },

  // ================= TOPO CARD =================
  cardTopRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 15,
  },

  // FUNDO ÍCONE
  iconBox: {
    backgroundColor: '#F3E5F5',

    padding: 12,

    borderRadius: 12,
  },

  // NOME HOBBY
  hobbyTitle: {
    flex: 1,

    marginLeft: 15,

    fontSize: 18,
    fontWeight: 'bold',

    color: '#333',
  },

  // CÍRCULO NÍVEL
  levelCircle: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: '#F5E1DA',

    justifyContent: 'center',
    alignItems: 'center',
  },

  // TEXTO NÍVEL
  levelText: {
    color: '#A0522D',

    fontWeight: 'bold',

    fontSize: 16,
  },

  // ================= PROGRESSO =================
  progressWrapper: {
    marginTop: 5,
  },

  // TEXTO %
  percentageText: {
    textAlign: 'right',

    fontSize: 10,

    color: '#999',

    marginBottom: 6,
  },

  // FUNDO BARRA
  progressBarBg: {
    height: 8,

    backgroundColor: '#FDEEE9',

    borderRadius: 4,

    overflow: 'hidden',
  },

  // BARRA LARANJA
  progressBarFill: {
    height: '100%',

    backgroundColor: '#FF7F50',

    borderRadius: 4,
  },

});
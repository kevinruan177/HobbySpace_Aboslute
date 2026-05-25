import { StyleSheet } from 'react-native';

export const homestyles = StyleSheet.create({

  // ================= CONTAINER =================
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 140,
  },

  // LOGO
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4B0082',
  },

  // ÍCONES DO HEADER
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // BOTÃO NOTIFICAÇÃO
  notificationBtn: {
    marginRight: 15,
    position: 'relative',
  },

  // BOLINHA VERMELHA
  badge: {
    position: 'absolute',

    right: 0,
    top: 0,

    backgroundColor: 'red',

    width: 12,
    height: 12,

    borderRadius: 6,

    borderWidth: 2,
    borderColor: '#FFF',
  },

  // FOTO PERFIL
  profileImg: {
    width: 45,
    height: 45,

    borderRadius: 22.5,

    borderWidth: 1,
    borderColor: '#DDD',
  },

  // ================= BARRA DE PESQUISA =================
  searchBar: {
    flexDirection: 'row',

    backgroundColor: '#F5F5F5',

    marginHorizontal: 20,
    marginBottom: 25,

    padding: 12,

    borderRadius: 25,

    alignItems: 'center',
  },

  // INPUT
  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,
    color: '#333',
  },

  // ================= TÍTULO DAS SEÇÕES =================
  sectionHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    marginBottom: 15,
  },

  // TÍTULO
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },

  // VER MAIS
  verMais: {
    color: '#4B0082',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ================= CARD DOS HOBBIES =================
  hobbyCard: {
    backgroundColor: '#FFF',

    marginHorizontal: 20,
    marginBottom: 15,

    padding: 15,

    borderRadius: 20,

    elevation: 3,

    // SOMBRA WEB
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  },

  // HEADER DO CARD
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,
  },

  // FUNDO DO ÍCONE
  iconContainer: {
    backgroundColor: '#F3E5F5',

    padding: 10,

    borderRadius: 12,
  },

  // NOME DO HOBBY
  hobbyName: {
    flex: 1,

    marginLeft: 15,

    fontSize: 17,
    fontWeight: 'bold',

    color: '#333',
  },

  // NÍVEL
  levelBadge: {
    backgroundColor: '#F5E1DA',

    paddingHorizontal: 12,
    paddingVertical: 4,

    borderRadius: 15,
  },

  // TEXTO DO NÍVEL
  levelText: {
    color: '#A0522D',
    fontWeight: 'bold',
  },

  // ================= BARRA DE PROGRESSO =================
  progressContainer: {
    height: 8,

    backgroundColor: '#F0F0F0',

    borderRadius: 4,

    overflow: 'hidden',
  },

  // PROGRESSO LARANJA
  progressBar: {
    height: 8,

    backgroundColor: '#FF7F50',

    borderRadius: 4,
  },

  // PORCENTAGEM
  percentText: {
    textAlign: 'right',

    fontSize: 11,
    color: '#999',

    marginTop: 5,
  },

  // ================= GRID DESCOBRIR =================
  gridContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: 15,
  },

  // COLUNAS
  column: {
    width: '48%',
  },

  // CARD DESCOBRIR
  discoverCard: {
    borderRadius: 20,

    overflow: 'hidden',

    marginBottom: 15,
  },

  // IMAGEM
  discoverImg: {
    width: '100%',
    height: '100%',

    justifyContent: 'flex-end',
  },

  // ARREDONDAR IMAGEM
  imageRadius: {
    borderRadius: 20,
  },

  // ESCURECER IMAGEM
  cardOverlay: {
    padding: 15,

    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  // TÍTULO DO CARD
  cardTitle: {
    color: '#FFF',

    fontWeight: 'bold',
    fontSize: 16,
  },

  // SUBTÍTULO
  cardSub: {
    color: '#FFF',

    fontSize: 11,

    opacity: 0.9,
  },

});
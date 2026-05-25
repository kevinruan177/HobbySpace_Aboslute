import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({

  // ================= CONTAINER =================
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 140,
  },

  // ================= HEADER =================
  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 25,

    marginBottom: 20,
  },

  // TÍTULO
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',

    color: '#4B0082',
  },

  // ================= PERFIL =================
  profileSection: {
    alignItems: 'center',

    marginTop: 10,
  },

  // CONTAINER FOTO
  imageContainer: {
    position: 'relative',
  },

  // FOTO PERFIL
  profileImg: {
    width: 140,
    height: 140,

    borderRadius: 70,

    backgroundColor: '#F5E1DA',
  },

  // BOTÃO EDITAR
  editIconContainer: {
    position: 'absolute',

    bottom: 5,
    right: 5,

    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: '#FF7F50',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#FFF',
  },

  // NOME
  userName: {
    fontSize: 22,

    fontWeight: 'bold',

    color: '#4B0082',

    marginTop: 15,
  },

  // EMAIL
  userEmail: {
    fontSize: 14,

    color: '#999',

    marginTop: 5,
  },

  // ================= ESTATÍSTICAS =================
  statsRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: 25,

    marginTop: 30,
  },

  // CARD
  statCard: {
    width: '47%',

    backgroundColor: '#FFF',

    paddingVertical: 20,

    borderRadius: 20,

    alignItems: 'center',

    // SOMBRA ANDROID
    elevation: 5,

    // SOMBRA IOS
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.1,

    shadowRadius: 10,

    // SOMBRA WEB
    boxShadow: '0px 2px 10px rgba(0,0,0,0.08)',
  },

  // NÚMERO
  statValue: {
    fontSize: 28,

    fontWeight: 'bold',

    color: '#4B0082',
  },

  // TEXTO
  statLabel: {
    fontSize: 11,

    color: '#999',

    textAlign: 'center',

    marginTop: 5,

    textTransform: 'uppercase',

    fontWeight: '600',
  },

  // ================= TÍTULOS =================
  sectionTitle: {
    fontSize: 18,

    fontWeight: 'bold',

    color: '#444',

    paddingHorizontal: 25,

    marginTop: 35,
    marginBottom: 15,
  },

  // ================= BIO =================
  bioContainer: {
    backgroundColor: '#F9F9F9',

    marginHorizontal: 25,

    padding: 15,

    borderRadius: 25,

    borderWidth: 1,

    borderColor: '#F0F0F0',
  },

  // TEXTO BIO
  bioText: {
    color: '#BBB',

    fontSize: 14,

    fontStyle: 'italic',
  },

  // ================= INSÍGNIAS =================
  insigniaRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: 25,

    marginTop: 10,

    flexWrap: 'wrap',
  },

  // ITEM
  insigniaItem: {
    alignItems: 'center',

    width: '22%',
  },

  // IMAGEM
  insigniaImg: {
    width: 65,
    height: 65,

    borderRadius: 32.5,
  },

  // TEXTO
  insigniaLabel: {
    fontSize: 10,

    color: '#999',

    textAlign: 'center',

    marginTop: 8,
  },

});
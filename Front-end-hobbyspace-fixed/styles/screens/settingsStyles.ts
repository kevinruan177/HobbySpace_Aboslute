import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({

  // SAFE AREA
  safeContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 120,
  },

  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // CONTENT
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 35,
  },

  // BOTÃO VOLTAR
  backButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.06,
    shadowRadius: 10,

    elevation: 4,
  },

  // TÍTULO HEADER
  headerTitle: {
    flex: 1,

    textAlign: 'center',

    fontSize: 24,

    fontWeight: '700',

    color: '#6A0DAD',
  },

  // ESPAÇO PRA CENTRALIZAR O TEXTO
  headerSpacer: {
    width: 42,
  },

  // SEÇÕES
  section: {
    marginBottom: 28,
  },

  // TÍTULO SEÇÃO
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',

    color: '#555',

    marginBottom: 14,
    marginLeft: 4,
  },

  // CARD
  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    paddingHorizontal: 16,
    paddingVertical: 6,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.05,
    shadowRadius: 14,

    elevation: 4,
  },

  // ITEM
  item: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 14,
  },

  // ÍCONE
  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  // TEXTO
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  // TÍTULO ITEM
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',

    color: '#2D2D2D',
  },

  // SUBTÍTULO
  itemSubtitle: {
    fontSize: 13,

    color: '#8A8A8A',

    marginTop: 3,
    lineHeight: 18,
  },

  // DIVISOR
  divider: {
    height: 1,

    backgroundColor: '#F1F1F1',

    marginLeft: 62,
  },

});
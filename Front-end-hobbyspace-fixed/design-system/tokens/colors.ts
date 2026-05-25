// Interface que define todas as cores obrigatórias do sistema
export interface ColorTokens {
  primary: string;        // Cor principal
  primaryLight: string;   // Versão clara da cor principal
  primaryDark: string;    // Versão escura da cor principal
  secondary: string;      // Cor secundária
  background: string;     // Fundo principal da aplicação
  surface: string;        // Fundo de cartões/componentes
  surfaceElevated: string;// Fundo de elementos elevados
  textPrimary: string;    // Texto principal
  textSecondary: string;  // Texto secundário
  textTertiary: string;   // Texto terciário
  success: string;        // Cor de sucesso
  error: string;          // Cor de erro
  warning: string;        // Cor de alerta
  border: string;         // Borda principal
  borderLight: string;    // Borda mais suave
  shadow: string;         // Cor da sombra
  overlay: string;        // Fundo de overlay/modal

  // Grupo específico para chat
  chat: {
    userBubble: string;   // Bolha do usuário
    otherBubble: string;  // Bolha do outro usuário
    userText: string;     // Texto do usuário
    otherText: string;    // Texto do outro usuário
  };
}

/* =========================
   Light Theme (tema claro)
   ========================= */
export const lightTheme: ColorTokens = {

  // Roxo principal do app (HobbySpace)
  primary: '#6C3BFF',        // Roxo vibrante
  primaryLight: '#C4B5FD',   // Lilás claro
  primaryDark: '#4C1D95',    // Roxo profundo
  secondary: '#F3E8FF',      // Fundo roxo bem suave

  // Fundo levemente quente (como na imagem)
  background: '#F6F1F8',     // Bege/lilás claro
  surface: '#FFFFFF',        
  surfaceElevated: '#F9F5FF',

  // Texto
  textPrimary: '#2D1B69',    // Roxo escuro (em vez de cinza)
  textSecondary: '#6B5E8E',  
  textTertiary: '#A78BFA',

  // Semânticas
  success: '#6FCF97',
  error: '#FF7A7A',
  warning: '#F59E0B',

  // Bordas suaves com tom roxo
  border: '#E9D8FD',
  borderLight: '#F3E8FF',

  // Sombra leve roxa
  shadow: 'rgba(108, 59, 255, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.3)',

  chat: {
    userBubble: '#6C3BFF',
    otherBubble: '#F3E8FF',
    userText: '#FFFFFF',
    otherText: '#2D1B69',
  }
};

/* =========================
   Dark Theme (tema escuro)
   ========================= */
export const darkTheme: ColorTokens = {

  primary: '#8B5CF6',       
  primaryLight: '#4C1D95',
  primaryDark: '#6C3BFF',
  secondary: '#2A1E5C',

  background: '#0F0A1F',    
  surface: '#1A1333',
  surfaceElevated: '#241A44',

  textPrimary: '#F5F3FF',
  textSecondary: '#C4B5FD',
  textTertiary: '#8B5CF6',

  success: '#6FCF97',
  error: '#F87171',
  warning: '#FBBF24',

  border: '#2E245F',
  borderLight: '#3B2F7A',

  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.6)',

  chat: {
    userBubble: '#8B5CF6',
    otherBubble: '#2A1E5C',
    userText: '#FFFFFF',
    otherText: '#F5F3FF',
  }
};

export const Colors = lightTheme;
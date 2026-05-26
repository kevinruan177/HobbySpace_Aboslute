// ============================================================
// TYPES GLOBAIS — HobbySpace v2
// ============================================================

// ---------- AUTH ----------
export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    bio?: string;
    createdAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
}

export interface LoginPayload  { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; }
export interface AuthResponse  { user: User; tokens: AuthTokens; }

// ---------- HOBBY ----------
export interface Hobby {
    id: string;
    name: string;
    icon: string;
    level: string;
    progressPercent: number;
    communitySlug: string;
    membersCount: number;
    coverImageUrl?: string | null;
    banner?: string | null;
    description?: string;
    postsCount?: number;
}

// ---------- BADGE / XP ----------
export interface BadgeInfo {
    levelName: string;
    levelRoman: string;
    badge: string;
    communitySlug?: string;
}

export interface CommunityProgress {
    id?: string;
    userId?: string;
    communitySlug: string;
    totalXp: number;
    levelNumber: number;
    levelName: string;
    levelRoman: string;
    badge: string;
    streak: number;
    lastActivityDate: string | null;
    progressPercent: number;
    // enriquecido pelo backend
    communityName?: string;
    communityIcon?: string;
    communityBanner?: string | null;
}

export interface XpEvent {
    id: string;
    userId: string;
    communitySlug: string;
    action: string;
    xp: number;
    createdAt: string;
}

// ---------- COMMUNITY ----------
export interface Community {
    slug: string;
    title: string;
    membersCount: number;
    coverImageUrl?: string | null;
    banner?: string | null;
    icon?: string;
    description?: string;
    postsCount?: number;
    isMember?: boolean;
    userProgress?: CommunityProgress | null;
}

// ---------- POST ----------
export interface PostUser {
    id: string;
    name: string;
    avatarUrl?: string | null;
    badge?: BadgeInfo | null;
}

export interface Post {
    id: string;
    user: PostUser;
    communitySlug: string;
    text: string;
    imageUrl?: string | null;
    likesCount: number;
    commentsCount: number;
    savesCount: number;
    sharesCount?: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
}

export interface Comment {
    id: string;
    user: PostUser;
    text: string;
    likesCount: number;
    createdAt: string;
}

export interface CreatePostPayload {
    communitySlug: string;
    text: string;
    imageBase64?: string;
}

// ---------- NOTIFICATION ----------
export type NotificationCategory = 'Todas' | 'Comunidade' | 'Progresso';
export type NotificationType = 'like' | 'comment' | 'level_up' | 'follow';

export interface Notification {
    id: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: string;
    actor?: { id: string; name: string; avatarUrl?: string | null };
    postImageUrl?: string;
    message: string;
    extra?: {
        level?: string;
        levelRoman?: string;
        badge?: string;
        nextLevel?: string;
        progressPercent?: number;
        communitySlug?: string;
    };
}

// ---------- CHAT ----------
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
}

export interface SendMessagePayload  { message: string; conversationId?: string; }
export interface SendMessageResponse { conversationId: string; reply: ChatMessage; }

// ---------- PAGINAÇÃO ----------
export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalItems: number;
}

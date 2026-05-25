import { api } from './api';
import type { Hobby, PaginatedResponse } from '../types';

// ============================================================
// HOBBY SERVICE
// ============================================================
export const hobbyService = {

    // ---------- MEUS HOBBIES ----------
    getMyHobbies: (): Promise<Hobby[]> =>
        api.get<Hobby[]>('/hobbies/me'),

    // ---------- DESCOBRIR HOBBIES ----------
    discover: (page = 1, search = ''): Promise<PaginatedResponse<Hobby>> =>
        api.get<PaginatedResponse<Hobby>>(
            `/hobbies/discover?page=${page}&search=${encodeURIComponent(search)}`
        ),

    // ---------- DETALHES DE UM HOBBY ----------
    getById: (id: string): Promise<Hobby> =>
        api.get<Hobby>(`/hobbies/${id}`),

    // ---------- ENTRAR EM UM HOBBY ----------
    join: (hobbyId: string): Promise<void> =>
        api.post<void>(`/hobbies/${hobbyId}/join`, {}),

    // ---------- SAIR DE UM HOBBY ----------
    leave: (hobbyId: string): Promise<void> =>
        api.delete<void>(`/hobbies/${hobbyId}/leave`),

    // ---------- REGISTRAR PROGRESSO ----------
    updateProgress: (hobbyId: string, progressPercent: number): Promise<Hobby> =>
        api.patch<Hobby>(`/hobbies/${hobbyId}/progress`, { progressPercent }),
};
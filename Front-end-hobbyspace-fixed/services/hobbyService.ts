import { api } from './api';
import type { Hobby, PaginatedResponse } from '../types';

export const hobbyService = {
    getMyHobbies: (): Promise<Hobby[]> =>
        api.get<Hobby[]>('/hobbies/me'),

    discover: (page = 1, search = ''): Promise<PaginatedResponse<Hobby>> =>
        api.get<PaginatedResponse<Hobby>>(
            `/hobbies/discover?page=${page}&search=${encodeURIComponent(search)}`
        ),

    getById: (id: string): Promise<Hobby> =>
        api.get<Hobby>(`/hobbies/${id}`),

    join: (hobbyId: string): Promise<void> =>
        api.post<void>(`/hobbies/${hobbyId}/join`, {}),

    leave: (hobbyId: string): Promise<void> =>
        api.delete<void>(`/hobbies/${hobbyId}/leave`),

    updateProgress: (hobbyId: string, progressPercent: number): Promise<Hobby> =>
        api.patch<Hobby>(`/hobbies/${hobbyId}/progress`, { progressPercent }),
};

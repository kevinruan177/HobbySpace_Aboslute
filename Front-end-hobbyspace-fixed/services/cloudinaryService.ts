// ============================================================
// CLOUDINARY — Upload direto do frontend (unsigned)
//
// Configure no frontend/.env:
//   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name
//   EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset
//
// Como criar o upload_preset (1 vez, gratuito):
//   1. cloudinary.com → Settings → Upload → Upload presets
//   2. "Add upload preset"
//   3. Signing Mode: Unsigned
//   4. Folder: hobbyspace  (opcional)
//   5. Salvar → copiar o nome gerado
// ============================================================

const CLOUD_NAME    = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME    || '';
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

export const cloudinaryEnabled = !!(CLOUD_NAME && UPLOAD_PRESET);

if (!cloudinaryEnabled) {
    console.warn('[Cloudinary] Não configurado. Adicione no frontend/.env:\n  EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=...\n  EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...');
}

// Aceita: data URI (data:image/jpeg;base64,...) ou base64 puro
export async function uploadImage(
    base64Data: string,
    folder: 'avatars' | 'posts' | 'communities' = 'posts'
): Promise<string> {
    if (!cloudinaryEnabled) {
        throw new Error('Cloudinary não configurado. Verifique EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME e EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET no .env');
    }

    // Garante prefixo data URI
    const dataUri = base64Data.startsWith('data:')
        ? base64Data
        : `data:image/jpeg;base64,${base64Data}`;

    const body = new FormData();
    body.append('file',          dataUri);
    body.append('upload_preset', UPLOAD_PRESET);
    body.append('folder',        `hobbyspace/${folder}`);

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const response = await fetch(url, { method: 'POST', body });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(`Cloudinary upload falhou (${response.status}): ${err?.error?.message || 'erro desconhecido'}`);
    }

    const data = await response.json();
    console.log('[Cloudinary] ✅ Upload →', data.secure_url);
    return data.secure_url as string;
}
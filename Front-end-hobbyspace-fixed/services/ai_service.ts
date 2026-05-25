import { InferenceClient } from "@huggingface/inference";

const token = process.env.EXPO_PUBLIC_HF_TOKEN;

const client = new InferenceClient(token);

export async function enviarParaIA(
  mensagemUsuario: string,
  historicoConversa: any[] = []
) {

  if (!token) {
    throw new Error("Token da IA não configurado");
  }

  if (!mensagemUsuario?.trim()) {
    throw new Error("Mensagem vazia");
  }

  try {

    const mensagensContexto: any[] = [
      {
        role: "system",
        content: `
Você é uma IA especializada em hobbies.

Ajude pessoas a descobrirem:
- hobbies criativos
- hobbies musicais
- hobbies artísticos
- hobbies esportivos
- hobbies relaxantes
- hobbies baratos

Sempre responda em português.
Seja amigável e criativa.
        `,
      },
    ];

    historicoConversa.forEach((msg) => {

      mensagensContexto.push({
        role:
          msg.type === "user"
            ? "user"
            : "assistant",

        content: msg.content,
      });

    });

    mensagensContexto.push({
      role: "user",
      content: mensagemUsuario,
    });

    const resposta =
      await client.chatCompletion({

        provider: "novita",

        model:
          "deepseek-ai/DeepSeek-V3-0324",

        messages: mensagensContexto,

        max_tokens: 500,

        temperature: 0.8,

      });

    return (
      resposta.choices?.[0]?.message?.content ||
      "Não consegui responder 😢"
    );

  } catch (error: any) {

    console.log("ERRO IA:", error);

    throw new Error(
      error?.message ||
      "Erro ao conectar com IA"
    );

  }
}
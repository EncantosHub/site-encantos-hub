import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GMNReportRequest {
  leadData: {
    full_name: string;
    email: string;
    whatsapp: string;
    company_name: string;
  };
  formData: any;
  overallScore: number;
  sectionScores: any;
}

const generateReportHTML = (leadData: any, formData: any, overallScore: number, sectionScores: any) => {
  const scoreColor = overallScore >= 80 ? '#10B981' : overallScore >= 60 ? '#F59E0B' : '#EF4444';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Relatório de Diagnóstico GMN - ${leadData.company_name}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; }
        .logo { color: #1D4ED8; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .score-section { background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .overall-score { font-size: 48px; font-weight: bold; color: ${scoreColor}; margin: 10px 0; }
        .section { margin: 20px 0; padding: 15px; border-left: 4px solid #E5E7EB; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .recommendations { background: #EFF6FF; padding: 15px; border-radius: 6px; margin: 10px 0; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 14px; color: #6B7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Encantos Hub</div>
        <h1>Relatório de Diagnóstico Google Meu Negócio</h1>
        <p><strong>Empresa:</strong> ${leadData.company_name}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      <div class="score-section">
        <h2>Pontuação Geral</h2>
        <div class="overall-score">${overallScore}%</div>
        <p>Esta é a pontuação geral do seu perfil no Google Meu Negócio.</p>
      </div>

      <div class="section">
        <div class="section-title">🏢 Identidade da Empresa - ${sectionScores.identity}%</div>
        <div class="recommendations">
          <strong>Recomendações:</strong>
          <ul>
            <li>Complete todas as informações do seu perfil</li>
            <li>Adicione fotos profissionais de alta qualidade</li>
            <li>Mantenha horários de funcionamento sempre atualizados</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <div class="section-title">📸 Mídia Visual - ${sectionScores.media}%</div>
        <div class="recommendations">
          <strong>Recomendações:</strong>
          <ul>
            <li>Adicione pelo menos 10 fotos do seu negócio</li>
            <li>Inclua fotos da fachada, interior e produtos/serviços</li>
            <li>Mantenha as fotos sempre atualizadas</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🛍️ Produtos e Serviços - ${sectionScores.services}%</div>
        <div class="recommendations">
          <strong>Recomendações:</strong>
          <ul>
            <li>Liste todos os seus produtos e serviços</li>
            <li>Adicione preços e descrições detalhadas</li>
            <li>Use fotos atrativas para cada item</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <div class="section-title">👥 Relacionamento com Clientes - ${sectionScores.relationship}%</div>
        <div class="recommendations">
          <strong>Recomendações:</strong>
          <ul>
            <li>Responda todas as avaliações, positivas e negativas</li>
            <li>Publique posts regularmente</li>
            <li>Interaja com perguntas dos clientes</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <div class="section-title">📊 Resultados e Performance - ${sectionScores.results}%</div>
        <div class="recommendations">
          <strong>Recomendações:</strong>
          <ul>
            <li>Monitor regularmente as métricas no Google Meu Negócio</li>
            <li>Analise o desempenho das suas publicações</li>
            <li>Acompanhe o crescimento das visualizações</li>
          </ul>
        </div>
      </div>

      <div class="footer">
        <p><strong>Encantos Hub</strong> - Especialistas em Marketing Digital</p>
        <p>📧 contato@encantoshub.com.br | 📱 WhatsApp: (11) 99999-9999</p>
        <p>Este relatório foi gerado automaticamente com base nas suas respostas.</p>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadData, formData, overallScore, sectionScores }: GMNReportRequest = await req.json();

    console.log("Sending GMN report to:", leadData.email);

    const reportHTML = generateReportHTML(leadData, formData, overallScore, sectionScores);

    const emailResponse = await resend.emails.send({
      from: "Encantos Hub <contato@encantoshub.com.br>",
      to: [leadData.email],
      subject: `${leadData.full_name}, seu Diagnóstico GMN está pronto! 📊`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1D4ED8; margin-bottom: 10px;">Encantos Hub</h1>
            <h2 style="color: #374151;">Seu Diagnóstico GMN está pronto!</h2>
          </div>
          
          <p>Olá, <strong>${leadData.full_name}</strong>!</p>
          
          <p>Obrigado por realizar o diagnóstico do Google Meu Negócio da <strong>${leadData.company_name}</strong>!</p>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">Sua Pontuação Geral</h3>
            <div style="font-size: 36px; font-weight: bold; color: ${overallScore >= 80 ? '#10B981' : overallScore >= 60 ? '#F59E0B' : '#EF4444'};">${overallScore}%</div>
          </div>
          
          <p><strong>O que você vai encontrar no seu relatório:</strong></p>
          <ul>
            <li>✅ Análise completa das 5 áreas principais</li>
            <li>📊 Pontuação detalhada por seção</li>
            <li>💡 Recomendações personalizadas</li>
            <li>🎯 Próximos passos para melhorar seu GMN</li>
          </ul>
          
          <div style="background: #EFF6FF; border: 1px solid #DBEAFE; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0;"><strong>💬 Quer uma consultoria personalizada?</strong></p>
            <p style="margin: 5px 0 0 0;">Entre em contato conosco pelo WhatsApp: <strong>${leadData.whatsapp}</strong></p>
          </div>
          
          <p>Abraços,<br><strong>Equipe Encantos Hub</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
          <p style="font-size: 12px; color: #6B7280; text-align: center;">
            Encantos Hub - Especialistas em Marketing Digital<br>
            📧 contato@encantoshub.com.br
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `diagnostico-gmn-${leadData.company_name.replace(/\s+/g, '-').toLowerCase()}.html`,
          content: Buffer.from(reportHTML).toString('base64'),
          content_type: 'text/html',
        },
      ],
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-gmn-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
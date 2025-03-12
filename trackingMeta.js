import axios from 'axios';


// Função para coletar os dados do usuário
const getUserData = () => {
    // Coletando o identificador do Facebook Pixel
    const fbp = getCookie('_fbp');  // Facebook Pixel ID
    const fbc = getCookie('_fbc');  // Facebook Click ID
    
    // User Agent do navegador

    return {
        fbp: fbp,
        fbc: fbc,
    };
};

// Função para obter o valor de um cookie
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// Função para enviar o evento de conversão para o backend
async function sendEventToAPIConversion (event_name, custom_data) {
    const user_data = getUserData();  // Coleta os dados do usuário
    const event_source_url = window.location.href;  // URL da página atual

    try {
        const response = await axios.post('https://api.mapmarketplaces.com/api/track-event/', {
            event_name: event_name,
            user_data: user_data,  // Dados do usuário
            custom_data: custom_data,  // Dados personalizados
            event_source_url: event_source_url  // URL de onde o evento ocorreu
        });
        console.log(response)
    } catch (error) {
        console.error(`Erro ao enviar evento ${event_name}:`, error.message);
    }
};

// Função para dados personalizados do evento
const getPurchaseData = (plan_name, price) => {
    return {
        plan: plan_name,  // Exemplo de plano
        value: price,  // Exemplo de valor
        currency: 'BRL'  // Moeda
    };
};


const getPageData = (page_action) => {
    return {
        event: 'access_page',
        page_action: page_action,  // Exemplo de plano
    };
};


export const acessouPagAdquirirPlanoAutentica = () => {
    fbq('track', 'acessouPagAdquirirPlanoAutentica');
    const custom_data = getPageData('Acessou a Pagina Adquirir Plano no Autentica')
    sendEventToAPIConversion('acessouPagAdquirirPlanoAutentica', custom_data);
};


export const acessouPagFaleConoscoAutentica = () => {
    fbq('track', 'acessouPagFaleConoscoAutentica');
    const custom_data = getPageData('Acessou a Pagina Fale Conosco do Autentica')
    sendEventToAPIConversion('acessouPagFaleConoscoAutentica', custom_data);
};

export const acessouPagLogin = () => {
    fbq('track', 'acessouPagLogin');
    const custom_data = getPageData('Acessou a Pagina Login')
    sendEventToAPIConversion('acessouPagLogin', custom_data);
};

// Evento disparado quando o usuário assina o plano iniciante anual
export const assinouPlanoInicianteAnual = () => {
    fbq('track', 'assinouPlanoInicianteAnual');
    const custom_data = getPurchaseData('Plano Iniciante Anual', 572.40)
    sendEventToAPIConversion('assinouPlanoInicianteAnual', custom_data);
};

// Evento disparado quando o usuário assina o plano iniciante mensal
export const assinouPlanoInicianteMensal = () => {
    fbq('track', 'assinouPlanoInicianteMensal');
    const custom_data = getPurchaseData('Plano Iniciante Mensal', 57.70)
    sendEventToAPIConversion('assinouPlanoInicianteMensal',custom_data);
};

// Evento disparado quando o usuário assina o plano especialista anual
export const assinouPlanoEspecialistaAnual = () => {
    fbq('track', 'assinouPlanoEspecialistaAnual');
    const custom_data = getPurchaseData('Plano Especialista Anual', 2844)
    sendEventToAPIConversion('assinouPlanoEspecialistaAnual', custom_data);
};

// Evento disparado quando o usuário assina o plano especialista mensal
export const assinouPlanoEspecialistaMensal = () => {
    fbq('track', 'assinouPlanoEspecialistaMensal');
    const custom_data = getPurchaseData('Plano Especialista Mensal', 284)
    sendEventToAPIConversion('assinouPlanoEspecialistaMensal', custom_data);
};

// Evento disparado quando o usuário assina o plano pro anual
export const assinouPlanoProAnual = () => {
    fbq('track', 'assinouPlanoProAnual');
    const custom_data = getPurchaseData('Plano Pro Anual', 4688.40)
    sendEventToAPIConversion('assinouPlanoProAnual', custom_data);
};

// Evento disparado quando o usuário assina o plano pro mensal
export const assinouPlanoProMensal = () => {
    fbq('track', 'assinouPlanoProMensal');
    const custom_data = getPurchaseData('Plano Pro Mensal', 468.90)
    sendEventToAPIConversion('assinouPlanoProMensal', custom_data);
};

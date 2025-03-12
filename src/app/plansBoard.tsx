'use client';
import React, { useState } from 'react';
import PlanPriceCard from './plansCards';
import axios from 'axios';

const PlansPriceBoard: React.FC = () => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleToggle = () => {
        setChecked(!checked);
    };

    const handleSubscribe = async (planName: string) => {
        const planType = checked ? 'annual' : 'monthly';
        const email = 'user@example.com'; // Substitua pelo email do usuário logado
        const cardToken = 'CARD_TOKEN'; // Substitua pelo token do cartão do usuário

        try {
            const response = await axios.post(
                '/api/auth/subscriptions/create-preapproval',
                {
                    email,
                    planType,
                    planName,
                    cardToken,
                },
            );

            const { init_point } = response.data;
            window.location.href = init_point;
        } catch (error) {
            console.error(
                'Erro ao processar pagamento:',
                error.response ? error.response.data : error.message,
            );
        }
    };

    return (
        <section className="flex flex-col items-center">
            <div
                id="toggle-switch-plans"
                className={`select-none text-[18px] border border-ternary relative flex w-60 h-14 rounded-full cursor-pointer transition-colors duration-300 bg-[#282828]`}
                onClick={handleToggle}
            >
                <div className="z-10 flex-1 flex items-center justify-center text-black">
                    <span
                        className={`font-bold transition-colors ${checked ? 'text-white' : 'text-black'}`}
                    >
                        Mensal
                    </span>
                </div>
                <div className="z-10 flex-1 flex items-center justify-center mr-3">
                    <div className="flex items-center">
                        <span
                            className={`font-bold transition-colors ${!checked ? 'text-white' : 'text-black'}`}
                        >
                            Anual
                        </span>
                        <div className="font-bold ml-2 text-[12px] bg-green-600 rounded-sm p-[1.5px] text-white">
                            25% off
                        </div>
                    </div>
                </div>
                <div
                    className={`absolute top-1 left-0 h-12 bg-ternary rounded-full transform transition-all duration-300 ${checked ? 'w-32 translate-x-[105px]' : 'w-24 translate-x-2'}`}
                />
            </div>

            <center>
                <div id="my-plans-board" className="mt-8 flex flex-wrap justify-center">
                    <PlanPriceCard
                        isCheckedAnualMode={checked}
                        name="Free"
                        monthlyPrice={0}
                        annualPrice={0}
                        annualDiscountedPrice={0}
                        benefits="Período de Teste; Criação de 1 anúncio"
                        borderColor={checked ? 'border-[#DAFD00]' : 'border-[#DAFD00]'}
                        bgColor="bg-[#000000]"
                        buttonColor="bg-[#DAFD00] hover:shadow-[black]"
                        titleBgColor="bg-[#DAFD00]"
                        onSubscribe={() => handleSubscribe('free')}
                    />

                    <PlanPriceCard
                        isCheckedAnualMode={checked}
                        name="Iniciante"
                        monthlyPrice={57.70}
                        annualPrice={692.40}  // 57.70 * 12
                        annualDiscountedPrice={572.40}  // 25% off anual
                        benefits="Cadastro de Produtos; Criação de Categorias; Multi Integrações"
                        borderColor={checked ? 'border-[#DAFD00]' : 'border-[#DAFD00]'}
                        bgColor="bg-[#000000]"
                        titleBgColor="bg-[#DAFD00]"
                        onSubscribe={() => handleSubscribe('iniciante')}
                    />

                    <PlanPriceCard
                        isCheckedAnualMode={checked}
                        name="Especialista"
                        monthlyPrice={284.00}
                        annualPrice={3408.00}  // 284.00 * 12
                        annualDiscountedPrice={2844.00}  // Com desconto anual
                        benefits="Cadastro de Produtos; Criação de Categorias; Sugestões de Imagens; Suporte Ticket"
                        borderColor={checked ? 'border-[#dafd00]' : 'border-[#dafd00]'}
                        bgColor="bg-[#dafd00] hover:shadow-[#dafd00]"
                        buttonColor="bg-[black] hover:shadow-[#dafd00]"
                        iconColor="#000000"
                        titleBgColor="bg-[black]"
                        titleTextColor="text-white"
                        buttonTextColor="text-white"
                        benefitTextColor="text-black"
                        priceTextColor="text-black"
                        monthTextColor="text-black"
                        onSubscribe={() => handleSubscribe('especialista')}
                    />

                    <PlanPriceCard
                        isCheckedAnualMode={checked}
                        name="Pro"
                        monthlyPrice={468.90}
                        annualPrice={5626.80}  // 468.90 * 12
                        annualDiscountedPrice={4688.40}  // Com desconto anual
                        benefits="Cadastro de Produtos; Criação de Categorias; Multi Integrações; Sugestões de Imagens; Editor de imagens; Suporte Whatsapp"
                        borderColor={checked ? 'border-[#DAFD00]' : 'border-[#DAFD00]'}
                        bgColor="bg-[#000000]"
                        buttonColor="bg-[#DAFD00] hover:shadow-[black]"
                        titleBgColor="bg-[#DAFD00]"
                        onSubscribe={() => handleSubscribe('pro')}
                    />
                </div>
            </center>
        </section>
    );
};

export default PlansPriceBoard;
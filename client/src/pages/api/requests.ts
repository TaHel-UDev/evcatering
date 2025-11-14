import type { NextApiRequest, NextApiResponse } from 'next';
import { createDirectus, createItem, rest } from '@directus/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, preferences, franchise_id } = req.body;

    // Валидация
    if (!name || !phone || !franchise_id) {
      return res.status(400).json({ 
        error: 'Обязательные поля: name, phone, franchise_id' 
      });
    }

    // Создаем клиент Directus
    const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest());

    // Создаем заявку
    const newRequest = await directus.request(
      createItem('request', {
        name,
        phone,
        preferences: preferences || null,
        franchise_id: franchise_id,
      })
    );

    return res.status(201).json({ 
      success: true, 
      data: newRequest 
    });

  } catch (error: any) {
    console.error('❌ Ошибка создания заявки:', error);
    return res.status(500).json({ 
      error: 'Не удалось создать заявку',
      details: error.message 
    });
  }
}


'use server'

import { supabase } from '../../utils/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const { data, error } = await supabase.from('users').select('*');
  
      if (error) {
        console.error('Error fetching personnel:', error);
        return NextResponse.json(
          { error: (error as Error).message || 'Internal Server Error' }, 
          { status: 500 }
        );
      }
  
      const rankOrder: Record<string, number> = {
        'Lieutenant I': 1,
        'Sergeant II': 2,
        'Detective II': 3,
        'Sergeant I': 4,
        'Senior Lead Officer': 5,
        'Detective I': 6,
        'Officer III': 7,
        'Officer II': 8,
      };
  
      const sortedData = [...data].sort((a, b) => {
        const rankA = rankOrder[a.rank as keyof typeof rankOrder] || 999;
        const rankB = rankOrder[b.rank as keyof typeof rankOrder] || 999;
        return rankA - rankB;
      });
  
      return NextResponse.json(sortedData);
    } catch (error) {
      console.error('Error fetching personnel:', error);
      return NextResponse.json(
        { error: (error as Error).message || 'Internal Server Error' }, 
        { status: 500 }
      );
    } 
}
  
import { NextRequest, NextResponse } from 'next/server';
import { TestAnswer } from '@/types/test';
import { determineStuckType } from '@/lib/determineStuckType';
import { generateInitialResult } from '@/lib/generateInitialResult';
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabaseServer';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, optionalText = '' } = body as {
      answers: TestAnswer[];
      optionalText: string;
    };

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: '无效的测试数据' },
        { status: 400 }
      );
    }

    const resultType = determineStuckType(answers);
    const result = generateInitialResult(answers, optionalText);
    const id = crypto.randomUUID();

    if (isSupabaseConfigured()) {
      try {
        const db = getSupabaseServer();
        if (db) {
          await db.from('test_sessions').insert({
            id,
            user_id: null,
            answers_json: answers,
            optional_text: optionalText,
            result_type: resultType,
            initial_result_json: result,
          });
        }
      } catch (dbError) {
        console.error('Supabase insert error:', dbError);
      }
    }

    return NextResponse.json({ id, result });
  } catch (error) {
    console.error('Submit test error:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

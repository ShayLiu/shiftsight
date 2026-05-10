import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, getSupabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      testSessionId,
      resultType,
      accuracyRating,
      desiredAdvice,
      mismatchText,
      willingness,
      contact,
    } = body;

    if (!accuracyRating) {
      return NextResponse.json({ error: '请至少选择匹配度' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const db = getSupabaseServer();
        if (db) {
          await db.from('feedback_entries').insert({
            test_session_id: testSessionId || null,
            result_type: resultType || null,
            accuracy_rating: accuracyRating,
            desired_advice: desiredAdvice || null,
            mismatch_text: mismatchText || null,
            willingness: willingness || null,
            contact: contact || null,
            source: 'result_page',
          });
        }
      } catch (e) {
        console.error('Feedback insert error:', e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Submit feedback error:', e);
    return NextResponse.json({ error: '提交失败' }, { status: 500 });
  }
}

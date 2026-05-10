create table if not exists test_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  answers_json jsonb not null,
  optional_text text default '',
  result_type text not null,
  initial_result_json jsonb not null,
  dashboard_scores_json jsonb,
  constraint_scores_json jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists feedback_entries (
  id uuid primary key default gen_random_uuid(),
  test_session_id uuid references test_sessions(id) on delete set null,
  result_type text,
  accuracy_rating text,
  desired_advice text,
  mismatch_text text,
  willingness text,
  contact text,
  source text default 'result_page',
  created_at timestamp with time zone default now()
);

alter table test_sessions enable row level security;
create policy "Anyone can insert test_sessions" on test_sessions for insert with check (true);
create policy "Anyone can read test_sessions" on test_sessions for select using (true);

alter table feedback_entries enable row level security;
create policy "Anyone can insert feedback" on feedback_entries for insert with check (true);

-- WARNING: before production add rate limiting, captcha, stricter RLS

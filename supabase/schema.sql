create table test_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  answers_json jsonb not null,
  optional_text text default '',
  result_type text not null,
  initial_result_json jsonb not null,
  created_at timestamp with time zone default now()
);

-- Allow anonymous insert (for free test without login)
alter table test_sessions enable row level security;
create policy "Anyone can insert" on test_sessions for insert with check (true);
create policy "Anyone can read by id" on test_sessions for select using (true);

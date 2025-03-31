# Supabase Setup for Klorophyl Contact Form

## 1. Creating the Database Table

Execute the following SQL in your Supabase SQL editor to create the required table:

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  terrace_garden BOOLEAN DEFAULT FALSE,
  balcony_garden BOOLEAN DEFAULT FALSE,
  backyard_garden BOOLEAN DEFAULT FALSE,
  waterbodies BOOLEAN DEFAULT FALSE,
  farmhouse_landscaping BOOLEAN DEFAULT FALSE,
  potted_plant_schemes BOOLEAN DEFAULT FALSE,
  area_size TEXT,
  budget_range TEXT,
  design_preferences TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

-- Create an index on created_at for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
```

## 2. Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under Project Settings > API.

## 3. Testing the Integration

1. Start your development server:
   ```
   npm run dev
   ```

2. Fill out and submit the contact form.

3. Check your Supabase table to verify that the data has been successfully recorded.

## 4. Security Considerations

- Ensure Row-Level Security (RLS) is properly configured in Supabase to protect your data.
- Consider adding rate limiting to prevent form spam.
- For a production environment, add server-side validation to the API endpoint.
